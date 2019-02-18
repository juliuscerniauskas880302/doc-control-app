package it.akademija.wizards.services;

import it.akademija.wizards.models.stats.StatsGetTypeCommand;
import it.akademija.wizards.models.stats.StatsGetUserCommand;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class StatsService {

    @Transactional
    public StatsGetTypeCommand getDocumentTypeSubmissionStats(String username, String documentTypeId, Date fromDate, Date toDate) {
        return null;
    }

    @Transactional
    public List<StatsGetUserCommand> getTopSubmittingUsersByDocType(String username, String documentTypeId, Integer userCount) {
        return null;
    }
}
