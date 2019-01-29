package it.akademija.wizards.services;

import it.akademija.wizards.entities.Document;
import it.akademija.wizards.enums.DocumentState;
import it.akademija.wizards.models.document.DocumentCreateCommand;
import it.akademija.wizards.models.document.DocumentGetCommand;
import it.akademija.wizards.models.document.DocumentReviewCommand;
import it.akademija.wizards.models.document.DocumentUpdateCommand;
import it.akademija.wizards.repositories.DocumentRepository;
import it.akademija.wizards.repositories.DocumentTypeRepository;
import it.akademija.wizards.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private DocumentTypeRepository documentTypeRepository;
    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<DocumentGetCommand> getSubmittedDocuments() {
        return documentRepository.findAll().stream().filter(document -> !document.getDocumentState().equals(DocumentState.CREATED)).map(document -> mapEntityToGetCommand(document)
        ).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<DocumentGetCommand> getDocumentsToReview() {
        return documentRepository.findAll().stream().filter(document -> document.getDocumentState().equals(DocumentState.SUBMITTED)).map(document -> mapEntityToGetCommand(document)).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DocumentGetCommand getDocumentsById(String id) {
        //TODO DocumentNotFoundException
        return mapEntityToGetCommand(documentRepository.findById(id).orElse(null));
    }

    @Transactional
    public void createDocument(DocumentCreateCommand documentCreateCommand){
        //TODO find author's group
        //TODO check if the found group can create this type of document
        //TODO UserCannotCreateDocumentException
        Document document = mapCreateCommandToEntity(documentCreateCommand);
        documentRepository.save(document);
        addToUserList(document);
    }

    @Transactional
    public void submitDocument(String id) {
        // DocumentNotFoundException
        Document document = documentRepository.findById(id).orElse(null);
        document.setSubmissionDate(new Date());
        document.setDocumentState(DocumentState.SUBMITTED);
    }

    @Transactional
    public void reviewDocument(String id, DocumentReviewCommand documentReviewCommand) {
        //TODO check reviewer's group
        //TODO check if the found group can review this type of document
        //TODO UserCannotReviewDocumentException
        //DocumentNotFoundException
        Document document = documentRepository.findById(id).orElse(null);
        document.setDocumentState(documentReviewCommand.getDocumentState());
        document.setReviewer(userRepository.findByUsername(documentReviewCommand.getReviewerUsername()));
        document.setReviewDate();
        if (document.getDocumentState().equals(DocumentState.REJECTED)) document.setRejectionReason(documentReviewCommand.getRejectionReason());
    }

    @Transactional
    public void updateDocumentById(String id, DocumentUpdateCommand documentUpdateCommand) {
        // DocumentNotFoundException
        Document document = documentRepository.findById(id).orElse(null);
        if (document.getDocumentState().equals(DocumentState.CREATED)) {
            documentRepository.save(mapUpdateCommandToEntity(documentUpdateCommand, document));
        } else {
            //TODO SubmittedDocumentUpdateNotAllowedException
            throw new IllegalArgumentException();
        }
    }

    @Transactional
    public void deleteDocumentById(String id) {
        //only admin can delete documents? spring security?
        // DocumentNotFoundException
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
        BeanUtils.copyProperties(documentCreateCommand, document);
        document.setDocumentState(DocumentState.CREATED);
        document.setCreationDate(new Date());
        //TODO DocumentTypeNotFoundException
        document.setDocumentType(documentTypeRepository.findByTitle(documentCreateCommand.getDocumentTypeTitle()));
        //TODO UserNotFoundException
        document.setAuthor(userRepository.findByUsername(documentCreateCommand.getUsername()));
        document.setPrefix();
        return document;
    }

    @Transactional(readOnly = true)
    private Document mapUpdateCommandToEntity(DocumentUpdateCommand documentUpdateCommand, Document document) {
        BeanUtils.copyProperties(documentUpdateCommand, document);
        //DocumentTypeNotFoundException
        document.setDocumentType(documentTypeRepository.findByTitle(documentUpdateCommand.getDocumentTypeTitle()));
        return document;
    }


    @Transactional
    private void addToUserList(Document document) {
        userRepository.findByUsername(document.getAuthor().getUsername()).getDocuments().add(document);
    }


}
