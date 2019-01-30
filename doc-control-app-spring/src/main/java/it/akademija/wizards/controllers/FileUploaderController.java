package it.akademija.wizards.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;


import io.swagger.annotations.*;
import it.akademija.wizards.models.document.DocumentCreateCommand;
import it.akademija.wizards.services.DocumentService;
import it.akademija.wizards.services.FileUploaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/files")
public class FileUploaderController {


    @Autowired
    private FileUploaderService fileUploaderService;

    /*   First argument requires string in the form of :
    {
      "description": "string",
      "documentTypeTitle": "string",
      "title": "string",
      "username": "string"
    }
    */
    @RequestMapping("/upload", method = RequestMethod.POST)
    @ResponseBody
    @ApiOperation(value = "Make a POST request to upload the file",
            produces = "application/json", consumes = "multipart/form-data")


    public ResponseEntity<String> uploadFile(
            @RequestPart String model,
            @RequestPart MultipartFile multipartFile
    ) {

        System.out.println(model);
        ObjectMapper mapper = new ObjectMapper();
        try {
            DocumentCreateCommand documentCreateCommand = mapper.readValue(model, DocumentCreateCommand.class);
            fileUploaderService.uploadFile(multipartFile, documentCreateCommand);

        } catch(IOException ex) {
            System.out.println(ex);
            return new ResponseEntity<>("Failed to map to object.", HttpStatus.BAD_REQUEST);

        }
        return new ResponseEntity<String>("Done", HttpStatus.OK);
    }
}