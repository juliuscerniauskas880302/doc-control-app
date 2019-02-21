package it.akademija.wizards.repositories;

import it.akademija.wizards.entities.DocumentType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentTypeRepository extends JpaRepository<DocumentType, String> {
    DocumentType findByTitle(String title);
}
