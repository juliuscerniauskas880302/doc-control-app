package it.akademija.wizards.models.document;

import it.akademija.wizards.entities.DocumentType;
import it.akademija.wizards.entities.User;
import it.akademija.wizards.enums.DocumentState;

import java.util.Date;

public class DocumentGetCommand {

    private String documentId;
    private String authorUsername;
    private DocumentState documentState;
    private String documentTypeTitle;
    private String title;
    private String description;
    private Date creationDate;
    private Date submissionDate;
    private Date approvalDate;
    private Date rejectionDate;
    private String reviewerUsername;
    private String rejectionReason;

    public DocumentGetCommand() {

    }

    public DocumentGetCommand(String documentId, String authorUsername, DocumentState documentState, String documentTypeTitle, String title, String description, Date creationDate, Date submissionDate, Date approvalDate, Date rejectionDate, String reviewerUsername, String rejectionReason) {
        this.documentId = documentId;
        this.authorUsername = authorUsername;
        this.documentState = documentState;
        this.documentTypeTitle = documentTypeTitle;
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.submissionDate = submissionDate;
        this.approvalDate = approvalDate;
        this.rejectionDate = rejectionDate;
        this.reviewerUsername = reviewerUsername;
        this.rejectionReason = rejectionReason;
    }

    public String getDocumentId() {
        return documentId;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }


    public DocumentState getDocumentState() {
        return documentState;
    }

    public String getAuthorUsername() {
        return authorUsername;
    }

    public void setAuthorUsername(String authorUsername) {
        this.authorUsername = authorUsername;
    }

    public String getDocumentTypeTitle() {
        return documentTypeTitle;
    }

    public void setDocumentTypeTitle(String documentTypeTitle) {
        this.documentTypeTitle = documentTypeTitle;
    }

    public String getReviewerUsername() {
        return reviewerUsername;
    }

    public void setReviewerUsername(String reviewerUsername) {
        this.reviewerUsername = reviewerUsername;
    }

    public void setDocumentState(DocumentState documentState) {
        this.documentState = documentState;
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

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(Date submissionDate) {
        this.submissionDate = submissionDate;
    }

    public Date getApprovalDate() {
        return approvalDate;
    }

    public void setApprovalDate(Date approvalDate) {
        this.approvalDate = approvalDate;
    }

    public Date getRejectionDate() {
        return rejectionDate;
    }

    public void setRejectionDate(Date rejectionDate) {
        this.rejectionDate = rejectionDate;
    }


    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }
}
