package it.akademija.wizards.models.document;

import it.akademija.wizards.entities.DocumentType;
import it.akademija.wizards.entities.User;
import it.akademija.wizards.enums.DocumentState;

import java.util.Date;

public class DocumentReviewCommand {

    private String reviewerUsername;
    private String rejectionReason;

    public DocumentReviewCommand() {

    }

    public DocumentReviewCommand(String reviewerUsername, String rejectionReason) {
        this.reviewerUsername = reviewerUsername;
        this.rejectionReason = rejectionReason;
    }

    public String getReviewerUsername() {
        return reviewerUsername;
    }

    public void setReviewerUsername(String reviewerUsername) {
        this.reviewerUsername = reviewerUsername;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }
}
