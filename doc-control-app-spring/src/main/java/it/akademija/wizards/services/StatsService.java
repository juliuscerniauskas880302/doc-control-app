package it.akademija.wizards.services;

import it.akademija.wizards.entities.Document;
import it.akademija.wizards.entities.DocumentType;
import it.akademija.wizards.enums.DocumentState;
import it.akademija.wizards.models.stats.StatsGetTypeCommand;
import it.akademija.wizards.repositories.DocumentRepository;
import it.akademija.wizards.repositories.DocumentTypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StatsService {

    private DocumentRepository documentRepository;
    private DocumentTypeRepository documentTypeRepository;

    public StatsService(final DocumentRepository documentRepository, final DocumentTypeRepository documentTypeRepository) {
        this.documentRepository = documentRepository;
        this.documentTypeRepository = documentTypeRepository;
    }

    @Transactional
    public List getStatsForDucumentTypes(List<String> docTypeIds, Date dateFrom, Date dateTo) {
        if (docTypeIds != null) {
                return docTypeIds.stream().map(docTypeId -> {
                    StatsGetTypeCommand statsGetTypeCommand = new StatsGetTypeCommand();
                    DocumentType documentType = documentTypeRepository.findById(docTypeId).orElseThrow(() -> new NullPointerException("No doctype found"));
                    statsGetTypeCommand.setTitle(documentType.getTitle());
                    Date startDate = dateFrom != null ? dateFrom : new Date(0);
                    Date endDate = dateTo != null ? dateTo : new Date();
                    List<Document> documents = documentRepository.findAllByDocumentTypeAndCreationDateBetween(documentType, startDate, endDate);
                    Integer submittedDocs = 0;
                    Integer acceptedDocs = 0;
                    Integer rejectedDocs = 0;
                    for (Document document: documents) {
                        DocumentState documentState = document.getDocumentState();
                        if (documentState.equals(DocumentState.SUBMITTED)) {
                            submittedDocs++;
                            continue;
                        }
                        if (documentState.equals(DocumentState.ACCEPTED)) {
                            acceptedDocs++;
                            continue;
                        }
                        if (documentState.equals(DocumentState.REJECTED)) {
                            rejectedDocs++;
                            continue;
                        }
                    }
                    statsGetTypeCommand.setSubmittedDocuments(submittedDocs);
                    statsGetTypeCommand.setAcceptedDocuments(acceptedDocs);
                    statsGetTypeCommand.setRejectedDocuments(rejectedDocs);
                    return statsGetTypeCommand;
                }).collect(Collectors.toList());
        } else {
            return Collections.EMPTY_LIST;
        }
    }
}
