package it.akademija.wizards.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.Api;

import io.swagger.annotations.ApiOperation;
import it.akademija.wizards.configs.MediaTypeUtils;

import it.akademija.wizards.models.document.DocumentCreateCommand;
import it.akademija.wizards.models.document.DocumentGetCommand;
import it.akademija.wizards.models.document.DocumentReviewCommand;
import it.akademija.wizards.models.document.DocumentUpdateCommand;
import it.akademija.wizards.services.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

@RestController
@Api(value = "documents")
@RequestMapping(value = "/api/docs")
public class DocumentController {

    @Autowired
    private DocumentService documentService;
    @Autowired
    private ApplicationContext applicationContext;

    @Autowired
    private ServletContext servletContext;

    @ApiOperation(value = "get all submitted documents")
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<DocumentGetCommand> getSubmittedDocuments() {
        return documentService.getSubmittedDocuments();
    }

    @ApiOperation(value = "get all documents to be reviewed")
    @RequestMapping(value = "/review", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<DocumentGetCommand> getDocumentsToReview() {
        return documentService.getDocumentsToReview();
    }

    @ApiOperation(value = "get document by document Id")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public DocumentGetCommand getDocumentsById(@PathVariable String id) {
        return documentService.getDocumentsById(id);
    }

    @ApiOperation(value = "create a document",
            produces = "application/json", consumes = "multipart/form-data")
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> createDocument(
            @RequestParam("model") String model,
            @RequestParam("file") MultipartFile multipartFile) {
            /*   String model:
    {
      "description": "string",
      "documentTypeTitle": "atostogu prasymas",
      "title": "string",
      "username": "migle"
    }
    */
        ObjectMapper mapper = new ObjectMapper();
        try {
            DocumentCreateCommand documentCreateCommand = mapper.readValue(model, DocumentCreateCommand.class);
            documentService.createDocument(documentCreateCommand, multipartFile);

        } catch (IOException ex) {
            System.out.println(ex);
            return new ResponseEntity<>("Failed to map to object.", HttpStatus.BAD_REQUEST);

        }
        return new ResponseEntity<String>("Document created", HttpStatus.OK);
    }

    @ApiOperation(value = "download a file")
    @RequestMapping(value = "/{id}/download", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity downloadAFile(@PathVariable final String id) throws IOException {
        DocumentGetCommand document = documentService.getDocumentsById(id);
        String originalFileName = document.getPath().replace(document.getPrefix(), "");
        MediaType mediaType = MediaTypeUtils.getMediaTypeForFile(this.servletContext, originalFileName);
        File file = new File("documents" + "/" + document.getAuthor().getUsername() + "/" + document.getPath());
        if (file.exists()) {
            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + originalFileName + "\"");
            headers.add("Access-Control-Expose-Headers", HttpHeaders.CONTENT_DISPOSITION + "," + HttpHeaders.CONTENT_LENGTH);
            headers.setContentType(mediaType);
            return ResponseEntity.ok().headers(headers).body(resource);
        }
        return ResponseEntity.notFound().build();
    }

    @ApiOperation(value = "submit document by document Id")
    @RequestMapping(value = "/{id}/submit", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.CREATED)
    public void submitDocument(@PathVariable String id) {
        documentService.submitDocument(id);
    }

    @ApiOperation(value = "review document by document Id")
    @RequestMapping(value = "/review/{id}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void reviewDocument(
            @PathVariable String id,
            @RequestBody DocumentReviewCommand documentReviewCommand) {
        documentService.reviewDocument(id, documentReviewCommand);
    }

    @ApiOperation(value = "update document by document Id",
            produces = "application/json", consumes = "multipart/form-data")
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<String> updateDocumentById(
            @PathVariable String id,
            @RequestPart String model,
            @RequestPart MultipartFile multipartFile) {
        /*   String model:
    {
      "documentTypeTitle": "atostogu prasymas",
      "title": "string",
      "description": "string"
    }
    */
        ObjectMapper mapper = new ObjectMapper();
        try {
            DocumentUpdateCommand documentUpdateCommand = mapper.readValue(model, DocumentUpdateCommand.class);
            documentService.updateDocumentById(id, documentUpdateCommand, multipartFile);

        } catch (IOException ex) {
            System.out.println(ex);
            return new ResponseEntity<>("Failed to map to object.", HttpStatus.BAD_REQUEST);

        }
        return new ResponseEntity<String>("Document updated", HttpStatus.OK);
    }

    @ApiOperation(value = "delete document by document Id")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteDocumentById(@PathVariable String id) {
        documentService.deleteDocumentById(id);
    }
}
