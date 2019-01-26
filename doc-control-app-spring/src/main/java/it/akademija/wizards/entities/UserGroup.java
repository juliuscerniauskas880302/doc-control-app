package it.akademija.wizards.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.util.List;

@Entity
public class UserGroup {

    @Id
    @GeneratedValue(generator ="uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    @NotNull
    private String userGroupId;
    @NotNull
    private String title;

//    Types that this group can submit
    @ManyToMany
    @JoinTable(name = "submission_type", joinColumns = @JoinColumn(name="user_group"),
            inverseJoinColumns = @JoinColumn(name="submission_type_id") )
    private List <DocumentType> submissionDocumentType;

//    Types that this group can review
    @ManyToMany
    @JoinTable(name = "review_type", joinColumns = @JoinColumn(name="user_group"),
        inverseJoinColumns = @JoinColumn(name="review_type_id") )
    private List <DocumentType> reviewDocumentType;

    public UserGroup() {}

    public UserGroup(@NotNull String userGroupId, @NotNull String title, List<DocumentType> submissionDocumentType, List<DocumentType> reviewDocumentType) {
        this.userGroupId = userGroupId;
        this.title = title;
        this.submissionDocumentType = submissionDocumentType;
        this.reviewDocumentType = reviewDocumentType;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserGroupId() {
        return userGroupId;
    }

    public void setUserGroupId(String userGroupId) {
        this.userGroupId = userGroupId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<DocumentType> getSubmissionDocumentType() {
        return submissionDocumentType;
    }

    public void addSubmissionType (DocumentType documentType){
        this.submissionDocumentType.add(documentType);
    }
    public void setSubmissionDocumentType(List<DocumentType> submissionDocumentType) {
        this.submissionDocumentType = submissionDocumentType;
    }

    public List<DocumentType> getReviewDocumentType() {
        return reviewDocumentType;
    }

    public void addReviewType (DocumentType documentType){
        this.submissionDocumentType.add(documentType);
    }

    public void setReviewDocumentType(List<DocumentType> reviewDocumentType) {
        this.reviewDocumentType = reviewDocumentType;
    }
}
