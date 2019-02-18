package it.akademija.wizards.models.stats;

public class StatsGetTypeCommand {

    private String title;
    private Integer submittedDocuments;
    private Integer acceptedDocuments;
    private Integer rejectedDocuments;

    public StatsGetTypeCommand() {
    }

    public StatsGetTypeCommand(String title, Integer submittedDocuments, Integer acceptedDocuments, Integer rejectedDocuments) {
        this.title = title;
        this.submittedDocuments = submittedDocuments;
        this.acceptedDocuments = acceptedDocuments;
        this.rejectedDocuments = rejectedDocuments;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getSubmittedDocuments() {
        return submittedDocuments;
    }

    public void setSubmittedDocuments(Integer submittedDocuments) {
        this.submittedDocuments = submittedDocuments;
    }

    public Integer getAcceptedDocuments() {
        return acceptedDocuments;
    }

    public void setAcceptedDocuments(Integer acceptedDocuments) {
        this.acceptedDocuments = acceptedDocuments;
    }

    public Integer getRejectedDocuments() {
        return rejectedDocuments;
    }

    public void setRejectedDocuments(Integer rejectedDocuments) {
        this.rejectedDocuments = rejectedDocuments;
    }
}
