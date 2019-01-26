package it.akademija.wizards.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import it.akademija.wizards.enums.DocumentState;
import it.akademija.wizards.models.document.DocumentCreateCommand;
import it.akademija.wizards.models.document.DocumentGetCommand;
import it.akademija.wizards.models.document.DocumentUpdateCommand;
import it.akademija.wizards.services.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "documents")
@RestController
@RequestMapping(value = "/api/docs")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @ApiOperation(value = "get all submitted documents")
    @RequestMapping(value = "", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<DocumentGetCommand> getSubmittedDocuments(){
         return documentService.getSubmittedDocuments();
    }

    @ApiOperation(value = "get document by document Id")
    @RequestMapping(value = "/{documentId}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public DocumentGetCommand getDocumentsById(@PathVariable String documentId){
        return documentService.getDocumentsById(documentId);
    }

    @ApiOperation(value = "create a document")
    @RequestMapping(value = "", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createDocument(@RequestBody DocumentCreateCommand documentCreateCommand){
        documentService.createDocument(documentCreateCommand);
    }

    @ApiOperation(value = "change document state by document Id")
    @RequestMapping(value = "/{documentId}/{state}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void updateDocumentState(@PathVariable String documentId, @PathVariable DocumentState documentState){
        documentService.updateDocumentState(documentId, documentState);
    }

    @ApiOperation(value = "update document by document Id")
    @RequestMapping(value = "/{documentId}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateDocumentById(@PathVariable String documentId, @RequestBody DocumentUpdateCommand documentUpdateCommand){
        documentService.updateDocumentById(documentId, documentUpdateCommand);
    }

    @ApiOperation(value = "delete document by document Id")
    @RequestMapping(value = "/{documentId}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteDocumentById(@PathVariable String documentId){
        documentService.deleteDocumentById(documentId);
    }
}
