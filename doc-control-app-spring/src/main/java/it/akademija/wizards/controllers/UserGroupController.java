package it.akademija.wizards.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import it.akademija.wizards.models.user.UserGetCommand;
import it.akademija.wizards.models.usergroup.*;
import it.akademija.wizards.services.UserGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "user groups")
@RestController
@RequestMapping(value = "/api/groups")
public class UserGroupController {

    private final UserGroupService userGroupService;

    @Autowired
    public UserGroupController(UserGroupService userGroupService) {
        this.userGroupService = userGroupService;
    }

    @ApiOperation(value = "get groups")
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<UserGroupGetCommand> getUserGroups() {
        return userGroupService.getUserGroups();
    }

    @ApiOperation(value = "get group")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public UserGroupGetCommand getUserGroup(@PathVariable(value = "id") String id) {
        return userGroupService.getUserGroup(id);
    }

    @ApiOperation(value = "create user group")
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createUserGroup(@RequestBody UserGroupCreateCommand userGroupCreateCommand) {
        userGroupService.createUserGroup(userGroupCreateCommand);
    }

    @ApiOperation(value = "add document types to group")
    @RequestMapping(value = "/{id}/doctypes", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void addDocTypesToGroup(@RequestBody UserGroupAddDocTypesCommand userGroupAddDocTypesCommand, @PathVariable(value = "id") String id) {

    }

    @ApiOperation(value = "update user group")
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateUserGroup(@RequestBody UserGroupCreateCommand userGroupCreateCommand, @PathVariable(value = "id") String id) {
        userGroupService.updateUserGroup(userGroupCreateCommand, id);
    }

    @ApiOperation(value = "delete user group")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteUserGroup(@PathVariable(value = "id") String id) {
        userGroupService.deleteUserGroup(id);
    }

    @ApiOperation(value = "add user list to group")
    @RequestMapping(value = "/{id}/users", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void addUsersToGroup(@RequestBody GroupAddUsersCommand groupAddUsersCommand, @PathVariable(value = "id") String id) {
        userGroupService.addUsersToGroup(groupAddUsersCommand, id);
    }

    @ApiOperation(value = "remove user list from group")
    @RequestMapping(value = "/{id}/users", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void removeUsersFromGroup(@RequestBody GroupRemoveUsersCommand groupRemoveUsersCommand, @PathVariable(value = "id") String id) {
        userGroupService.removeUsersFromGroup(groupRemoveUsersCommand, id);
    }

    @ApiOperation(value = "get users in group")
    @RequestMapping(value = "/{id}/users", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<UserGetCommand> getGroupsUsers(@PathVariable(value = "id") String id) {
        return userGroupService.getGroupsUsers(id);
    }

}
