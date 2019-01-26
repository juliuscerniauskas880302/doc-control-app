package it.akademija.wizards.models.documenttype;

public class DocumentTypeCreateCommand {

    private String title;

    public DocumentTypeCreateCommand() {
    }

    public DocumentTypeCreateCommand(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
