package it.akademija.wizards.services;

import it.akademija.wizards.models.stats.StatsGetTypeCommand;
import it.akademija.wizards.repositories.DocumentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Date;
import java.util.List;

@Service
public class StatsService {

    private DocumentRepository documentRepository;

    public StatsService(final DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @Transactional
    public List<StatsGetTypeCommand> getDocumentTypesStats(List<String> docTypeList, Date dateFrom, Date dateTo) {
        if (docTypeList == null) {
            throw new NullPointerException("Document Type List Is Not Provided");
        }
        Date startDate = dateFrom == null ? new Date(0) : dateFrom;
        Date endDate = dateTo == null ? new Date() : dateTo;
        return documentRepository.getDocumentTypesStats(docTypeList, startDate, endDate);
    }
}
