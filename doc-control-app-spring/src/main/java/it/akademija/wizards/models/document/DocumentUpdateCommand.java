package it.akademija.wizards.models.document;

import it.akademija.wizards.entities.DocumentType;
import it.akademija.wizards.entities.User;

;

public class DocumentUpdateCommand {

    private String documentTypeTitle;
    private String title;
    private String description;

    public DocumentUpdateCommand() {
    }

    public DocumentUpdateCommand(String documentTypeTitle, String title, String description) {
        this.documentTypeTitle = documentTypeTitle;
        this.title = title;
        this.description = description;
    }

    public String getDocumentTypeTitle() {
        return documentTypeTitle;
    }

    public void setDocumentTypeTitle(String documentTypeTitle) {
        this.documentTypeTitle = documentTypeTitle;
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
