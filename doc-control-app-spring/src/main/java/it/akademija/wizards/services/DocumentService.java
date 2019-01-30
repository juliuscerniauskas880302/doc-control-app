package it.akademija.wizards.services;

import it.akademija.wizards.entities.Document;
import it.akademija.wizards.entities.DocumentType;
import it.akademija.wizards.entities.User;
import it.akademija.wizards.entities.UserGroup;
import it.akademija.wizards.enums.DocumentState;
import it.akademija.wizards.models.document.DocumentCreateCommand;
import it.akademija.wizards.models.document.DocumentGetCommand;
import it.akademija.wizards.models.document.DocumentReviewCommand;
import it.akademija.wizards.models.document.DocumentUpdateCommand;
import it.akademija.wizards.repositories.DocumentRepository;
import it.akademija.wizards.repositories.DocumentTypeRepository;
import it.akademija.wizards.repositories.UserGroupRepository;
import it.akademija.wizards.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermission;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private DocumentTypeRepository documentTypeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserGroupRepository userGroupRepository;

    //GET
    @Transactional(readOnly = true)
    public List<DocumentGetCommand> getSubmittedDocuments() {
        return documentRepository.findAll()
                .stream()
                .filter(document -> !document.getDocumentState().equals(DocumentState.CREATED))
                .map(document -> mapEntityToGetCommand(document))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<DocumentGetCommand> getDocumentsToReview() {
        return documentRepository.findAll()
                .stream()
                .filter(document -> document.getDocumentState().equals(DocumentState.SUBMITTED))
                .map(document -> mapEntityToGetCommand(document))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DocumentGetCommand getDocumentsById(String id) {
        return mapEntityToGetCommand(this.getDocumentFromDB(id));
    }

    //CREATE
    @Transactional
    public ResponseEntity<String> createDocument (DocumentCreateCommand documentCreateCommand, MultipartFile multipartFile) {
        User author = this.getUserFromDB(documentCreateCommand.getUsername());
        DocumentType createdDocumentType = this.getDocTypeFromDB(documentCreateCommand.getDocumentTypeTitle());
        //find authors groups
        Set<UserGroup> userGroups = author.getUserGroups();
        //check if the found group can create this type of document
        boolean isAllowed = false;
        for (UserGroup userGroup : userGroups) {
            for (DocumentType allowedDocumentType : userGroup.getSubmissionDocumentType()) {
                if (createdDocumentType.equals(allowedDocumentType)) {
                    isAllowed = true;
                    break;
                }
            }
        }
        if (isAllowed) {
            Document document = mapCreateCommandToEntity(documentCreateCommand);
            author.addDocument(document);
            try {
                this.uploadFile(document, multipartFile);
            } catch (IOException e) {
                return new ResponseEntity<>("File upload failed", HttpStatus.BAD_REQUEST);
            }
            documentRepository.save(document);
        } else {
            //TODO UserCannotCreateDocumentException
            throw new IllegalArgumentException("User doesn't have permission to create this type of document");
        }
        return new ResponseEntity<>("Document was created", HttpStatus.CREATED);
    }

    //SUBMIT
    @Transactional
    public void submitDocument(String id) {
        Document document = this.getDocumentFromDB(id);
        document.setSubmissionDate(new Date());
        document.setDocumentState(DocumentState.SUBMITTED);
    }

    //REVIEW
    @Transactional
    public void reviewDocument(String id, DocumentReviewCommand documentReviewCommand) {
        User reviewer = this.getUserFromDB(documentReviewCommand.getReviewerUsername());
        Document document = this.getDocumentFromDB(id);
        //find reviewer's groups
        Set<UserGroup> userGroups = reviewer.getUserGroups();
        //check if the found group can review this type of document
        boolean isAllowed = false;
        for (UserGroup userGroup : userGroups) {
            for (DocumentType allowedDocumentType : userGroup.getSubmissionDocumentType()) {
                if (document.getDocumentType().equals(allowedDocumentType)) {
                    isAllowed = true;
                    break;
                }
            }
        }
        if (isAllowed) {
            document.setDocumentState(documentReviewCommand.getDocumentState());
            document.setReviewer(reviewer);
            document.setReviewDate();
            if (document.getDocumentState().equals(DocumentState.REJECTED))
                document.setRejectionReason(documentReviewCommand.getRejectionReason());
        } else {
            //TODO UserCannotReviewDocumentException
            throw new IllegalArgumentException("User doesn't have permission to review this type of document");
        }
    }


    //UPDATE
    @Transactional
    public ResponseEntity<String> updateDocumentById(String id, DocumentUpdateCommand documentUpdateCommand, MultipartFile multipartFile)  {
        Document document = this.getDocumentFromDB(id);
        if (document.getDocumentState().equals(DocumentState.CREATED)) {
            if (multipartFile != null) {
                try {
                    uploadFile(document, multipartFile);
                } catch (IOException e) {
                    return new ResponseEntity<>("File upload failed", HttpStatus.BAD_REQUEST);
                }
            }
            documentRepository.save(mapUpdateCommandToEntity(documentUpdateCommand, document));
        } else {
            //TODO SubmittedDocumentUpdateNotAllowedException
            throw new IllegalArgumentException("submitted documents cannot be updated");
        }
        return new ResponseEntity<>("Document updated", HttpStatus.OK);
    }

    //DELETE
    @Transactional
    public void deleteDocumentById(String id) {
        Document document = getDocumentFromDB(id);
        User author = document.getAuthor();
        author.removeDocument(document);
        documentRepository.delete(document);
    }

    //PACKAGE METHODS (MAPPING)
    DocumentGetCommand mapEntityToGetCommand(Document document) {
        DocumentGetCommand documentGetCommand = new DocumentGetCommand();
        BeanUtils.copyProperties(document, documentGetCommand);
        documentGetCommand.setAuthorUsername(document.getAuthor().getUsername());
        if (document.getReviewer() != null) documentGetCommand.setReviewerUsername(document.getReviewer().getUsername());
        documentGetCommand.setDocumentTypeTitle(document.getDocumentType().getTitle());
        return documentGetCommand;
    }

    @Transactional(readOnly = true)
    Document mapCreateCommandToEntity(DocumentCreateCommand documentCreateCommand) {
            Document document = new Document();
            DocumentType documentType = this.getDocTypeFromDB(documentCreateCommand.getDocumentTypeTitle());
            User author = this.getUserFromDB(documentCreateCommand.getUsername());
            BeanUtils.copyProperties(documentCreateCommand, document);
            document.setDocumentState(DocumentState.CREATED);
            document.setCreationDate(new Date());
            document.setDocumentType(documentType);
            document.setAuthor(author);
            document.setPrefix();
            return document;
    }

    @Transactional(readOnly = true)
    Document mapUpdateCommandToEntity(DocumentUpdateCommand documentUpdateCommand, Document document) {
            DocumentType documentType = this.getDocTypeFromDB(documentUpdateCommand.getDocumentTypeTitle());
            BeanUtils.copyProperties(documentUpdateCommand, document);
            document.setDocumentType(documentType);
            return document;
    }

    //PRIVATE METHODS
    @Transactional
    private User getUserFromDB(String username) throws ResourceNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) throw new ResourceNotFoundException("user not found");
        else return user;
    }

    @Transactional
    private DocumentType getDocTypeFromDB(String title) throws ResourceNotFoundException {
        DocumentType documentType = documentTypeRepository.findByTitle(title);
        if (documentType == null) throw new ResourceNotFoundException("document type not found");
        else return documentType;
    }

    @Transactional
    private Document getDocumentFromDB(String id) throws ResourceNotFoundException {
        return documentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("document not found"));
    }

    @Transactional
    private void uploadFile(Document document, MultipartFile multipartFile) throws IOException {
        File path = new File("documents/" + document.getAuthor().getUsername());
        path.mkdirs();
        String originalFileName = multipartFile.getOriginalFilename();
        String updatedFileName = originalFileName + document.getPrefix();
        document.setPath(updatedFileName);
        byte[] buf = new byte[1024];
        File file = new File(path.getPath(), updatedFileName);
        try (InputStream inputStream = multipartFile.getInputStream();
             FileOutputStream fileOutputStream = new FileOutputStream(file)) {
            int numRead = 0;
            while ((numRead = inputStream.read(buf)) >= 0) {
                fileOutputStream.write(buf, 0, numRead);
            }
        }
        Set<PosixFilePermission> perms = new HashSet<>();
        // add owners permission
        perms.add(PosixFilePermission.OWNER_READ);
        perms.add(PosixFilePermission.OWNER_WRITE);
        perms.add(PosixFilePermission.GROUP_READ);
        perms.add(PosixFilePermission.GROUP_WRITE);
        // add others permissions
        perms.add(PosixFilePermission.OTHERS_READ);
        Files.setPosixFilePermissions(Paths.get(file.toString()), perms);
    }



}
