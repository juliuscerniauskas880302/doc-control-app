package it.akademija.wizards.entities;

import it.akademija.wizards.enums.DocumentState;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class Document {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @NotNull
    @Column(unique = true)
    private String prefix;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    private DocumentState documentState;

    @ManyToOne
    @JoinColumn(name = "doctype_id")
    private DocumentType documentType;

    @NotNull
    private String title;

    @NotNull
    private String description;

    private Date creationDate;

    private Date submissionDate;

    private Date approvalDate;

    private Date rejectionDate;

    @ManyToOne
    private User reviewer;

    private String rejectionReason;

    private String path;

    //CONSTRUCTORS
    public Document() {
    }

    public Document(User author,
                    DocumentState documentState,
                    DocumentType documentType,
                    @NotNull String title,
                    @NotNull String description,
                    Date creationDate,
                    Date submissionDate,
                    Date approvalDate,
                    Date rejectionDate,
                    User reviewer,
                    String rejectionReason,
                    String path) {
        this.author = author;
        this.documentState = documentState;
        this.documentType = documentType;
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.submissionDate = submissionDate;
        this.approvalDate = approvalDate;
        this.rejectionDate = rejectionDate;
        this.reviewer = reviewer;
        this.rejectionReason = rejectionReason;
        this.path = path;
    }

    //GETTERS SETTERS
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix() {
      this.prefix = "_" + author.getUsername() + "_" + System.currentTimeMillis();
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public DocumentState getDocumentState() {
        return documentState;
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

    public User getReviewer() {
        return reviewer;
    }

    public void setReviewer(User reviewer) {
        this.reviewer = reviewer;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public DocumentType getDocumentType() {
        return documentType;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }

    public void setReviewDate() {
        if (this.documentState.equals(DocumentState.ACCEPTED)) this.approvalDate = new Date();
        else if (this.documentState.equals(DocumentState.REJECTED)) {
            this.rejectionDate = new Date();
        }
    }


}
