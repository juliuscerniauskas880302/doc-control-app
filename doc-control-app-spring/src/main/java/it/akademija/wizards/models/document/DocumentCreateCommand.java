package it.akademija.wizards.models.document;

import it.akademija.wizards.entities.DocumentType;
;

public class DocumentCreateCommand {

    private String username;
    private String documentTypeTitle;
    private String title;
    private String description;
    //TODO upload files (path?)

    public DocumentCreateCommand() {
    }

    public DocumentCreateCommand(String username, String documentTypeTitle, String title, String description) {
        this.username = username;
        this.documentTypeTitle = documentTypeTitle;
        this.title = title;
        this.description = description;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
