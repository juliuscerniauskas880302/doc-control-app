package it.akademija.wizards.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import it.akademija.wizards.enums.DocumentState;
import it.akademija.wizards.services.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Api(value = "documents")
@RestController
@RequestMapping(value = "/api/docs")
public class DocumentController {

    @Autowired
    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

//    @ApiOperation(value = "get all documents")
//    @RequestMapping(value = "", method = RequestMethod.GET)
//    @ResponseStatus(HttpStatus.ACCEPTED)
//    public List<DocumentGetCommand> getDocuments(){
//         return null;
//    }

//    @ApiOperation(value = "get document by document ID")
//    @RequestMapping(value = "/{documentId}", method = RequestMethod.GET)
//    @ResponseStatus(HttpStatus.ACCEPTED)
//    public DocumentGetCommand getDocumentsById(@PathVariable String documentId){
//        return null;
//    }

//    @ApiOperation(value = "create a document")
//    @RequestMapping(value = "", method = RequestMethod.POST)
//    @ResponseStatus(HttpStatus.CREATED)
//    public void createDocument(@RequestBody CreateDocumentCommand createDocumentCommand){
//
//    }

    @ApiOperation(value = "change document status")
    @RequestMapping(value = "/{documentId}/{status}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createDocument(@PathVariable String documentId, @PathVariable DocumentState documentState){

    }

    @ApiOperation(value = "update document by documentId")
    @RequestMapping(value = "/{documentId}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateDocumentById(@PathVariable String documentId){

    }

    @ApiOperation(value = "delete document by documentId")
    @RequestMapping(value = "/{documentId}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteDocumentById(@PathVariable String documentId){
    }
}
