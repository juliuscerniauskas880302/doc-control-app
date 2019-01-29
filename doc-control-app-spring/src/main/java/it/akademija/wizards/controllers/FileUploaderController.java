package it.akademija.wizards.controllers;

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

    @PostMapping("/upload/{id}")
    @ApiOperation(value = "Make a POST request to upload the file",
            produces = "application/json", consumes = "multipart/form-data, application/json")


    public ResponseEntity<String> uploadFile(
            @RequestBody DocumentCreateCommand command,
            @RequestPart("file") MultipartFile multipartFile
    ) {
//        try {
//            fileUploaderService.uploadFile(file);
//        } catch (IOException ex) {
//            return new ResponseEntity<String>("Failed to upload", HttpStatus.BAD_REQUEST);
//        }
        return new ResponseEntity<String>("Done", HttpStatus.OK);
    }
}