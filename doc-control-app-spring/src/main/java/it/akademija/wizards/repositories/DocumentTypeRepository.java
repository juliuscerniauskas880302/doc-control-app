package it.akademija.wizards.repositories;

import it.akademija.wizards.entities.DocumentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DocumentTypeRepository extends JpaRepository<DocumentType, String> {
    DocumentType findByTitle(String title);
}
