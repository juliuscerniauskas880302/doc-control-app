package it.akademija.wizards.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class User {
    @Id
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
    List <Group> groups;

    boolean isAdmin;

    @OneToMany
    List <Documents> documents;
}
