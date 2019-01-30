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
    @ManyToMany
    @JoinTable(name = "submission_type", joinColumns = @JoinColumn(name="doc_type"),
            inverseJoinColumns = @JoinColumn(name="user_group_id") )
    private Set<UserGroup> submissionUserGroups;
    @ManyToMany
    @JoinTable(name = "review_type", joinColumns = @JoinColumn(name="doc_type"),
            inverseJoinColumns = @JoinColumn(name="user_group_id") )
    private Set<UserGroup> reviewUserGroups;

    public DocumentType() {
    }

    public DocumentType(String title, Set<UserGroup> submissionUserGroups, Set<UserGroup> reviewUserGroups) {
        this.title = title;
        this.submissionUserGroups = submissionUserGroups;
        this.reviewUserGroups = reviewUserGroups;
    }

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
