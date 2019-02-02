package it.akademija.wizards;

import it.akademija.wizards.models.documenttype.DocumentTypeCreateCommand;
import it.akademija.wizards.models.documenttype.DocumentTypeGetCommand;
import it.akademija.wizards.models.user.UserAddGroupsCommand;
import it.akademija.wizards.models.user.UserCreateCommand;
import it.akademija.wizards.models.user.UserGetCommand;
import it.akademija.wizards.models.usergroup.UserGroupCreateCommand;
import it.akademija.wizards.models.usergroup.UserGroupGetCommand;
import it.akademija.wizards.services.DocumentTypeService;
import it.akademija.wizards.services.UserGroupService;
import it.akademija.wizards.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CommandLineAppRunner implements CommandLineRunner {

    private final Logger logger = LoggerFactory.getLogger(CommandLineAppRunner.class);
    @Autowired
    private UserService userService;

    @Autowired
    private DocumentTypeService documentTypeService;

    @Autowired
    private UserGroupService userGroupService;


    @Override
    public void run(String... args) throws Exception {
        //GROUPS
        if (!groupExists("administracija")) userGroupService.createUserGroup(new UserGroupCreateCommand("administracija"));
        if (!groupExists("darbuotojai")) userGroupService.createUserGroup(new UserGroupCreateCommand("darbuotojai"));
        if (!groupExists("statybininkai")) userGroupService.createUserGroup(new UserGroupCreateCommand("statybininkai"));
        if (!groupExists("programisiai")) userGroupService.createUserGroup(new UserGroupCreateCommand("programisiai"));
        if (!groupExists("programeriai")) userGroupService.createUserGroup(new UserGroupCreateCommand("programeriai"));
        //DOCTYPES
        if(!docTypeExists("atostogu prasymas")) documentTypeService.createDocumentType(new DocumentTypeCreateCommand("atostogu prasymas"));
        if(!docTypeExists("atleidimas is darbo")) documentTypeService.createDocumentType(new DocumentTypeCreateCommand("atleidimas is darbo"));
        if(!docTypeExists("paausktinimas pareigose")) documentTypeService.createDocumentType(new DocumentTypeCreateCommand("paausktinimas pareigose"));
        if(!docTypeExists("atlyginimo padidinimas")) documentTypeService.createDocumentType(new DocumentTypeCreateCommand("atlyginimo padidinimas"));
        //USERS
        if (!usernameExists("migle")) userService.createUser(new UserCreateCommand("migle", "captain", "Migle", "Babickaite", "captain@captain.lt", true));
        if (!usernameExists("julius")) userService.createUser(new UserCreateCommand("julius", "julius", "Julius", "Cerniauskas", "julius@captain.lt", false));
        if (!usernameExists("root")) userService.createUser(new UserCreateCommand("root", "root", "Rootas", "Rootauskas", "root@captain.lt", true));
        if (!usernameExists("jonas")) userService.createUser(new UserCreateCommand("jonas", "jonas", "Jonas", "Gaidukevicius", "jonas@captain.lt", false));
        if (!usernameExists("andrius")) userService.createUser(new UserCreateCommand("andrius", "andrius", "Andrius", "", "andrius@captain.lt", false));
        if (!usernameExists("vytautas")) userService.createUser(new UserCreateCommand("vytautas", "vytautas", "Vytautas", "", "vytautas@captain.lt", false));


        //create lists of groups' ids
        List<UserGroupGetCommand> userGroups = userGroupService.getUserGroups();
        List<String> allGroups = new ArrayList<>();
        List<String> administration = new ArrayList<>();
        List<String> employees = new ArrayList<>();
        for (UserGroupGetCommand userGroupGetCommand: userGroups) {
            allGroups.add(userGroupGetCommand.getId());
            if(userGroupGetCommand.getTitle().equals("administracija")) administration.add(userGroupGetCommand.getId());
            if(userGroupGetCommand.getTitle().equals("darbuotojai")) employees.add(userGroupGetCommand.getId());

        }

        //ADD GROUPS TO USERS
        //add all groups to username migle
        userService.addGroupsToUser(new UserAddGroupsCommand(allGroups), "migle");
        //add darbuotojas to username julius
        userService.addGroupsToUser(new UserAddGroupsCommand(employees), "julius");

        //get doctype id
        List<DocumentTypeGetCommand> documentTypes = documentTypeService.getDocumentTypes();
        String docTypeId = null;
        for (DocumentTypeGetCommand documentTypeGetCommand: documentTypes) {
            if (documentTypeGetCommand.getTitle().equals("atostogu prasymas")) {
                docTypeId = documentTypeGetCommand.getId();
                System.out.println("yes " + docTypeId);
            }
        }
        //add all groups to doctype submission
        documentTypeService.addGroupsToDocType(docTypeId, "submission", new UserAddGroupsCommand(allGroups));
        //add administracija to doctype review
        documentTypeService.addGroupsToDocType(docTypeId, "review", new UserAddGroupsCommand(administration));
    }

    private boolean docTypeExists(String title) {
        for (DocumentTypeGetCommand documentTypeGetCommand: documentTypeService.getDocumentTypes()) {
            if (documentTypeGetCommand.getTitle().equals(title)) return true;
        }
        return false;
    }

    private boolean usernameExists(String username) {
        for (UserGetCommand userGetCommand: userService.getUsers()) {
            if (userGetCommand.getUsername().equals(username)) return true;
        }
        return false;
    }

    private boolean groupExists(String title) {
        for (UserGroupGetCommand userGroupGetCommand: userGroupService.getUserGroups()) {
            if (userGroupGetCommand.getTitle().equals(title)) return true;
        }
        return false;
    }
}


