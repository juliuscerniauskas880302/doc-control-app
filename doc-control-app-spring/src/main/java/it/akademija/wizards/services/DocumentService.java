package it.akademija.wizards.services;

import it.akademija.wizards.enums.DocumentState;
import it.akademija.wizards.models.document.DocumentCreateCommand;
import it.akademija.wizards.models.document.DocumentGetCommand;
import it.akademija.wizards.models.document.DocumentUpdateCommand;
import it.akademija.wizards.repositories.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    public List<DocumentGetCommand> getSubmittedDocuments() {
        return null;
    }

    public DocumentGetCommand getDocumentsById(String documentId) {
        return null;
    }

    public void createDocument(DocumentCreateCommand documentCreateCommand) {
    }


    public void updateDocumentState(String documentId, DocumentState documentState) {
    }

    public void updateDocumentById(String documentId, DocumentUpdateCommand documentUpdateCommand) {
    }

    public void deleteDocumentById(String documentId) {
    }
}
