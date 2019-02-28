package it.akademija.wizards.services;

import it.akademija.wizards.entities.Document;
import it.akademija.wizards.entities.DocumentType;
import it.akademija.wizards.entities.User;
import it.akademija.wizards.entities.UserGroup;
import it.akademija.wizards.enums.DocumentState;
import it.akademija.wizards.exception.BadRequestException;
import it.akademija.wizards.models.document.*;
import it.akademija.wizards.repositories.DocumentRepository;
import it.akademija.wizards.repositories.UserRepository;
import it.akademija.wizards.services.auxiliary.Auth;
import it.akademija.wizards.services.auxiliary.Mapper;
import it.akademija.wizards.services.auxiliary.ResourceFinder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private FileService fileService;
    @Autowired
    private ResourceFinder resourceFinder;
    @Autowired
    private Mapper mapper;
    @Autowired
    private UserRepository userRepository;

    //GET
    @Transactional(readOnly = true)
    public List<DocumentGetCommand> getSubmittedDocuments() {
        return documentRepository.findAll()
                .stream()
                .filter(document -> !document.getDocumentState().equals(DocumentState.CREATED))
                .map(mapper::entityToGetCommand)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DocumentForReviewPage getDocumentsToReview(String username, String searchFor, Integer pageNumber, Integer pageLimit) {
        String searchable = searchFor != null ? searchFor.toLowerCase().trim() : "";
        Pageable pageable;
        Sort sort = Sort.by("submissionDate").descending();
        if (pageNumber != null && pageLimit != null) {
            pageable = PageRequest.of(pageNumber, pageLimit, sort);
        } else {
            pageable = PageRequest.of(0, Integer.MAX_VALUE, sort);
        }
        Page<DocumentGetReviewCommand> pageDocument = documentRepository.getDocumentsForReview(username, searchable, pageable);
        return new DocumentForReviewPage(pageDocument.getContent(), pageDocument.getTotalElements(), pageDocument.getTotalPages());
    }

    @Transactional(readOnly = true)
    public DocumentPageGetCommand getUserDocumentsByState(String username, String state, String searchFor, Integer pageNumber, Integer pageLimit) {
        if (state == null) {
            log.warn("Vartotojas '" + Auth.getUsername() + "' nepadavė dokumento būklės, norint gauti visų dokumentų sąrašą.");
            throw new NullPointerException("State must be provided");
        }
        User user = userRepository.findByUsername(username);
        if (user != null) {
            List<DocumentState> documentStates = new ArrayList<>();
            Sort sort;
            if (state.toLowerCase().equals("created")) {
                documentStates.add(DocumentState.CREATED);
                sort = Sort.by("creationDate").descending();
            } else if (state.toLowerCase().equals("submitted")) {
                documentStates.add(DocumentState.SUBMITTED);
                documentStates.add(DocumentState.ACCEPTED);
                documentStates.add(DocumentState.REJECTED);
                sort = Sort.by("submissionDate").descending();
            } else {
                log.warn("Vartotojas '" + Auth.getUsername() + "' nepadavė tinkamos dokumento būklės, norint gauti visų dokumentų sąrašą.");
                throw new IllegalArgumentException("Correct document state must be provided");
            }
            String searchable = searchFor != null ? searchFor.toLowerCase().trim() : "";
            Pageable pageable;
            if (pageNumber != null && pageLimit != null) {
                pageable = PageRequest.of(pageNumber, pageLimit, sort);
            } else {
                pageable = PageRequest.of(0, Integer.MAX_VALUE, sort);
            }
            Page<Document> pageDocument = documentRepository.findByAuthorAndDocumentStateIn(user, documentStates, searchable, pageable);
            List<DocumentGetCommand> documentList = pageDocument.stream().map(mapper::entityToGetCommand).collect(Collectors.toList());
            return new DocumentPageGetCommand(documentList, pageDocument.getTotalElements(), pageDocument.getTotalPages());

        } else {
            throw new NullPointerException("User does not exist");
        }
    }

    @Transactional(readOnly = true)
    public DocumentGetCommand getDocumentsById(String id) {
        return mapper.entityToGetCommand(resourceFinder.getDocument(id));
    }


    //CREATE
    @Transactional
    public ResponseEntity<?> createDocument(String username, DocumentCreateCommand documentCreateCommand, MultipartFile[] multipartFile) {
        User author = resourceFinder.getUser(username);
        Document document = mapper.createCommandToEntity(username, documentCreateCommand);
        if (allowedToCreateDocument(username, document)) {
            author.addDocument(document);
            try {
                fileService.uploadFiles(document, multipartFile);
            } catch (IOException e) {
                log.error("Vartotojas '" + Auth.getUsername() + "', kurdamas naują dokumentą, kurio tipas '" + documentCreateCommand.getDocumentTypeTitle() + "', bandė pridėti neegzistuojantį failą.");
                return new ResponseEntity<>("File upload failed", HttpStatus.BAD_REQUEST);
            }
            documentRepository.save(document);
            log.info("Vartotojas '" + Auth.getUsername() + "' sukūrė naują dokumentą, kurio tipas '" + documentCreateCommand.getDocumentTypeTitle() + "'.");
        } else {
            log.warn("Vartotojas '" + Auth.getUsername() + "', neturi teisės kurti dokumento, kurio tipas '" + documentCreateCommand.getDocumentTypeTitle() + "'.");
            throw new BadRequestException("User doesn't have permission to create this type of document");
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //UPDATE
    @Transactional
    public ResponseEntity<?> updateDocumentById(
            String id,
            DocumentUpdateCommand documentUpdateCommand,
            MultipartFile[] multipartFile) {
        Document document = resourceFinder.getDocument(id);
//        Allow to edit only CREATED documents
        if (document.getDocumentState().equals(DocumentState.CREATED)) {
//          Delete additional files
            for (String filePath :
                    documentUpdateCommand.getAdditionalFilePathsToDelete()
                    ) {
                fileService.deleteFileByFileName(document, filePath);
            }

            if (multipartFile.length != 0) {
//            Delete main file only and only if a new one is attached
                System.out.println("_________________________" +
                        documentUpdateCommand.getMainFilePathToDelete());
                System.out.println("_________________________" + document.getPath());
            if(documentUpdateCommand.getMainFilePathToDelete() != null &&
                    documentUpdateCommand.getMainFilePathToDelete().equals(document.getPath())){
                try {

                    fileService.deleteMainFile(document);
                    fileService.uploadFiles(document, multipartFile);
                } catch (IOException e) {
                    log.error("Vartotojas '" + Auth.getUsername() + "', redaguodamas dokumentą, kurio id '" + id + "', bandė pridėti neegzistuojantį failą.");
                    return new ResponseEntity<>("File upload failed", HttpStatus.BAD_REQUEST);
                }
            } else {
                    try{
                        for (MultipartFile mf :
                                multipartFile) {
                            fileService.uploadAdditionalFile(document, mf);
                        }
                    } catch (IOException e){
                        log.error("Vartotojas '" + Auth.getUsername() + "', redaguodamas dokumentą, kurio id '" + id + "', bandė pridėti neegzistuojantį failą.");
                        return new ResponseEntity<>("File upload failed", HttpStatus.BAD_REQUEST);
                    }
                }
            }
            documentRepository.save(mapper.updateCommandToEntity(documentUpdateCommand, document));
            log.info("Vartotojas '" + Auth.getUsername() + "' koregavo dokumentą, kurio id '" + id + "'.");
        } else {
            log.warn("Vartotojas '" + Auth.getUsername() + "' norėjo koreguoti jau pateiktą dokumentą, kurio id '" + id + "'.");
            throw new BadRequestException("Submitted documents cannot be updated");
        }
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    //DELETE
    @Transactional
    public void deleteDocumentById(String id) {
        Document document = resourceFinder.getDocument(id);
        User author = document.getAuthor();
        fileService.deleteAllFiles(document);
        author.removeDocument(document);
        documentRepository.delete(document);
        log.info("Vartotojas '" + Auth.getUsername() + "' ištrynė dokumentą, kurio id '" + id + "'.");
    }

    //SUBMIT
    @Transactional
    public void submitDocument(String id) {
        Document document = resourceFinder.getDocument(id);
        document.setSubmissionDate(new Date());
        document.setDocumentState(DocumentState.SUBMITTED);
        log.info("Vartotojas '" + Auth.getUsername() + "' pateikė dokumentą, kurio id '" + id + "'.");
    }

    //REVIEW
    @Transactional
    public void reviewDocument(String username, String id, DocumentReviewCommand documentReviewCommand) {
        User reviewer = resourceFinder.getUser(username);
        Document document = resourceFinder.getDocument(id);
        if (allowedToReviewDocument(username, document)) {
            document.setDocumentState(documentReviewCommand.getDocumentState());
            document.setReviewer(reviewer);
            document.setReviewDate();
            if (document.getDocumentState().equals(DocumentState.REJECTED)){
                document.setRejectionReason(documentReviewCommand.getRejectionReason());
            }
            if(document.getDocumentState().equals(DocumentState.REJECTED)){
                log.info("Vartotojas '" + Auth.getUsername() + "' atmetė dokumentą, kurio id '" + id + "'.");
            } else {
                log.info("Vartotojas '" + Auth.getUsername() + "' priėmė dokumentą, kurio id '" + id + "'.");
            }
        } else {
            log.warn("Vartotojas '" + Auth.getUsername() + "' bandė peržiūrėti dokumentą, kurio id '" + id + "', bet neturi tam teisių.");
            throw new BadRequestException("User doesn't have permission to review this type of document");
        }
    }

    @Transactional
    public ResponseEntity<?> downloadCSV(String username){
        User user = resourceFinder.getUser(username);
        if(user !=null){
            return fileService.downloadCSV(user);
        }
        else {
            log.warn("Vartotojas '" + Auth.getUsername() + "' bandė atsisiųsti neegzistuojančio vartotojo '" + username + "' dokumentų archyvą (csv).");
            return new ResponseEntity("User not found",HttpStatus.NOT_FOUND);
        }
    }

    //PRIVATE METHODS
    private boolean allowedToReviewDocument(String username, Document document) {
        User user = resourceFinder.getUser(username);
        for (UserGroup userGroup : user.getUserGroups()) {
            for (DocumentType allowedDocumentType : userGroup.getReviewDocumentType()) {
                if (document.getDocumentType().equals(allowedDocumentType)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean allowedToCreateDocument(String username, Document document) {
        User user = resourceFinder.getUser(username);
        for (UserGroup userGroup : user.getUserGroups()) {
            for (DocumentType allowedDocumentType : userGroup.getSubmissionDocumentType()) {
                if (document.getDocumentType().equals(allowedDocumentType)) {
                    return true;
                }
            }
        }
        return false;
    }

}

