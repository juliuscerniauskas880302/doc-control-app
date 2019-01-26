package it.akademija.wizards.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import it.akademija.wizards.enums.DocumentState;
import it.akademija.wizards.models.document.DocumentCreateCommand;
import it.akademija.wizards.models.document.DocumentGetCommand;
import it.akademija.wizards.models.document.DocumentReviewCommand;
import it.akademija.wizards.models.document.DocumentUpdateCommand;
import it.akademija.wizards.services.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(value = "documents")
@RequestMapping(value = "/api/docs")
public class DocumentController {

    @Autowired
    private DocumentService documentService;


    @ApiOperation(value = "get all submitted documents")
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<DocumentGetCommand> getSubmittedDocuments(){
         return documentService.getSubmittedDocuments();
    }

    @ApiOperation(value = "get all documents to be reviewed")
    @RequestMapping(value = "/review", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<DocumentGetCommand> getDocumentsToReview(){
        return documentService.getDocumentsToReview();
    }

    @ApiOperation(value = "get document by document Id")
    @RequestMapping(value = "/{documentId}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public DocumentGetCommand getDocumentsById(@PathVariable String documentId){
        return documentService.getDocumentsById(documentId);
    }

    @ApiOperation(value = "create a document")
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createDocument(@RequestBody DocumentCreateCommand documentCreateCommand){
        documentService.createDocument(documentCreateCommand);
    }

    @ApiOperation(value = "submit document by document Id")
    @RequestMapping(value = "/{documentId}/submit", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void submitDocument(@PathVariable String documentId){
        documentService.submitDocument(documentId);
    }

    @ApiOperation(value = "review document by document Id")
    @RequestMapping(value = "/review/{documentId}/{state}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void reviewDocument(@PathVariable String documentId, @PathVariable(value="state") DocumentState documentState, @RequestBody DocumentReviewCommand documentReviewCommand){
        documentService.reviewDocument(documentId, documentState, documentReviewCommand);
    }

    @ApiOperation(value = "update document by document Id")
    @RequestMapping(value = "/{documentId}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateDocumentById(@PathVariable String documentId, @RequestBody DocumentUpdateCommand documentUpdateCommand){
        documentService.updateDocumentById(documentId, documentUpdateCommand);
    }

    @ApiOperation(value = "delete document by document Id")
    @RequestMapping(value = "/{documentId}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteDocumentById(@PathVariable String documentId){
        documentService.deleteDocumentById(documentId);
    }
}
