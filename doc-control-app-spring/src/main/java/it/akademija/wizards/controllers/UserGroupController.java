package it.akademija.wizards.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import it.akademija.wizards.models.usergroup.UserGroupAddDocTypesCommand;
import it.akademija.wizards.models.usergroup.UserGroupCreateCommand;
import it.akademija.wizards.models.usergroup.UserGroupGetCommand;
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
    @RequestMapping(value = "/{groupId}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public UserGroupGetCommand getUserGroup(@PathVariable(value = "groupId") String groupId) {
        return userGroupService.getUserGroup(groupId);
    }

    @ApiOperation(value = "create user group")
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createUserGroup(@RequestBody UserGroupCreateCommand userGroupCreateCommand) {
        userGroupService.createUserGroup(userGroupCreateCommand);
    }

    @ApiOperation(value = "add document types to group")
    @RequestMapping(value = "/{groupId}/doctypes", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void addDocTypesToGroup(@RequestBody UserGroupAddDocTypesCommand userGroupAddDocTypesCommand, @PathVariable(value = "groupId") String groupId) {

    }

    @ApiOperation(value = "update user group")
    @RequestMapping(value = "/{groupId}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateUserGroup(@RequestBody UserGroupCreateCommand userGroupCreateCommand, @PathVariable(value = "groupId") String groupId) {
        userGroupService.updateUserGroup(userGroupCreateCommand, groupId);
    }

    @ApiOperation(value = "delete user group")
    @RequestMapping(value = "/{groupId}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteUserGroup(@PathVariable(value = "groupId") String groupId) {
        userGroupService.deleteUserGroup(groupId);
    }

}
