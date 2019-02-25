package it.akademija.wizards.services;

import it.akademija.wizards.configs.MediaTypeUtils;
import it.akademija.wizards.entities.Document;
import it.akademija.wizards.entities.User;
import it.akademija.wizards.enums.DocumentState;
import it.akademija.wizards.services.auxiliary.ResourceFinder;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermission;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class FileService {

    private static final String pathName = "documents";
    @Autowired
    private ResourceFinder resourceFinder;
    @Autowired
    private ServletContext servletContext;


    // DELETES ONE FILE IN DOCUMENT
    @Transactional
    public ResponseEntity<String> deleteFileByFileName(
            Document document,
            String fileName) {
            deleteAdditionalFiles(document, fileName);
        return new ResponseEntity<>("File " + fileName + " was deleted.", HttpStatus.CREATED);
    }

    //    DOWNLOAD DOCUMENT MAIN FILE
    @Transactional
    public ResponseEntity downloadMainFile(String documentId) throws FileNotFoundException {
        Document document = resourceFinder.getDocument(documentId);
        String originalFileName = document.getPath();
        MediaType mediaType = MediaTypeUtils.getMediaTypeForFile(this.servletContext, originalFileName);
        File file = new File(getDocumentFolder(document).getPath()
                + File.separator
                + document.getPath());
        if (file.exists()) {
            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + originalFileName + "\"");
            headers.add("Access-Control-Expose-Headers",
                    HttpHeaders.CONTENT_DISPOSITION + "," + HttpHeaders.CONTENT_LENGTH);
            headers.setContentType(mediaType);
            return ResponseEntity.ok().headers(headers).
                    body(resource);
        }
        return ResponseEntity.notFound().build();

    }

    //    DOWNLOAD DOCUMENT FILE
    @Transactional
    public ResponseEntity downloadFile(String documentId, String filePath) throws FileNotFoundException {
        Document document = resourceFinder.getDocument(documentId);
//        String originalFileName = document.getPath();

        if(filePath.equals(document.getPath())) {

            File file = new File(getDocumentFolder(document).getPath()
                    + File.separator
                    + document.getPath());
            if (file.exists()) {
                MediaType mediaType = MediaTypeUtils.getMediaTypeForFile(this.servletContext, filePath);
                InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filePath + "\"");
                headers.add("Access-Control-Expose-Headers",
                        HttpHeaders.CONTENT_DISPOSITION + "," + HttpHeaders.CONTENT_LENGTH);
                headers.setContentType(mediaType);
                return ResponseEntity.ok().headers(headers).
                        body(resource);
            }
        } else if (document.getAdditionalFilePaths().contains(filePath)){
            File file = new File(getDocumentFolder(document).getPath()
                    + File.separator
                    + filePath);
            if (file.exists()) {
                MediaType mediaType = MediaTypeUtils.getMediaTypeForFile(this.servletContext, filePath);
                InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filePath + "\"");
                headers.add("Access-Control-Expose-Headers",
                        HttpHeaders.CONTENT_DISPOSITION + "," + HttpHeaders.CONTENT_LENGTH);
                headers.setContentType(mediaType);
                return ResponseEntity.ok().headers(headers).
                        body(resource);
            }
        }


        return ResponseEntity.notFound().build();

    }

    // GET ALL ATTACHMENTS WITH FOLDERS
    @Transactional
    public ResponseEntity downloadAllDocuments(String username) throws IOException {
        long time1 = System.currentTimeMillis();
        User user = resourceFinder.getUser(username);
        String csvFilePath = pathName
                + File.separator
                + user.getUsername()
                + File.separator
                + user.getUsername()
                + ".csv";
        File csvFile = createCsv(user);
        List<Document> documents = user.getDocuments();
        if (documents != null) {

            File file = new File(pathName +
                    File.separator +
                    username +
                    File.separator +
                    "dokumentai.zip");
            FileOutputStream fos = new FileOutputStream(file);
            ZipOutputStream zs = new ZipOutputStream(fos);

            for (Document d :
                    documents) {
                File documentFile = getDocumentFolder(d);
                try {
                    addDirToZipArchive(zs, documentFile, "");
                } catch (Exception e) {
                    return new ResponseEntity<>("Archiving failed", HttpStatus.BAD_REQUEST);
                }
            }
            try{
                addDirToZipArchive(zs, csvFile, "" );
            } catch (Exception e) {
                return new ResponseEntity<>("Archiving CSV failed", HttpStatus.BAD_REQUEST);
            }
            zs.flush();
            fos.flush();
            zs.close();
            fos.close();
            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
            HttpHeaders headers = new HttpHeaders();

            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + username + ".zip"+  "\"");
            headers.add("Access-Control-Expose-Headers",
                    HttpHeaders.CONTENT_DISPOSITION + "," + HttpHeaders.CONTENT_LENGTH);
            long time2 = System.currentTimeMillis();
            System.out.println(time2 - time1);
            return ResponseEntity.ok().headers(headers).body(resource);
        }
        return ResponseEntity.notFound().build();
    }

    @Transactional
    public void uploadMainFile(Document document, MultipartFile multipartFile) throws IOException {
        File folder = getDocumentFolder(document);
//        File path = new File(pathName
//                + File.separator
//                + document.getAuthor().getUsername()
//                +   File.separator
//                + formatLocalDateTime(convertToLocalDateTimeViaMilisecond(document.getCreationDate())));
        boolean mkdirs = folder.mkdirs();
        String originalFileName = multipartFile.getOriginalFilename();
//        String updatedFileName = originalFileName + document.getPrefix();
        document.setPath(originalFileName);
        byte[] buf = new byte[1024];
        assert originalFileName != null;
        File file = new File(folder.getPath(), originalFileName);
        try (InputStream inputStream = multipartFile.getInputStream();
             FileOutputStream fileOutputStream = new FileOutputStream(file)) {
            int numRead;
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
    @Transactional
    public void uploadAdditionalFile(Document document, MultipartFile multipartFile) throws IOException {
        File folder = getDocumentFolder(document);
        boolean mkdirs = folder.mkdirs();
        String originalFileName = multipartFile.getOriginalFilename();
        List<String> additionalFilePaths = document.getAdditionalFilePaths();
        additionalFilePaths.add(originalFileName);
        document.setAdditionalFilePaths(additionalFilePaths);
        byte[] buf = new byte[1024];
        assert originalFileName != null;
        File file = new File(folder.getPath(), originalFileName);
        try (InputStream inputStream = multipartFile.getInputStream();
             FileOutputStream fileOutputStream = new FileOutputStream(file)) {
            int numRead;
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
    @Transactional
    public void uploadFiles(Document document, MultipartFile[] multipartFile) throws IOException {

        File path = new File(pathName
                + File.separator
                + document.getAuthor().getUsername()
                + File.separator
                + formatLocalDateTime(convertToLocalDateTimeViaMilisecond(document.getCreationDate())));
        path.mkdirs();
        for (int i = 0; i < multipartFile.length; i++) {
            String originalFileName = multipartFile[i].getOriginalFilename();
            if (i == 0) {
                document.setPath(originalFileName);
            } else {
                document.getAdditionalFilePaths().add(originalFileName);
            }
            byte[] buf = new byte[1024];
            assert originalFileName != null;
            File file = new File(path.getPath(), originalFileName);
            try (InputStream inputStream = multipartFile[i].getInputStream();
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

    //    DELETES ONLY CREATED DOCUMENT FILES
    @Transactional
    public void deleteAllFiles(Document document) {
        if (document.getDocumentState().equals(DocumentState.CREATED)) {
            document.setAdditionalFilePaths(null);
            document.setPath(null);
            File folder = getDocumentFolder(document);
            deleteFolder(folder);
        } else {
            throw new IllegalArgumentException("Cannot delete file that is already submitted.");
        }
    }

    @Transactional
    public void deleteMainFile(Document document) {
        if (document.getDocumentState().equals(DocumentState.CREATED)) {
            File folder = getDocumentFolder(document);
            File file = new File(folder.getPath()
                    + File.separator
                    + document.getPath());
            boolean delete = file.delete();
            if (Objects.requireNonNull(folder.list()).length == 0) {
                deleteFolder(folder);
            }
        } else {
            throw new IllegalArgumentException("Cannot delete file that is already submitted.");
        }
    }

    @Transactional
    public void deleteAdditionalFiles(Document document, String fileName) {
        if (document.getDocumentState().equals(DocumentState.CREATED)) {
            if (document.getAdditionalFilePaths() != null) {
                File folder = getDocumentFolder(document);
                for (String p :
                        document.getAdditionalFilePaths()) {
                    File files = new File(folder.getPath()
                            + File.separator
                            + p);
                    boolean delete = files.delete();
                }
                document.getAdditionalFilePaths().remove(fileName);
                if (Objects.requireNonNull(folder.list()).length == 0) {
                    deleteFolder(folder);
                }

            } else {
                throw new IllegalArgumentException("There is no attachment named \"" + fileName + "\".");
            }
        } else {
            throw new IllegalArgumentException("Cannot delete file that is already submitted.");
        }
    }

    @Transactional
    public File getDocumentFolder(Document document) {
        return new File(pathName
                + File.separator
                + document.getAuthor().getUsername()
                + File.separator
                + formatLocalDateTime(
                convertToLocalDateTimeViaMilisecond(document.getCreationDate()
                )
        ));
    }

    @Transactional
    public ResponseEntity downloadCSV(User user) {
        if (user != null) {
            String csvFilePath = pathName
                    + File.separator
                    + user.getUsername()
                    + File.separator
                    + user.getUsername()
                    + ".csv";
            List<Document> documents = user.getDocuments();
            try (
                    BufferedWriter writer = Files.newBufferedWriter(Paths.get(csvFilePath));


                    CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                            .withHeader(
                                    "Autorius",
                                    "Pavadinimas",
                                    "Aprasymas",
                                    "Sukurimo data",
                                    "Dokumento tipas",
                                    "Dokumento busena",
                                    "Issiuntimo data",
                                    "Patvirtinimo data",
                                    "Atmetimo data",
                                    "Perziurejo",
                                    "Atmetimo prizastis"
                            )
                    )
            ) {
                for (Document doc : documents) {
                    User reviewer = doc.getReviewer();
                    String reviewerFullName = "";
                    if(reviewer != null){
                        reviewerFullName = reviewer.getFirstname() + " " +reviewer.getLastname();
                    }
                    csvPrinter.printRecord(
                            doc.getAuthor().getFirstname() + " " + doc.getAuthor().getLastname(),
                            doc.getTitle(),
                            doc.getDescription(),
                            doc.getCreationDate(),
                            doc.getDocumentType().getTitle(),
                            doc.getDocumentState(),
                            doc.getSubmissionDate(),
                            doc.getApprovalDate(),
                            doc.getRejectionDate(),
                            reviewerFullName,
                            doc.getRejectionReason()
                    );
                }


                csvPrinter.flush();
                MediaType mediaType = MediaTypeUtils.getMediaTypeForFile(this.servletContext, csvFilePath);
                InputStreamResource resource = new InputStreamResource(new FileInputStream(csvFilePath));
                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + user.getUsername() + ".csv" + "\"");
                headers.add("Access-Control-Expose-Headers",
                        HttpHeaders.CONTENT_DISPOSITION + "," + HttpHeaders.CONTENT_LENGTH);
                headers.setContentType(mediaType);
                return ResponseEntity.ok().headers(headers).
                        body(resource);


            } catch (IOException ex) {
                return new ResponseEntity("Could not create csv file", HttpStatus.EXPECTATION_FAILED);
            }
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

    }
//  Create CSV
    private File createCsv(User user) {
        String csvFilePath = pathName
                + File.separator
                + user.getUsername()
                + File.separator
                + user.getUsername()
                + ".csv";
        List<Document> documents = user.getDocuments();
        try (
                BufferedWriter writer = Files.newBufferedWriter(Paths.get(csvFilePath));


                CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                        .withHeader(
                                "Autorius",
                                "Pavadinimas",
                                "Aprasymas",
                                "Sukurimo data",
                                "Dokumento tipas",
                                "Dokumento busena",
                                "Issiuntimo data",
                                "Patvirtinimo data",
                                "Atmetimo data",
                                "Perziurejo",
                                "Atmetimo prizastis"
                        )
                )
        ) {
            for (Document doc : documents) {
                User reviewer = doc.getReviewer();
                String reviewerFullName = "";
                if (reviewer != null) {
                    reviewerFullName = reviewer.getFirstname() + " " + reviewer.getLastname();
                }
                csvPrinter.printRecord(
                        doc.getAuthor().getFirstname() + " " + doc.getAuthor().getLastname(),
                        doc.getTitle(),
                        doc.getDescription(),
                        doc.getCreationDate(),
                        doc.getDocumentType().getTitle(),
                        doc.getDocumentState(),
                        doc.getSubmissionDate(),
                        doc.getApprovalDate(),
                        doc.getRejectionDate(),
                        reviewerFullName,
                        doc.getRejectionReason()
                );
            }


            csvPrinter.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new File(csvFilePath);
    }
        ;

    //    Zip folders
    private void addDirToZipArchive(ZipOutputStream zos, File fileToZip, String parentDirectoryName) throws Exception {
        if (fileToZip == null || !fileToZip.exists()) {
            return;
        }

        String zipEntryName = fileToZip.getName();
        if (parentDirectoryName != null && !parentDirectoryName.isEmpty()) {
            zipEntryName = parentDirectoryName + File.separator + fileToZip.getName();
        }

        if (fileToZip.isDirectory()) {
            System.out.println(zipEntryName);
            for (File file : Objects.requireNonNull(fileToZip.listFiles())) {
                addDirToZipArchive(zos, file, zipEntryName);
            }
        } else {
            System.out.println("   " + zipEntryName);
            byte[] buffer = new byte[1024];
            FileInputStream fis = new FileInputStream(fileToZip);
            zos.putNextEntry(new ZipEntry(zipEntryName));
            int length;
            while ((length = fis.read(buffer)) > 0) {
                zos.write(buffer, 0, length);
            }
            zos.closeEntry();
            fis.close();
        }
    }

    private void deleteFolder(File folder) {
        if (folder.exists()) {
            for (String s : Objects.requireNonNull(folder.list())) {
                File currentFile = new File(folder.getPath(), s);
                boolean delete = currentFile.delete();
            }
            boolean delete = folder.delete();
        } else {
            throw new IllegalArgumentException("Folder by this name does not exist");
        }
    }

    //    Date TO LocalDateTime CONVERTER
    private LocalDateTime convertToLocalDateTimeViaMilisecond(Date dateToConvert) {
        return Instant.ofEpochMilli(dateToConvert.getTime())
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
    }

    //    Date format
    private String formatLocalDateTime(LocalDateTime localDateTime) {
        DateTimeFormatter dataTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd_HH:mm:ss", Locale.US);
        return localDateTime.format(dataTimeFormatter);
    }



}
