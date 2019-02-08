package it.akademija.wizards.services;

import it.akademija.wizards.configs.MediaTypeUtils;
import it.akademija.wizards.entities.Document;
import it.akademija.wizards.entities.DocumentType;
import it.akademija.wizards.entities.User;
import it.akademija.wizards.entities.UserGroup;
import it.akademija.wizards.enums.DocumentState;
import it.akademija.wizards.models.document.DocumentCreateCommand;
import it.akademija.wizards.models.document.DocumentGetCommand;
import it.akademija.wizards.models.document.DocumentReviewCommand;
import it.akademija.wizards.models.document.DocumentUpdateCommand;
import it.akademija.wizards.models.user.UserGetCommand;
import it.akademija.wizards.repositories.DocumentRepository;
import it.akademija.wizards.repositories.DocumentTypeRepository;
import it.akademija.wizards.repositories.UserGroupRepository;
import it.akademija.wizards.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
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
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermission;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private DocumentTypeRepository documentTypeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserGroupRepository userGroupRepository;

    @Autowired
    private ServletContext servletContext;

    private static final String pathName = "documents";
    //GET
    @Transactional(readOnly = true)
    public List<DocumentGetCommand> getSubmittedDocuments() {
        return documentRepository.findAll()
                .stream()
                .filter(document -> !document.getDocumentState().equals(DocumentState.CREATED))
                .map(document -> mapEntityToGetCommand(document))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<DocumentGetCommand> getDocumentsToReview(String username) {
        return documentRepository.findAll()
                .stream()
                .filter(document -> document.getDocumentState().equals(DocumentState.SUBMITTED))
                .filter(document -> !document.getAuthor().getUsername().equals(username) && this.canReviewDocument(username, document))
                .map(document -> mapEntityToGetCommand(document))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DocumentGetCommand getDocumentsById(String id) {
        return mapEntityToGetCommand(this.getDocumentFromDB(id));
    }


    //CREATE
    @Transactional
    public ResponseEntity<String> createDocument(DocumentCreateCommand documentCreateCommand,
                                                 MultipartFile[] multipartFile) {
        User author = this.getUserFromDB(documentCreateCommand.getUsername());
        Document document = mapCreateCommandToEntity(documentCreateCommand);
        if (canCreateDocument(author.getUsername(), document)) {
            author.addDocument(document);
            try {
                this.uploadFiles(document, multipartFile);
            } catch (IOException e) {
                return new ResponseEntity<>("File upload failed", HttpStatus.BAD_REQUEST);
            }
            documentRepository.save(document);
        } else {
            //TODO UserCannotCreateDocumentException
            throw new IllegalArgumentException("User doesn't have permission to create this type of document");
        }
        return new ResponseEntity<>("Document was created", HttpStatus.CREATED);
    }

    //UPDATE
    @Transactional
    public ResponseEntity<String> updateDocumentById(
            String id,
            DocumentUpdateCommand documentUpdateCommand,
            MultipartFile[] multipartFile) {
        Document document = this.getDocumentFromDB(id);
        if (document.getDocumentState().equals(DocumentState.CREATED)) {
            if (multipartFile != null) {
                try {
                    deleteMainFile(document);
                    uploadFiles(document, multipartFile);
                } catch (IOException e) {
                    return new ResponseEntity<>("File upload failed", HttpStatus.BAD_REQUEST);
                }
            }
            documentRepository.save(mapUpdateCommandToEntity(documentUpdateCommand, document));
        } else {
            //TODO SubmittedDocumentUpdateNotAllowedException
            throw new IllegalArgumentException("Submitted documents cannot be updated");
        }
        return new ResponseEntity<>("Document updated", HttpStatus.OK);
    }


    //DELETE
    @Transactional
    public void deleteDocumentById(String id) {
        Document document = getDocumentFromDB(id);
        User author = document.getAuthor();
        deleteAllFiles(document);
        author.removeDocument(document);
        documentRepository.delete(document);
    }

    //SUBMIT
    @Transactional
    public void submitDocument(String id) {
        Document document = this.getDocumentFromDB(id);
        document.setSubmissionDate(new Date());
        document.setDocumentState(DocumentState.SUBMITTED);
    }

    //REVIEW
    @Transactional
    public void reviewDocument(String id, DocumentReviewCommand documentReviewCommand) {
        User reviewer = this.getUserFromDB(documentReviewCommand.getReviewerUsername());
        Document document = this.getDocumentFromDB(id);
        if (canReviewDocument(reviewer.getUsername(), document)) {
            document.setDocumentState(documentReviewCommand.getDocumentState());
            document.setReviewer(reviewer);
            document.setReviewDate();
            if (document.getDocumentState().equals(DocumentState.REJECTED))
                document.setRejectionReason(documentReviewCommand.getRejectionReason());
        } else {
            //TODO UserCannotReviewDocumentException
            throw new IllegalArgumentException("User doesn't have permission to review this type of document");
        }
    }
// DELETES ONE FILE IN DOCUMENT
    @Transactional
    public ResponseEntity<String> deleteFileByFileName (
            String documentId,
            String fileName){
        Document document = this.getDocumentFromDB(documentId);
        if(document.getPath().equals(fileName)){
            deleteMainFile(document);
        } else {
            deleteAdditionalFiles(document, fileName);
        }

        return new ResponseEntity<>("File " + fileName + " was deleted.", HttpStatus.CREATED);
    }

//    DOWNLOAD DOCUMENT MAIN FILE
    @Transactional
    public ResponseEntity downloadFile(String documentId) throws FileNotFoundException {
        Document document = documentRepository.getOne(documentId);
        String originalFileName = document.getPath();
        MediaType mediaType = MediaTypeUtils.getMediaTypeForFile(this.servletContext, originalFileName);
        File file = new File(getDocumentFolder(document).getPath()
                + File.separator
                + document.getPath());
        if (file.exists()) {
            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + originalFileName +"\"");
            headers.add("Access-Control-Expose-Headers",
                    HttpHeaders.CONTENT_DISPOSITION + "," + HttpHeaders.CONTENT_LENGTH);
            headers.setContentType(mediaType);
            return ResponseEntity.ok().headers(headers).
                    body(resource);
        }
        return ResponseEntity.notFound().build();

    }
    // GET ALL DOCUMENTS WITH FOLDERS
    @Transactional
    public ResponseEntity downloadAllDocuments(String username) throws IOException {
        long time1 = System.currentTimeMillis();
        User user = this.getUserFromDB(username);
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
            zs.flush();;
            fos.flush();
            zs.close();
            fos.close();
            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + "compressed.zip" + "\"");
            headers.add("Access-Control-Expose-Headers",
                    HttpHeaders.CONTENT_DISPOSITION + "," + HttpHeaders.CONTENT_LENGTH);
            long time2 = System.currentTimeMillis();
            System.out.println(time2 - time1);
            return ResponseEntity.ok().headers(headers).body(resource);
        }
        return ResponseEntity.notFound().build();
    }
