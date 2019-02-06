package it.akademija.wizards.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import it.akademija.wizards.models.document.DocumentGetCommand;
import it.akademija.wizards.models.documenttype.DocumentTypeGetCommand;
import it.akademija.wizards.models.user.*;
import it.akademija.wizards.models.usergroup.UserGroupGetCommand;
import it.akademija.wizards.services.DocumentService;
import it.akademija.wizards.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@Api(value = "users")
@RestController
@RequestMapping (value = "/api/users")
public class UserController {

    @Autowired
    private final UserService userService;

    @Autowired
    private final DocumentService documentService;
    public UserController(UserService userService, DocumentService documentService){
        this.userService = userService;
        this.documentService = documentService;
    }

    @ApiOperation(value = "get users")
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<UserGetCommand> getUser() {
         return userService.getUsers();
    }

    @ApiOperation(value = "get user by username")
    @RequestMapping(value = "/{username}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public UserGetCommand getUserByUsername(@PathVariable String username){
        return userService.getUser(username);
    }

    @ApiOperation(value = "get user's documents")
    @RequestMapping(value = "/{username}/docs/{state}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List <DocumentGetCommand> getDocumentsByUsername(@PathVariable String username,
                                                            @PathVariable(value = "state") String state){
        return userService.getUserDocuments(username, state);
    }

    @ApiOperation(value = "create user")
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@RequestBody UserCreateCommand userCreateCommand){
        userService.createUser(userCreateCommand);

    }

    @ApiOperation(value = "check if user exists by username")
    @RequestMapping(value = "/auth/{username}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public boolean userExists(@RequestBody UserPassCommand userPassCommand, @PathVariable(value = "username") String username){
        return userService.authUser(username, userPassCommand);
    }

    @ApiOperation(value = "update user by username")
    @RequestMapping(value = "/{username}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateUserByUsername(@RequestBody UserUpdateCommand userUpdateCommand, @PathVariable(value = "username") String username){
        userService.updateUser(username, userUpdateCommand);
    }

    @ApiOperation(value = "delete user by username")
    @RequestMapping(value = "/{username}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteUserByUsername(@PathVariable String username){
        userService.deleteUser(username);
    }

    @ApiOperation(value = "change user's password")
    @RequestMapping(value = "/{username}/changepassword", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public boolean updateUserPassword(@RequestBody UserPassCommand userPassCommand, @PathVariable(value = "username") String username) {
        return userService.updateUserPassword(username, userPassCommand);
    }

    @ApiOperation(value = "add group list to user")
    @RequestMapping(value = "/{username}/groups", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void addGroupsToUser(@RequestBody UserAddGroupsCommand userAddGroupsCommand, @PathVariable(value = "username") String username) {
        userService.addGroupsToUser(userAddGroupsCommand, username);
    }

    @ApiOperation(value = "remove group list from user")
    @RequestMapping(value = "/{username}/groups", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void removeGroupsFromUser(@RequestBody UserRemoveGroupsCommand userRemoveGroupsCommand, @PathVariable(value = "username") String username) {
        userService.removeGroupsFromUser(userRemoveGroupsCommand, username);
    }

    @ApiOperation(value = "get user groups")
    @RequestMapping(value = "/{username}/groups", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<UserGroupGetCommand> getUsersGroups(@PathVariable(value = "username") String username) {
        return userService.getUsersGroups(username);
    }

    @ApiOperation(value = "get users submission doc types")
    @RequestMapping(value = "{username}/submissionDocTypes", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Set<DocumentTypeGetCommand> getUserSubmissionDocTypes(@PathVariable String username) {
        return userService.getUserSubmissionDocTypes(username);
    }
}
