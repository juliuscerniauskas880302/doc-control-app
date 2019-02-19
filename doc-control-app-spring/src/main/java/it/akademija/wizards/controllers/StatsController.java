package it.akademija.wizards.controllers;

import io.swagger.annotations.Api;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.wizards.models.stats.StatsGetTypeCommand;
import it.akademija.wizards.models.stats.StatsRequestCommand;
import it.akademija.wizards.services.StatsService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/stats")
@Api(value = "Statistics Management System")
@PreAuthorize("hasRole('USER')")
public class StatsController {

    private StatsService statsService;

    public StatsController(final StatsService statsService) {
        this.statsService = statsService;
    }

    @ApiOperation("Get Document Types Stats")
    @PostMapping("/docTypes")
    public List<StatsGetTypeCommand> getDocumentTypesStats(
            @ApiParam(value = "Object for Stats Retrieval", required = true)
            @Valid @RequestBody StatsRequestCommand statsRequestCommand) {
       return statsService.getDocumentTypesStats(
               statsRequestCommand.getDocumentTypes(),
               statsRequestCommand.getFromDate(),
               statsRequestCommand.getToDate());
    }
}
