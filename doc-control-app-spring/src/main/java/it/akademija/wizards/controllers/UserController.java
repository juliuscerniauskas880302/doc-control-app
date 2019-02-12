package it.akademija.wizards.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import it.akademija.wizards.entities.User;
import it.akademija.wizards.models.document.DocumentGetCommand;
import it.akademija.wizards.models.documenttype.DocumentTypeGetCommand;
import it.akademija.wizards.models.user.*;
import it.akademija.wizards.models.usergroup.UserGroupGetCommand;
import it.akademija.wizards.security.models.CurrentUser;
import it.akademija.wizards.security.models.UserPrincipal;
import it.akademija.wizards.services.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;

@Api(value = "users")
@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping (value = "/api/users")
public class UserController {


    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @RequestMapping(value = "/me", method = RequestMethod.GET)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public UserGetCommand getCurrentUserUsername(@CurrentUser UserPrincipal userPrincipal) {
        UserGetCommand userGetCommand = new UserGetCommand();
        BeanUtils.copyProperties(userPrincipal, userGetCommand);
        return userGetCommand;
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

    @PreAuthorize("hasRole('USER')")
    @ApiOperation(value = "get user's documents")
    @RequestMapping(value = "/docs/{state}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List <DocumentGetCommand> getDocumentsByUsername(@CurrentUser UserPrincipal userPrincipal,
                                                            @PathVariable(value = "state") String state){
        return userService.getUserDocuments(userPrincipal.getUsername(), state);
    }

    @ApiOperation(value = "create new user")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserCreateCommand userCreateCommand) {
        return userService.createUser(userCreateCommand);
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

    @PreAuthorize("hasRole('USER')")
    @ApiOperation(value = "get users submission doc types")
    @RequestMapping(value = "/submissionDocTypes", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Set<DocumentTypeGetCommand> getUserSubmissionDocTypes(@CurrentUser UserPrincipal userPrincipal) {
        return userService.getUserSubmissionDocTypes(userPrincipal.getUsername());
    }

    @ApiOperation(value = "checks if user is allowed to submit/review documents")
    @RequestMapping(value = "/{action}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public boolean isActionAllowed (@CurrentUser UserPrincipal userPrincipal, @PathVariable String action) {
        return userService.isActionAllowed(userPrincipal.getUsername(), action);
    }


}
