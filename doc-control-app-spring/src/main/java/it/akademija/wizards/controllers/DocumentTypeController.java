package it.akademija.wizards.controllers;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import it.akademija.wizards.models.documenttype.DocumentTypeCreateCommand;
import it.akademija.wizards.models.documenttype.DocumentTypeGetCommand;
import it.akademija.wizards.services.DocumentTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(value = "document types")
@RequestMapping(value = "/api/doctypes")
public class DocumentTypeController {
    @Autowired
    private DocumentTypeService documentTypeService;

    @ApiOperation(value = "get all document types")
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<DocumentTypeGetCommand> getDocumentTypes(){
        return documentTypeService.getDocumentTypes();
    }

    @ApiOperation(value = "get document type by id")
    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public DocumentTypeGetCommand getDocumentTypeById(@PathVariable String id){
        return documentTypeService.getDocumentTypeById(id);
    }

    @ApiOperation(value = "create a document type")
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createDocumentType(@RequestBody DocumentTypeCreateCommand documentTypeCreateCommand){
        documentTypeService.createDocumentType(documentTypeCreateCommand);
    }

    @ApiOperation(value = "update a document type")
    @RequestMapping(value="/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.CREATED)
    public void updateDocumentType(@PathVariable String id, @RequestBody DocumentTypeCreateCommand documentTypeCreateCommand){
        documentTypeService.updateDocumentType(id, documentTypeCreateCommand);
    }

    @ApiOperation(value = "delete a document type")
    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.CREATED)
    public void deleteDocumentType(@PathVariable String id){
        documentTypeService.deleteDocumentType(id);
    }


}
