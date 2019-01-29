package it.akademija.wizards.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class UserGroup {

    @Id
    @GeneratedValue(generator ="uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    @NotNull
    private String title;

    @ManyToMany
    @JoinTable(name = "group_users", joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> users;

//    Types that this group can submit
    @ManyToMany(mappedBy = "submissionUserGroups")
    private List <DocumentType> submissionDocumentType;

//    Types that this group can review
    @ManyToMany(mappedBy = "reviewUserGroups")
    private List <DocumentType> reviewDocumentType;

    public UserGroup() {}

    public UserGroup(@NotNull String title, Set<User> users, List<DocumentType> submissionDocumentType, List<DocumentType> reviewDocumentType) {
        this.title = title;
        this.users = new HashSet<>();
        this.submissionDocumentType = submissionDocumentType;
        this.reviewDocumentType = reviewDocumentType;
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

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public void addUser(User user) {
        this.users.add(user);
        user.getUserGroups().add(this);
    }

    public void removeUser(User user) {
        this.users.remove(user);
        user.getUserGroups().remove(this);
    }
}
