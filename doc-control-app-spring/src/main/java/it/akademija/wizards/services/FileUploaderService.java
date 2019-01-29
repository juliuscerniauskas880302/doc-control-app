package it.akademija.wizards.services;

import it.akademija.wizards.entities.Document;
import it.akademija.wizards.models.document.DocumentCreateCommand;
import it.akademija.wizards.repositories.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermission;
import java.util.HashSet;
import java.util.Set;

@Service
public class FileUploaderService {


    @Autowired
    private DocumentService documentService;

    @Autowired
    private  DocumentRepository documentRepository;

    public FileUploaderService(DocumentService documentService, DocumentRepository documentRepository) {
        this.documentService = documentService;
        this.documentRepository = documentRepository;
    }

    @Transactional
    public void uploadFile(MultipartFile multipartFile, DocumentCreateCommand documentCreateCommand) throws IOException {
        Document document = documentService.mapCreateCommandToEntity(documentCreateCommand);
        Document savedDocument = documentRepository.save(document);
        documentService.addToUserList(document);

        System.out.println(savedDocument);
        File path = new File("documents/" + savedDocument.getAuthor().getUsername());
        path.mkdirs();
        String originalFileName = multipartFile.getOriginalFilename();
        String updatedFileName = originalFileName + savedDocument.getPrefix();
        savedDocument.setPath(updatedFileName);
        byte[] buf = new byte[1024];
        File file = new File(path.getPath(), updatedFileName);
        try (InputStream inputStream = multipartFile.getInputStream();
             FileOutputStream fileOutputStream = new FileOutputStream(file)) {
            int numRead = 0;
            while ((numRead = inputStream.read(buf)) >= 0) {
                fileOutputStream.write(buf, 0, numRead);
            }
        }
        Set<PosixFilePermission> perms = new HashSet<>();
        // add owners permission
        perms.add(PosixFilePermission.OWNER_READ);
        perms.add(PosixFilePermission.OWNER_WRITE);
        perms.add(PosixFilePermission.GROUP_READ);
        perms.add(PosixFilePermission.GROUP_WRITE);
        // add others permissions
        perms.add(PosixFilePermission.OTHERS_READ);
        Files.setPosixFilePermissions(Paths.get(file.toString()), perms);
    }
}
