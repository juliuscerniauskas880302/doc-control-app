package it.akademija.wizards.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    String username;

    @NotNull
    String password;

    @NotNull
    String firstname;

    @NotNull
    String lastname;

    @NotNull
    String email;

    @ManyToMany
    List<Group> groups;

    boolean isAdmin;

    @OneToMany
    List<Document> documents;

    public User() {
    }

    public User(String username,
                @NotNull String password,
                @NotNull String firstname,
                @NotNull String lastname,
                @NotNull String email,
                List<Group> groups,
                boolean isAdmin,
                List<Document> documents) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.groups = groups;
        this.isAdmin = isAdmin;
        this.documents = documents;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public List<Group> getGroups() {
        return groups;
    }

    public void addGroup(Group group){
        this.groups.add(group);
    }

    public void setGroups(List<Group> groups) {
        this.groups = groups;
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
}
