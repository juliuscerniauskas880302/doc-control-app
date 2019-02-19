package it.akademija.wizards.services;

import it.akademija.wizards.entities.Document;
import it.akademija.wizards.entities.DocumentType;
import it.akademija.wizards.entities.User;
import it.akademija.wizards.entities.UserGroup;
import it.akademija.wizards.enums.DocumentState;
import it.akademija.wizards.exception.BadRequestException;
import it.akademija.wizards.models.document.DocumentCreateCommand;
import it.akademija.wizards.models.document.DocumentGetCommand;
import it.akademija.wizards.models.document.DocumentReviewCommand;
import it.akademija.wizards.models.document.DocumentUpdateCommand;
import it.akademija.wizards.repositories.DocumentRepository;
import it.akademija.wizards.services.auxiliary.Mapper;
import it.akademija.wizards.services.auxiliary.ResourceFinder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.awt.print.Pageable;
import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private FileService fileService;
    @Autowired
    private ResourceFinder resourceFinder;
    @Autowired
    private Mapper mapper;

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
    public List<DocumentGetCommand> getDocumentsToReview(String username) {
        return documentRepository.findAll()
                .stream()
                .filter(document -> document.getDocumentState().equals(DocumentState.SUBMITTED))
                .filter(document -> !document.getAuthor().getUsername().equals(username)
                        && this.allowedToReviewDocument(username, document))
                .map(mapper::entityToGetCommand)
                .collect(Collectors.toList());
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
                return new ResponseEntity<>("File upload failed", HttpStatus.BAD_REQUEST);
            }
            documentRepository.save(document);
        } else {
            throw new BadRequestException("User doesn't have permission to create this type of document");
        }
        return new ResponseEntity<>( HttpStatus.CREATED);
    }

    //UPDATE
    @Transactional
    public ResponseEntity<?> updateDocumentById(
            String id,
            DocumentUpdateCommand documentUpdateCommand,
            MultipartFile[] multipartFile) {
        Document document = resourceFinder.getDocument(id);
        if (document.getDocumentState().equals(DocumentState.CREATED)) {
            if (multipartFile.length != 0) {
                try {
                    fileService.deleteMainFile(document);
                    fileService.uploadFiles(document, multipartFile);
                } catch (IOException e) {
                    return new ResponseEntity<>("File upload failed", HttpStatus.BAD_REQUEST);
                }
            }
            documentRepository.save(mapper.updateCommandToEntity(documentUpdateCommand, document));
        } else {
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
    }

    //SUBMIT
    @Transactional
    public void submitDocument(String id) {
        Document document = resourceFinder.getDocument(id);
        document.setSubmissionDate(new Date());
        document.setDocumentState(DocumentState.SUBMITTED);
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
            if (document.getDocumentState().equals(DocumentState.REJECTED))
                document.setRejectionReason(documentReviewCommand.getRejectionReason());
        } else {
            throw new BadRequestException("User doesn't have permission to review this type of document");
        }
    }
    @Transactional
    public ResponseEntity<?> downloadCSV(String username){
        User user = resourceFinder.getUser(username);
        if(user !=null){
            return fileService.downloadCSV(user);
        }
        else return new ResponseEntity("User not found",HttpStatus.NOT_FOUND);
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

