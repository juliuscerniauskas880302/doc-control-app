package it.akademija.wizards.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import it.akademija.wizards.entities.User;
import it.akademija.wizards.services.DocumentService;
import it.akademija.wizards.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

//    @ApiOperation(value = "get users")
//    @RequestMapping(method = RequestMethod.GET)
//    @ResponseStatus(HttpStatus.ACCEPTED)
//    public List<UserGetCommand> getUser(){
//         return null;
//    }

    @ApiOperation(value = "get user by username")
    @RequestMapping(value = "/{username}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public User getUserByUsername(@PathVariable String username){
        return null;
    }

//    @ApiOperation(value = "get user's documents")
//    @RequestMapping(value = "/{username}/docs", method = RequestMethod.GET)
//    @ResponseStatus(HttpStatus.ACCEPTED)
//    public List <DocumentGetCommand> getDocumentsByUsername(@PathVariable String username){
//        return null;
//    }

//    @ApiOperation(value = "create user")
//    @RequestMapping(method = RequestMethod.POST)
//    @ResponseStatus(HttpStatus.CREATED)
//    public void createUser(@RequestBody UserCreateCommand userCreateCommand){
//
//    }

    @ApiOperation(value = "check if user exists by username")
    @RequestMapping(value = "/auth/{username}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.FOUND)
    public boolean userExists(){
        return false;
    }

    @ApiOperation(value = "update user by username")
    @RequestMapping(value = "/{username}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateUserByUsername(){

    }

    @ApiOperation(value = "delete user by username")
    @RequestMapping(value = "/{username}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteUserByUsername(@PathVariable String username){

    }
}
