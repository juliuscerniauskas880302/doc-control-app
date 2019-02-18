package it.akademija.wizards.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.wizards.models.stats.StatsGetTypeCommand;
import it.akademija.wizards.models.stats.StatsGetUserCommand;
import it.akademija.wizards.security.models.CurrentUser;
import it.akademija.wizards.security.models.UserPrincipal;
import it.akademija.wizards.services.StatsService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/stats")
@Api(value = "Statistics Management System")
public class StatsController {

    private StatsService statsService;

    public StatsController(final StatsService statsService) {
        this.statsService = statsService;
    }

    @ApiOperation(value = "View document type submission stats")
    @GetMapping("/{documentTypeId}")
    public StatsGetTypeCommand getDocumentTypeSubmissionStats (
            @ApiParam(value = "The Document Type ID", required = true) @PathVariable String documentTypeId,
            @RequestParam(value = "fromDate", required = false) @DateTimeFormat(pattern = "MMddyyyy") Date fromDate,
            @RequestParam(value = "toDate", required = false) @DateTimeFormat(pattern = "MMddyyyy") Date toDate,
            @CurrentUser UserPrincipal userPrincipal) {
        return statsService.getDocumentTypeSubmissionStats(userPrincipal.getUsername(), documentTypeId, fromDate, toDate);
    }

    @ApiOperation(value = "View top submitting users")
    @GetMapping("/users/{documentTypeId}")
    public List<StatsGetUserCommand> getTopSubmittingUsersByDocType (
            @ApiParam(value = "The Document Type ID", required = true) @PathVariable String documentTypeId,
            @RequestParam(value = "userCount", required = false) Integer userCount,
            @CurrentUser UserPrincipal userPrincipal) {
        return statsService.getTopSubmittingUsersByDocType(userPrincipal.getUsername(), documentTypeId, userCount);
    }

}
