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

    //TODO exceptions for not found resources?
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
    public DocumentGetCommand getDocumentsById(String documentId) {
        return mapEntityToGetCommand(documentRepository.findByDocumentId(documentId));
    }

    @Transactional
    public void createDocument(DocumentCreateCommand documentCreateCommand){
        Document document = mapCreateCommandToEntity(documentCreateCommand);
        documentRepository.save(document);
        addToUserList(document);
    }

    @Transactional
    public void submitDocument(String documentId) {
        Document document = documentRepository.findByDocumentId(documentId);
        document.setSubmissionDate(new Date());
        document.setDocumentState(DocumentState.SUBMITTED);
    }

    @Transactional
    public void reviewDocument(String documentId, DocumentReviewCommand documentReviewCommand) {
        Document document = documentRepository.findByDocumentId(documentId);
        document.setDocumentState(documentReviewCommand.getDocumentState());
        document.setReviewer(userRepository.findByUsername(documentReviewCommand.getReviewerUsername()));
        document.setReviewDate();
        if (document.getDocumentState().equals(DocumentState.REJECTED)) document.setRejectionReason(documentReviewCommand.getRejectionReason());
    }

    @Transactional
    public void updateDocumentById(String documentId, DocumentUpdateCommand documentUpdateCommand) {
        Document document = documentRepository.findByDocumentId(documentId);
        if (document.getDocumentState().equals(DocumentState.CREATED)) {
            BeanUtils.copyProperties(documentUpdateCommand, document);
            document.setDocumentType(documentTypeRepository.findByTitle(documentUpdateCommand.getDocumentTypeTitle()));
            documentRepository.save(document);
        } else {
            //TODO new DocumentUpdateNotAllowedException
            throw new IllegalArgumentException();
        }
    }

    @Transactional
    public void deleteDocumentById(String documentId) {
        documentRepository.deleteByDocumentId(documentId);
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
    private Document mapCreateCommandToEntity(DocumentCreateCommand documentCreateCommand) {
        Document document = new Document();
        BeanUtils.copyProperties(documentCreateCommand, document);
        document.setDocumentState(DocumentState.CREATED);
        document.setCreationDate(new Date());
        document.setDocumentType(documentTypeRepository.findByTitle(documentCreateCommand.getDocumentTypeTitle()));
        document.setAuthor(userRepository.findByUsername(documentCreateCommand.getUsername()));
        document.setDocumentId();
        return document;
    }

    @Transactional
    private void addToUserList(Document document) {
        userRepository.findByUsername(document.getAuthor().getUsername()).getDocuments().add(document);
    }


}
