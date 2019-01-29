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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
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
        try {
            return mapEntityToGetCommand(this.getDocumentByIdDB(id));
        } catch (ResourceNotFoundException e) {
            throw new ResourceNotFoundException(e.getMessage());
        }
    }

    @Transactional
    public void createDocument(DocumentCreateCommand documentCreateCommand){
        User author = this.getUserByUsernameDB(documentCreateCommand.getUsername());
        DocumentType createdDocumentType = this.getDocTypeByTitleDB(documentCreateCommand.getDocumentTypeTitle());
        //TODO find author's groups
        Set<UserGroup> userGroups = author.getUserGroups();
        //TODO check if the found group can create this type of document
        boolean isAllowed = false;
        for (UserGroup userGroup: userGroups) {
            for (DocumentType allowedDocumentType: userGroup.getSubmissionDocumentType()) {
                if (createdDocumentType.equals(allowedDocumentType)) {
                    isAllowed = true;
                    break;
                }
            }
        }
        if (isAllowed) {
            Document document = mapCreateCommandToEntity(documentCreateCommand);
            documentRepository.save(document);
            addToUserList(document);
        } else {
            //TODO UserCannotCreateDocumentException
            throw new IllegalArgumentException("User doesn't have permission to create this type of document");
        }

    }

    @Transactional
    public void submitDocument(String id) {
        Document document;
        try {
            document = this.getDocumentByIdDB(id);
        } catch (ResourceNotFoundException e) {
            throw new ResourceNotFoundException(e.getMessage());
        }
        document.setSubmissionDate(new Date());
        document.setDocumentState(DocumentState.SUBMITTED);
    }

    @Transactional
    public void reviewDocument(String id, DocumentReviewCommand documentReviewCommand) {
        User reviewer = this.getUserByUsernameDB(documentReviewCommand.getReviewerUsername());
        Document document = this.getDocumentByIdDB(id);
        //TODO check reviewer's groups
            Set<UserGroup> userGroups = reviewer.getUserGroups();
            //TODO check if the found group can review this type of document
            boolean isAllowed = false;
            for (UserGroup userGroup: userGroups) {
                for (DocumentType allowedDocumentType: userGroup.getSubmissionDocumentType()) {
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
                if (document.getDocumentState().equals(DocumentState.REJECTED)) document.setRejectionReason(documentReviewCommand.getRejectionReason());
            } else {
                //TODO UserCannotReviewDocumentException
                throw new IllegalArgumentException("User doesn't have permission to review this type of document");
            }
        }

    @Transactional
    public void updateDocumentById(String id, DocumentUpdateCommand documentUpdateCommand) {
        Document document = this.getDocumentByIdDB(id);
        if (document.getDocumentState().equals(DocumentState.CREATED)) {
            documentRepository.save(mapUpdateCommandToEntity(documentUpdateCommand, document));
        } else {
            //TODO SubmittedDocumentUpdateNotAllowedException
            throw new IllegalArgumentException("submitted documents cannot be updated");
        }
    }

    @Transactional
    public void deleteDocumentById(String id) {
        documentRepository.deleteById(id);
    }

    private DocumentGetCommand mapEntityToGetCommand(Document document) {
        DocumentGetCommand documentGetCommand = new DocumentGetCommand();
        BeanUtils.copyProperties(document, documentGetCommand);
        documentGetCommand.setAuthorUsername(document.getAuthor().getUsername());
        if (document.getReviewer() != null) documentGetCommand.setReviewerUsername(document.getReviewer().getUsername());
        documentGetCommand.setDocumentTypeTitle(document.getDocumentType().getTitle());
        return documentGetCommand;
    }

    @Transactional(readOnly = true)
    public Document mapCreateCommandToEntity(DocumentCreateCommand documentCreateCommand) {
            Document document = new Document();
            DocumentType documentType = this.getDocTypeByTitleDB(documentCreateCommand.getDocumentTypeTitle());
            User author = this.getUserByUsernameDB(documentCreateCommand.getUsername());
            BeanUtils.copyProperties(documentCreateCommand, document);
            document.setDocumentState(DocumentState.CREATED);
            document.setCreationDate(new Date());
            document.setDocumentType(documentType);
            document.setAuthor(author);
            document.setPrefix();
            return document;
    }

    @Transactional(readOnly = true)
    private Document mapUpdateCommandToEntity(DocumentUpdateCommand documentUpdateCommand, Document document) {
            DocumentType documentType = this.getDocTypeByTitleDB(documentUpdateCommand.getDocumentTypeTitle());
            BeanUtils.copyProperties(documentUpdateCommand, document);
            document.setDocumentType(documentType);
            return document;
    }


    @Transactional
    public void addToUserList(Document document) {
        User author = this.getUserByUsernameDB(document.getAuthor().getUsername());
        author.getDocuments().add(document);
    }

    @Transactional
    private User getUserByUsernameDB(String username) throws ResourceNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) throw new ResourceNotFoundException("user not found");
        else return user;
    }

    @Transactional
    private DocumentType getDocTypeByTitleDB(String title) throws ResourceNotFoundException {
        DocumentType documentType = documentTypeRepository.findByTitle(title);
        if (documentType == null) throw new ResourceNotFoundException("document type not found");
        else return documentType;
    }

    @Transactional
    private Document getDocumentByIdDB(String id) throws ResourceNotFoundException {
        return documentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("document not found"));
    }



}
