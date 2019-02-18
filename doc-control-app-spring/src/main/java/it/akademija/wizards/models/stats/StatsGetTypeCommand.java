package it.akademija.wizards.models.stats;

public class StatsGetTypeCommand {

    private String title;
    private Long submittedDocuments;
    private Long acceptedDocuments;
    private Long rejectedDocuments;

    public StatsGetTypeCommand() {
    }

    public StatsGetTypeCommand(String title, Long submittedDocuments, Long acceptedDocuments, Long rejectedDocuments) {
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

    public Long getSubmittedDocuments() {
        return submittedDocuments;
    }

    public void setSubmittedDocuments(Long submittedDocuments) {
        this.submittedDocuments = submittedDocuments;
    }

    public Long getAcceptedDocuments() {
        return acceptedDocuments;
    }

    public void setAcceptedDocuments(Long acceptedDocuments) {
        this.acceptedDocuments = acceptedDocuments;
    }

    public Long getRejectedDocuments() {
        return rejectedDocuments;
    }

    public void setRejectedDocuments(Long rejectedDocuments) {
        this.rejectedDocuments = rejectedDocuments;
    }
}