//
//    // GET ALL DOCUMENTS
//    @Transactional
//    public ResponseEntity downloadAllDocuments(String username) throws IOException {
//        User user = this.getUserFromDB(username);
//        List<String> addedFiles = new ArrayList<>();
//        for(Document doc: user.getDocuments()){
//            System.out.println(doc.getPath());
//        }
//        if (user != null) {
//            List<Document> documents = user.getDocuments();
//            if (documents != null) {
//                ByteArrayOutputStream baos = new ByteArrayOutputStream();
//                FileOutputStream fos = new FileOutputStream(
//                        pathName +
//                                File.separator +
//                                username +
//                                File.separator +
//                                "compressed.zip");
//                ZipOutputStream zos = new ZipOutputStream(fos);
//                byte bytes[] = new byte[2048];
//
//                for (Document document : documents) {
//                    String originalFileName = document.getPath();
//                    String filePath =(getDocumentFolder(document).getPath()
//                            + File.separator
//                            + document.getPath());
//                    if(addedFiles.contains(originalFileName)){
//                        addedFiles.add(document.getPath());
//                        originalFileName = document.getPath();
//                    }else {
//                        addedFiles.add(originalFileName);
//                    }
//                    FileInputStream fis = new FileInputStream(filePath);
//                    BufferedInputStream bis = new BufferedInputStream(fis);
//                    zos.putNextEntry(new ZipEntry(originalFileName));
//                    int bytesRead;
//                    while ((bytesRead = bis.read(bytes)) != -1) {
//                        zos.write(bytes, 0, bytesRead);
//                    }
//                    zos.closeEntry();
//                    bis.close();
//                    fis.close();
//                }
//                zos.flush();
//                baos.flush();
//                fos.flush();
//                zos.close();
//                baos.close();
//                fos.close();
//                File file = new File(
//                        pathName +
//                                "/" +
//                                user.getUsername() +
//                                "/" +
//                                "compressed.zip");
//                InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
//                HttpHeaders headers = new HttpHeaders();
//                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + "compressed.zip" + "\"");
//                headers.add("Access-Control-Expose-Headers",
//                        HttpHeaders.CONTENT_DISPOSITION + "," + HttpHeaders.CONTENT_LENGTH);
//                return ResponseEntity.ok().headers(headers).body(resource);
//            }
//        } else {
//            return ResponseEntity.notFound().build();
//
//        }
//        return ResponseEntity.notFound().build();
//    }


    //PACKAGE METHODS (MAPPING)
    DocumentGetCommand mapEntityToGetCommand(Document document) {
        DocumentGetCommand documentGetCommand = new DocumentGetCommand();
        BeanUtils.copyProperties(document, documentGetCommand);
        UserGetCommand author = this.mapUserEntityToGetCommand(document.getAuthor());
        documentGetCommand.setAuthor(author);
        if (document.getReviewer() != null) {
            UserGetCommand reviewer = this.mapUserEntityToGetCommand(document.getReviewer());
            documentGetCommand.setReviewer(reviewer);
        }
        documentGetCommand.setDocumentTypeTitle(document.getDocumentType().getTitle());
        return documentGetCommand;
    }

    @Transactional(readOnly = true)
    Document mapCreateCommandToEntity(DocumentCreateCommand documentCreateCommand) {
        Document document = new Document();
        DocumentType documentType = this.getDocTypeFromDB(documentCreateCommand.getDocumentTypeTitle());
        User author = this.getUserFromDB(documentCreateCommand.getUsername());
        BeanUtils.copyProperties(documentCreateCommand, document);
        document.setDocumentState(DocumentState.CREATED);
        document.setCreationDate(new Date());
        document.setDocumentType(documentType);
        document.setAuthor(author);
        document.setPrefix();
        return document;
    }

    @Transactional(readOnly = true)
    Document mapUpdateCommandToEntity(DocumentUpdateCommand documentUpdateCommand, Document document) {
        DocumentType documentType = this.getDocTypeFromDB(documentUpdateCommand.getDocumentTypeTitle());
        BeanUtils.copyProperties(documentUpdateCommand, document);
        document.setDocumentType(documentType);
        return document;
    }

    UserGetCommand mapUserEntityToGetCommand(User user) {
        UserGetCommand userGetCommand = new UserGetCommand();
        BeanUtils.copyProperties(user, userGetCommand);
        return userGetCommand;
    }

    //PRIVATE METHODS
    @Transactional
    private User getUserFromDB(String username) throws ResourceNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) throw new ResourceNotFoundException("user not found");
        else return user;
    }

    @Transactional
    private DocumentType getDocTypeFromDB(String title) throws ResourceNotFoundException {
        DocumentType documentType = documentTypeRepository.findByTitle(title);
        if (documentType == null) throw new ResourceNotFoundException("document type not found");
        else return documentType;
    }

    @Transactional
    private Document getDocumentFromDB(String id) throws ResourceNotFoundException {
        return documentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("document not found"));
    }

    private boolean canReviewDocument(String username, Document document) {
        User user = this.getUserFromDB(username);
        for (UserGroup userGroup : user.getUserGroups()) {
            for (DocumentType allowedDocumentType : userGroup.getReviewDocumentType()) {
                if (document.getDocumentType().equals(allowedDocumentType)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean canCreateDocument(String username, Document document) {
        User user = this.getUserFromDB(username);
        for (UserGroup userGroup : user.getUserGroups()) {
            for (DocumentType allowedDocumentType : userGroup.getSubmissionDocumentType()) {
                if (document.getDocumentType().equals(allowedDocumentType)) {
                    return true;
                }
            }
        }
        return false;
    }

    @Transactional
    private void uploadFile(Document document, MultipartFile multipartFile) throws IOException {
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
        File file = new File(folder.getPath(), originalFileName);
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


    @Transactional
    private void uploadFiles(Document document, MultipartFile[] multipartFile) throws IOException {
        File path = new File(pathName
                + File.separator
                + document.getAuthor().getUsername()
                +   File.separator
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
    private void deleteAllFiles(Document document) {
        if (document.getDocumentState().equals(DocumentState.CREATED)) {
            File folder = getDocumentFolder(document);
            deleteFolder(folder);
        } else {
            throw new IllegalArgumentException("Cannot delete file that is already submitted.");
        }
    }

    @Transactional
    private void deleteMainFile(Document document) {
        if (document.getDocumentState().equals(DocumentState.CREATED)) {
            File folder = getDocumentFolder(document);
            File file = new File(folder.getPath()
                    + File.separator
                    + document.getPath());
            file.delete();
            if (Objects.requireNonNull(folder.list()).length == 0) {
                deleteFolder(folder);
            }
        } else {
            throw new IllegalArgumentException("Cannot delete file that is already submitted.");
        }
    }

    @Transactional
    private void deleteAdditionalFiles(Document document, String fileName) {
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
    //    TODO: WHEN TO USE @TRANSACTIONAL? kai kreipies į duombazę
    @Transactional
    private File getDocumentFolder(Document document) {
        return new File(pathName
                + File.separator
                + document.getAuthor().getUsername()
                + File.separator
                + formatLocalDateTime(
                convertToLocalDateTimeViaMilisecond(document.getCreationDate()
                )
        ));
    }
//    Date TO LocalDateTime CONVERTER
    @Transactional
    private LocalDateTime convertToLocalDateTimeViaMilisecond(Date dateToConvert) {
        return Instant.ofEpochMilli(dateToConvert.getTime())
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
    }
//    Date format
    @Transactional
    private String formatLocalDateTime(LocalDateTime localDateTime){
        DateTimeFormatter dataTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd_HH:mm:ss", Locale.US);
        return localDateTime.format(dataTimeFormatter);
    }

    void deleteFolder(File folder){
        if(folder.exists()) {
            for (String s : folder.list()) {
                File currentFile = new File(folder.getPath(), s);
                currentFile.delete();
            }
            folder.delete();
        } else {
            throw new IllegalArgumentException("Folder by this name does not exist");
        }
    }

    //    Zip folders
    public  void addDirToZipArchive(ZipOutputStream zos, File fileToZip, String parrentDirectoryName) throws Exception {
        if (fileToZip == null || !fileToZip.exists()) {
            return;
        }

        String zipEntryName = fileToZip.getName();
        if (parrentDirectoryName!=null && !parrentDirectoryName.isEmpty()) {
            zipEntryName = parrentDirectoryName + File.separator + fileToZip.getName();
        }

        if (fileToZip.isDirectory()) {
            System.out.println("+" + zipEntryName);
            for (File file : fileToZip.listFiles()) {
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
}

