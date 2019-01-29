package it.akademija.wizards.repositories;

import it.akademija.wizards.entities.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository <Document, String> {

}
