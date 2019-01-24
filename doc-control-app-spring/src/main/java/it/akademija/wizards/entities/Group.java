package it.akademija.wizards.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Group {

    @Id
    @GeneratedValue
    private Integer id;
}
