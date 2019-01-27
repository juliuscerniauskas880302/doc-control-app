package it.akademija.wizards.controllers;

import io.swagger.annotations.*;
import it.akademija.wizards.services.FileUploaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/files")
public class FileUploaderController {

    @Autowired
    private FileUploaderService fileUploaderService;

    @PostMapping("/upload")
    @ApiOperation(value = "Make a POST request to upload the file",
            produces = "application/json", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadFile(
            @ApiParam(name = "file", value = "Select the file to Upload", required = true)
            @RequestPart("file") MultipartFile[] file) {
        for (int i = 0; i < file.length; i++) {
            System.out.println("File size: " + file[i].getSize() + "\nFile name: " + file[i].getOriginalFilename());
        }
        try {
            fileUploaderService.uploadFile(file);
        } catch (IOException ex) {
            return new ResponseEntity<String>("Failed to upload", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>("Done", HttpStatus.OK);
    }
}