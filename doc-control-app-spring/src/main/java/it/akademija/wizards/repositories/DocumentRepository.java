package it.akademija.wizards.repositories;

import it.akademija.wizards.entities.Document;
import it.akademija.wizards.entities.DocumentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface DocumentRepository extends JpaRepository <Document, String> {

    List<Document> findAllByDocumentTypeAndCreationDateBetween(DocumentType documentType, Date dateFrom, Date dateTo);
}
