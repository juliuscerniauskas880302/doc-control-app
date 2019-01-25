package it.akademija.wizards.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(generator ="uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @Column(unique = true)
    private String username;

    @NotNull
    private byte[] password;

    @NotNull
    private String firstname;

    @NotNull
    private String lastname;

    @NotNull
    private String email;

    @ManyToMany
    private List<UserGroup> userGroups;

    private boolean isAdmin;

    private byte[] passwordSalt;

    @OneToMany
    private List<Document> documents;

    public User() {
    }

    public User(String username,
                @NotNull byte[] password,
                @NotNull String firstname,
                @NotNull String lastname,
                @NotNull String email,
                List<UserGroup> userGroups,
                boolean isAdmin,
                byte[] salt,
                List<Document> documents) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.userGroups = userGroups;
        this.isAdmin = isAdmin;
        this.documents = documents;
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

    public byte[] getPassword() {
        return password;
    }

    public void setPassword(byte[] password) {
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

    public List<UserGroup> getUserGroups() {
        return userGroups;
    }

    public void addGroup(UserGroup userGroup){
        this.userGroups.add(userGroup);
    }

    public void setUserGroups(List<UserGroup> userGroups) {
        this.userGroups = userGroups;
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

    public byte[] getSalt() { return passwordSalt; }

    public void setSalt(byte[] passwordSalt) { this.passwordSalt = passwordSalt; }
}
