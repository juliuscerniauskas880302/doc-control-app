package it.akademija.wizards.entities;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class User {
    @Id
    @GeneratedValue(generator ="uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @Column(unique = true)
    private String username;

    @NotNull
    private String password;

    @NotNull
    private String firstname;

    @NotNull
    private String lastname;

    @NotNull
    private String email;

    @ManyToMany
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @ManyToMany(mappedBy = "users")
    private Set<UserGroup> userGroups;

    private boolean isAdmin;

//    private byte[] passwordSalt;

    @OneToMany(mappedBy = "author")
    private List<Document> documents;

    public User() {
    }

    public User(String username,
                @NotNull String password,
                @NotNull String firstname,
                @NotNull String lastname,
                @NotNull String email,
                boolean isAdmin,
//                byte[] passwordSalt,
                List<Document> documents) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.userGroups = new HashSet<>();
        this.isAdmin = isAdmin;
//        this.passwordSalt = passwordSalt;
        this.documents = documents;
    }

    public void addDocument(Document document) {
        documents.add(document);
        document.setAuthor(this);
    }

    public void removeDocument(Document document) {
        documents.remove(document);
        document.setAuthor(null);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<UserGroup> getUserGroups() {
        return userGroups;
    }

    public void setUserGroups(Set<UserGroup> userGroups) {
        this.userGroups = userGroups;
    }

    public void addGroup(UserGroup userGroup){
        this.userGroups.add(userGroup);
        userGroup.addUser(this);
    }

    public void removeGroup(UserGroup userGroup) {
        this.userGroups.remove(userGroup);
        userGroup.removeUser(this);
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    //    public byte[] getPasswordSalt() { return passwordSalt; }
//
//    public void setPassWordSalt(byte[] passwordSalt) { this.passwordSalt = passwordSalt; }
}
