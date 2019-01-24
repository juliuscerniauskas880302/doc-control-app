package it.akademija.wizards.entities;

import it.akademija.wizards.enums.State;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class Document {

    @Id
    @GeneratedValue(generator ="uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @ManyToOne
    private User author;

    private State state;

    @ManyToOne
    private Type type;

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

    public Document() {
    }

    public Document(User author,
                    State state,
                    Type type,
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
        this.state = state;
        this.type = type;
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

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
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

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    //
//    @ManyToOne
//    String type
//
//    String title
//
//    String description
//    Date creationDate
//    Date submissionDate [jei pateiktas]
//    Date approvalDate [jei patvirtintas]
//    Date rejectionDate [jei atmestas]
//    @ManyToOne
//    User reviewer [jei patvirtintas arba atmestas]
//    String rejectionReason [jei atmestas]
//    String path (vieną ar daugiau pdf tipo bylų) [jei prisegta]

}
