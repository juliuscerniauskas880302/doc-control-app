package it.akademija.wizards.repositories;

import it.akademija.wizards.entities.Document;
import it.akademija.wizards.models.stats.StatsGetTypeCommand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface DocumentRepository extends JpaRepository <Document, String> {

    @Query("SELECT new it.akademija.wizards.models.stats.StatsGetTypeCommand(dt.title, SUM(CASE WHEN d.documentState <> it.akademija.wizards.enums.DocumentState.CREATED then 1 else 0 end)," +
            " SUM(CASE WHEN d.documentState = it.akademija.wizards.enums.DocumentState.ACCEPTED then 1 else 0 end)," +
            " SUM(CASE WHEN d.documentState = it.akademija.wizards.enums.DocumentState.REJECTED then 1 else 0 end))" +
            " FROM Document d JOIN d.documentType dt" +
            " WHERE dt.id IN :docIDs" +
            " AND d.creationDate BETWEEN :dateFrom AND :dateTo" +
            " GROUP BY dt.title")
    List<StatsGetTypeCommand> getDocumentTypesStats(@Param("docIDs") List<String> docIDs, @Param("dateFrom") Date dateFrom, @Param("dateTo") Date dateTo);
}
