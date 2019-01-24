package it.akademija.wizards.services;

import it.akademija.wizards.entities.DBFile;
import it.akademija.wizards.repositories.DBFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class DBFileService {

    @Autowired
    private DBFileRepository dbFileRepository;

    @Transactional
    public DBFile storeFile(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            if (fileName.contains("..")) {
                throw new IOException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            DBFile dbFile = new DBFile(fileName, file.getContentType(), file.getBytes());
            return dbFileRepository.save(dbFile);
        } catch (IOException ex) {
            throw new IOException("Could not store file " + fileName + ". Please try again!");
        }
    }

    @Transactional
    public DBFile getFile(String fileId) throws IOException {
        return dbFileRepository.findById(fileId)
                .orElseThrow(() -> new IOException("File not found with id " + fileId));
    }
}
