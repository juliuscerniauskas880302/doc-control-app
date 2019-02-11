package it.akademija.wizards.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.Api;

import io.swagger.annotations.ApiOperation;

import it.akademija.wizards.models.document.DocumentCreateCommand;
import it.akademija.wizards.models.document.DocumentGetCommand;
import it.akademija.wizards.models.document.DocumentReviewCommand;
import it.akademija.wizards.models.document.DocumentUpdateCommand;
import it.akademija.wizards.security.models.CurrentUser;
import it.akademija.wizards.security.models.UserPrincipal;
import it.akademija.wizards.services.DocumentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;


import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.*;


import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

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

    @ApiOperation(value = "get all documents review")
    @RequestMapping(value = "/review", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<DocumentGetCommand> getDocumentsToReview(@CurrentUser UserPrincipal userPrincipal) {
        return documentService.getDocumentsToReview(userPrincipal.getUsername());
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
            @RequestParam("file") MultipartFile[] multipartFile) {
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
            return new ResponseEntity<>("Failed to map to object.", HttpStatus.BAD_REQUEST);

        }
        return new ResponseEntity<String>("Document created", HttpStatus.OK);
    }

    @ApiOperation(value = "download document main file")
    @RequestMapping(value = "/{id}/download", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity downloadAFile(@PathVariable final String id) throws FileNotFoundException {
        return documentService.downloadFile(id);
    }

    @ApiOperation(value = "download additionalFiles")
    @RequestMapping(value = "/{id}/download/attachments", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<InputStreamResource> downloadAttachments(
            @PathVariable final String id) throws IOException {
        DocumentGetCommand document = documentService.getDocumentsById(id);
        List<String> fileNames = document.getAdditionalFilePaths();
        if (fileNames != null) {
            //            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            FileOutputStream fos = new FileOutputStream(
                    "documents" + File.separator
                            + document.getAuthor().getUsername()
                            + File.separator + "compressed.zip");
            ZipOutputStream zos = new ZipOutputStream(fos);
            byte[] bytes = new byte[2048];
            for (String fileName : fileNames) {
                String originalFileName = fileName.replace(document.getPrefix(), "");
                FileInputStream fis = new FileInputStream(
                        "documents"
                                + File.separator
                                + document.getAuthor().getUsername()
                                + File.separator
                                + fileName);
                BufferedInputStream bis = new BufferedInputStream(fis);
                zos.putNextEntry(new ZipEntry(originalFileName));
                int bytesRead;
                while ((bytesRead = bis.read(bytes)) != -1) {
                    zos.write(bytes, 0, bytesRead);
                }
                zos.closeEntry();
                bis.close();
                fis.close();
            }
            zos.flush();
            fos.flush();
            zos.close();
            fos.close();
            InputStreamResource resource = new InputStreamResource(
                    new FileInputStream(
                            new File("documents" + File.separator
                                    + document.getAuthor().getUsername()
                                    + File.separator + "compressed.zip")));
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"compressed.zip\"");
            headers.add("Access-Control-Expose-Headers",
                    HttpHeaders.CONTENT_DISPOSITION);
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            return ResponseEntity.ok().headers(headers).body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @ApiOperation(value = "download all user's documents in zip")
    @RequestMapping(value = "/download/all", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity dowloadAllUserDocuments(@CurrentUser UserPrincipal userPrincipal) throws IOException {
        return documentService.downloadAllDocuments(userPrincipal.getUsername());
    }


//      DOWNLOAD WITH HTTPSERVLETRESPONSE
//    @ApiOperation(value = "download additionalFiles")
//    @RequestMapping(value = "/{id}/download/attachments", method = RequestMethod.GET,
//    produces = "application/octet-stream")
//    @ResponseStatus(HttpStatus.OK)
//    public HttpEntity downloadAttachments(
//            HttpServletResponse response, @PathVariable final String id) throws IOException {
//
//        File doc = new File("documents/migle" + "/" + "compressed.zip");
//
//        InputStream is = new FileInputStream(doc);
//
//        response.setHeader("Content-Disposition", "attachment;filename=\"compressed.zip\"");
//        response.setHeader("Content-Type", "application/octet-stream;");
//        StreamUtils.copy(is ,response.getOutputStream());
//
//        return new ResponseEntity(HttpStatus.OK);
//        MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;
//        DocumentGetCommand document = documentService.getDocumentsById(id);
//        List<String> fileNames = document.getAdditionalFilePaths();
//        String fileName = "compressed.zip";
//        System.out.println("fileName: " + fileName);
//        System.out.println("mediaType: " + mediaType);
//
//        File file = new File("documents/migle" + "/" + fileName);
//
//        // Content-Type
//        // application/pdf
////        response.setContentType(mediaType.getType());
//
//        // Content-Disposition
//        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName());
//
//        // Content-Length
//        response.setContentLength((int) file.length());
//
//        BufferedInputStream inStream = new BufferedInputStream(new FileInputStream(file));
//        BufferedOutputStream outStream = new BufferedOutputStream(response.getOutputStream());
//
//        byte[] buffer = new byte[1024];
//        int bytesRead = 0;
//        while ((bytesRead = inStream.read(buffer)) != -1) {
//            outStream.write(buffer, 0, bytesRead);
//        }
//        outStream.flush();
//        inStream.close();

    @ApiOperation(value = "submit document by document Id")
    @RequestMapping(value = "/{id}/submit", method = RequestMethod.PUT)
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
            @RequestPart("model") String model,
            @RequestPart("file") MultipartFile [] multipartFile) {

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

    @ApiOperation(value = "delete file by document Id and file name")
    @RequestMapping(value = "/{id}/{filename}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteFile(@PathVariable String id, @PathVariable String filename){
        documentService.deleteFileByFileName(id, filename);
    }
}
