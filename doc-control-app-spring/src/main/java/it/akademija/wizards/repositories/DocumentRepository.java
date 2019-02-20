package it.akademija.wizards.repositories;

import it.akademija.wizards.entities.Document;
import it.akademija.wizards.models.stats.StatsGetTypeCommand;
import it.akademija.wizards.models.stats.TypeUserStats;
import org.springframework.data.domain.Pageable;
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

    @Query("SELECT new it.akademija.wizards.models.stats.TypeUserStats(u.firstname, u.lastname, COUNT(d.id))" +
            " FROM Document d JOIN d.documentType dt JOIN d.author u" +
            " WHERE dt.id = :documentTypeId AND d.documentState <> it.akademija.wizards.enums.DocumentState.CREATED" +
            " GROUP BY u.firstname, u.lastname ORDER BY COUNT(d.id) DESC")
    List<TypeUserStats> getTopSubmittingUsersForDocType(@Param("documentTypeId") String documentTypeId, Pageable pageable);

    @Query("SELECT d FROM Document d WHERE d.id IN (SELECT DISTINCT d.id FROM Document d JOIN d.documentType dt JOIN dt.reviewUserGroups rug JOIN rug.users u WHERE u.username = :username AND d.documentState = it.akademija.wizards.enums.DocumentState.SUBMITTED AND u <> d.author)")
    List<Document> getDocumentsForReview(@Param(value = "username") String username);

}
