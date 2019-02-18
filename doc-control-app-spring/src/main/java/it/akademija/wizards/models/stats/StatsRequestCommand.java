package it.akademija.wizards.models.stats;

import java.util.Date;
import java.util.List;

public class StatsRequestCommand {

    private List<String> documentTypes;
    private Date fromDate;
    private Date toDate;

    public StatsRequestCommand() {
    }

    public StatsRequestCommand(List<String> documentTypes, Date fromDate, Date toDate) {
        this.documentTypes = documentTypes;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }

    public List<String> getDocumentTypes() {
        return documentTypes;
    }

    public void setDocumentTypes(List<String> documentTypes) {
        this.documentTypes = documentTypes;
    }

    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }
}
