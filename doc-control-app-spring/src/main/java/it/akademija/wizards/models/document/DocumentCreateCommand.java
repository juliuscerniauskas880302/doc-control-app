package it.akademija.wizards.models.document;

import it.akademija.wizards.entities.DocumentType;
import it.akademija.wizards.entities.User;;

public class DocumentCreateCommand {

    private User author;
    private DocumentType documentType;
    private String title;
    private String description;

    public DocumentCreateCommand() {
    }

    public DocumentCreateCommand(User author, DocumentType documentType, String title, String description) {
        this.author = author;
        this.documentType = documentType;
        this.title = title;
        this.description = description;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public DocumentType getDocumentType() {
        return documentType;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
