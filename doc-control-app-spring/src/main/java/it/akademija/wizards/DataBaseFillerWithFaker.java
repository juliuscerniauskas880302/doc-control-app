package it.akademija.wizards;

import com.github.javafaker.Faker;
import it.akademija.wizards.entities.*;
import it.akademija.wizards.enums.DocumentState;
import it.akademija.wizards.enums.RoleName;
import it.akademija.wizards.exception.model.AppException;
import it.akademija.wizards.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class DataBaseFillerWithFaker {

    // REPOSITORIES
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserGroupRepository userGroupRepository;
    @Autowired
    private DocumentTypeRepository documentTypeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public void fillInDatabaseWithData(int groups, int users, int docTypes, int avgDocsForUser) {
        final int groupsCount = groups;
        final int usersCount = users;
        final int docTypesCount = docTypes;
        final int avgDocsPerUser = avgDocsForUser;

        // Create roles
        createRoles();
        // Create Groups
        createUserGroups(groupsCount);
        // Create Users
        createUsers(usersCount);
        // Create Doctypes
        createDocTypes(docTypesCount);
        // Add users to groups and add doctypes to groups
        addUsersToGroups();
        // Add grous for doc submission and review
        addGroupsForDocTypes();
        // Create documents
        createDocuments(avgDocsPerUser);
    }

    @Transactional
    public void createRoles() {
        roleRepository.save(new Role(RoleName.ROLE_USER));
        roleRepository.save(new Role(RoleName.ROLE_ADMIN));
    }

    @Transactional
    public void createUsers(int usersCount) {
        Faker faker = new Faker();
        List<User> users = new ArrayList<>();
        Role roleAdmin = roleRepository.findByName(RoleName.ROLE_ADMIN).orElseThrow(
                () -> new AppException("Admin Role not set")
        );
        Role roleUser = roleRepository.findByName(RoleName.ROLE_USER).orElseThrow(
                () -> new AppException("User Role not set")
        );
        for (int i = 1; i <= usersCount; i++) {
            boolean isAdmin = (int) Math.floor(Math.random() * 11) < 3;
            User user = new User();
            user.setUsername(faker.ancient().titan().concat("" + i));
            user.setPassword(passwordEncoder.encode("root"));
            user.setFirstname(faker.name().firstName());
            user.setLastname(faker.name().lastName());
            user.setEmail(faker.internet().emailAddress());
            user.setAdmin(isAdmin);
            Role userRole = isAdmin ? roleAdmin : roleUser;
            user.getRoles().add(userRole);
            users.add(user);
        }
        // Add root admin
        User user = new User();
        user.setUsername("root");
        user.setPassword(passwordEncoder.encode("root"));
        user.setFirstname("Rootas");
        user.setLastname("Rootenis");
        user.setEmail("rootas@rooteninc.com");
        user.setAdmin(true);
        user.getRoles().add(roleAdmin);
        users.add(user);
        userRepository.saveAll(users);
    }

    @Transactional
    public void createUserGroups(int groupsCount) {
        Faker faker = new Faker();
        List<UserGroup> newUserGroups = new ArrayList<>();
        for (int i = 1; i <= groupsCount; i++) {
            UserGroup userGroup = new UserGroup();
            userGroup.setTitle(faker.company().industry()+i);
            newUserGroups.add(userGroup);
        }
        userGroupRepository.saveAll(newUserGroups);
    }

    @Transactional
    public void createDocTypes(int docTypesCount) {
        Faker faker = new Faker();
        List<DocumentType> documentTypes = new ArrayList<>();
        for (int i = 1; i <= docTypesCount; i++) {
            DocumentType documentType = new DocumentType();
            documentType.setTitle(faker.book().title()+i);
            documentTypes.add(documentType);
        }
        documentTypeRepository.saveAll(documentTypes);
    }

    @Transactional
    public void addUsersToGroups() {
        List<User> users = userRepository.findAll().stream().filter(user -> !user.isAdmin()).collect(Collectors.toList());
        List<UserGroup> groups = userGroupRepository.findAll();

        for (int i = 0; i < groups.size(); i++) {
            int usersToAdd = (int) Math.floor(Math.random() * users.size() + 1);
            UserGroup userGroup = groups.get(i);

            // Add users to group
            Set<User> usersListToAdd = new HashSet<>();
            for (int y = 0; y < usersToAdd; y++) {
                User user = users.get((int) Math.floor(Math.random() * usersToAdd));
                usersListToAdd.add(user);
            }
            userGroup.setUsers(usersListToAdd);
            // Save group to database
            userGroupRepository.save(userGroup);
        }
    }

    @Transactional
    public void addGroupsForDocTypes() {
        List<DocumentType> documentTypeList = documentTypeRepository.findAll();
        List<UserGroup> userGroupList = userGroupRepository.findAll();
        int userGroupListSize = userGroupList.size();

        for (DocumentType documentType : documentTypeList) {
            Set<UserGroup> submissionGroups = new HashSet<>();
            Set<UserGroup> reviewGroups = new HashSet<>();
            int sumissionGroupsToAdd = (int) Math.floor(Math.random() * userGroupListSize + 1);
            int reviewGroupsToAdd = (int) Math.floor(Math.random() * userGroupListSize + 1);
            for (int i = 0; i < sumissionGroupsToAdd; i++) {
                UserGroup userGroup = userGroupList.get((int) Math.floor(Math.random() * userGroupListSize));
                submissionGroups.add(userGroup);
            }
            for (int i = 0; i < reviewGroupsToAdd; i++) {
                UserGroup userGroup = userGroupList.get((int) Math.floor(Math.random() * userGroupListSize));
                reviewGroups.add(userGroup);

            }
            documentType.setSubmissionUserGroups(submissionGroups);
            documentType.setReviewUserGroups(reviewGroups);
            documentTypeRepository.save(documentType);
        }
    }

    @Transactional
    public void createDocuments(int avgDocsPerUser) {
        Faker faker = new Faker();
        List<User> users = userRepository.findAll().stream().filter(user -> !user.isAdmin()).collect(Collectors.toList());
        List<DocumentType> documentTypes = documentTypeRepository.findAll();
        int typesSize = documentTypes.size();
        int documentsToCreate = avgDocsPerUser * users.size();
        List<Document> documents = new ArrayList<>();

        while (documentsToCreate > documents.size()) {
            for (User user : users) {
                int docsForUser = (int) Math.floor(Math.random() * (avgDocsPerUser + 1));
                int docsToCreate = docsForUser <= (documentsToCreate - documents.size()) ?
                        docsForUser : (int) Math.floor(Math.random() * ((documentsToCreate - documents.size()) + 1));
                for (int i = 1; i <= docsToCreate; i++) {
                    Document document = new Document();
                    Date creationDate = faker.date().past(60, 5, TimeUnit.DAYS);
                    document.setAuthor(user);
                    document.setCreationDate(creationDate);
                    if (i % 5 == 0) {
                        document.setDocumentState(DocumentState.REJECTED);
                        Date submissionDate = faker.date().between(creationDate, new Date());
                        document.setSubmissionDate(submissionDate);
                        Date rejectionDate = faker.date().between(submissionDate, new Date());
                        document.setRejectionDate(rejectionDate);
                    } else if (i % 3 == 0) {
                        document.setDocumentState(DocumentState.ACCEPTED);
                        Date submissionDate = faker.date().between(creationDate, new Date());
                        document.setSubmissionDate(submissionDate);
                        Date approvalDate = faker.date().between(submissionDate, new Date());
                        document.setApprovalDate(approvalDate);
                    } else if (i % 2 == 0) {
                        document.setDocumentState(DocumentState.SUBMITTED);
                        Date submissionDate = faker.date().between(creationDate, new Date());
                        document.setSubmissionDate(submissionDate);
                    } else {
                        document.setDocumentState(DocumentState.CREATED);
                    }
                    DocumentType documentType = documentTypes.get((int) Math.floor(Math.random() * typesSize));
                    document.setDocumentType(documentType);
                    document.setTitle(faker.company().industry());
                    document.setDescription(faker.chuckNorris().fact());
                    document.setCreationDate(new Date());
                    document.setPrefix(UUID.randomUUID().toString());

                    documents.add(document);
                }
            }
        }
        documentRepository.saveAll(documents);
    }

}
