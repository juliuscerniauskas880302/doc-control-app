package it.akademija.wizards.services;

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

    @Transactional
    public void uploadFile(MultipartFile[] multipartFile) throws IOException {
        //TODO: remove hard coded file path
        //TODO: remove hard coded username
        //TODO: change uploadFile method to receive username, document type and document details
        //TODO: save information to user entity and document entity
        //TODO: make better handling for exceptions
        File path = new File("documents/username");
        path.mkdirs();
        for (MultipartFile f : multipartFile) {
            String originalFileName = f.getOriginalFilename();
            int dot = originalFileName.lastIndexOf(".");
            String extension = (dot == -1) ? "" : originalFileName.substring(dot + 1);
            String updatedFileName = originalFileName + "_username_" + System.currentTimeMillis();
            byte[] buf = new byte[1024];
            File file = new File(path.getPath(), updatedFileName);
            try (InputStream inputStream = f.getInputStream();
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
}
