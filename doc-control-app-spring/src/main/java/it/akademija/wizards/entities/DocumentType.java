package it.akademija.wizards.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
public class DocumentType {

    @Id
    @GeneratedValue(generator ="uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @Column(unique = true)
    private String title;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "submission_type", joinColumns = @JoinColumn(name="doc_type"),
            inverseJoinColumns = @JoinColumn(name="user_group_id") )
    private Set<UserGroup> submissionUserGroups;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "review_type", joinColumns = @JoinColumn(name="doc_type"),
            inverseJoinColumns = @JoinColumn(name="user_group_id") )
    private Set<UserGroup> reviewUserGroups;

    //CONSTRUCTORS
    public DocumentType() {
    }

    public DocumentType(String title, Set<UserGroup> submissionUserGroups, Set<UserGroup> reviewUserGroups) {
        this.title = title;
        this.submissionUserGroups = submissionUserGroups;
        this.reviewUserGroups = reviewUserGroups;
    }

    //SUBMISSION GROUP - TYPE (ADD REMOVE)
    public void addSubmissionUserGroup(UserGroup userGroup) {
        submissionUserGroups.add(userGroup);
        userGroup.getSubmissionDocumentType().add(this);
    }
    public void removeSubmissionUserGroup(UserGroup userGroup) {
        submissionUserGroups.remove(userGroup);
        userGroup.getSubmissionDocumentType().remove(this);
    }
    //REVIEW GROUP - TYPE (ADD REMOVE)
    public void addReviewUserGroup(UserGroup userGroup) {
        reviewUserGroups.add(userGroup);
        userGroup.getReviewDocumentType().add(this);
    }

    public void removeReviewUserGroup(UserGroup userGroup) {
        reviewUserGroups.remove(userGroup);
        userGroup.getReviewDocumentType().remove(this);
    }

    //GETTERS SETTERS
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<UserGroup> getSubmissionUserGroups() {
        return submissionUserGroups;
    }

    public void setSubmissionUserGroups(Set<UserGroup> submissionUserGroups) {
        this.submissionUserGroups = submissionUserGroups;
    }

    public Set<UserGroup> getReviewUserGroups() {
        return reviewUserGroups;
    }

    public void setReviewUserGroups(Set<UserGroup> reviewUserGroups) {
        this.reviewUserGroups = reviewUserGroups;
    }
}
