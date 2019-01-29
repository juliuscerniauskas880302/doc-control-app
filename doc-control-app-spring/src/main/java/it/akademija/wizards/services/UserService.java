package it.akademija.wizards.services;

import it.akademija.wizards.entities.User;
import it.akademija.wizards.entities.UserGroup;
import it.akademija.wizards.models.document.DocumentGetCommand;
import it.akademija.wizards.models.user.*;
import it.akademija.wizards.models.usergroup.UserGroupGetCommand;
import it.akademija.wizards.repositories.UserGroupRepository;
import it.akademija.wizards.repositories.UserRepository;
import it.akademija.wizards.security.PBKDF2Hash;
import it.akademija.wizards.security.PassAndSalt;
import it.akademija.wizards.security.PasswordChecker;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private UserRepository userRepository;
    private UserGroupRepository userGroupRepository;

    @Autowired
    public UserService(UserRepository userRepository, UserGroupRepository userGroupRepository) {
        this.userRepository = userRepository;
        this.userGroupRepository = userGroupRepository;
    }

    public UserRepository getUserRepository() {
        return userRepository;
    }

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Transactional(readOnly = true)
    public List<UserGetCommand> getUsers() {
        return userRepository.findAll().stream().map(user -> {
            UserGetCommand userGetCommand = new UserGetCommand();
            BeanUtils.copyProperties(user, userGetCommand);
            return userGetCommand;
        }).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserGetCommand getUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            UserGetCommand userGetCommand = new UserGetCommand();
            BeanUtils.copyProperties(user, userGetCommand);
            return userGetCommand;
        } else {
            throw new NullPointerException();
        }
    }

    @Transactional
    public void createUser(UserCreateCommand userCreateCommand) {
        User user = new User();
        BeanUtils.copyProperties(userCreateCommand, user);
        PBKDF2Hash pbkdf2Hash = new PBKDF2Hash();
        byte[] encodedPass = null;
        byte[] passwordSalt = null;
        PassAndSalt passAndSalt = pbkdf2Hash.hashPassword(userCreateCommand.getPassword());
        if (passAndSalt != null && (encodedPass = passAndSalt.getPassword()) != null
                && (passwordSalt = passAndSalt.getSalt()) != null) {
            user.setPassword(encodedPass);
            user.setPassWordSalt(passwordSalt);
            userRepository.save(user);
        } else {
            throw new NullPointerException("Error encoding password");
        }
    }

    @Transactional
    public void updateUser(String username, UserUpdateCommand userUpdateCommand) {
        User user = userRepository.findByUsername(username);
        BeanUtils.copyProperties(userUpdateCommand, user);
        userRepository.save(user);
    }

    @Transactional
    public void deleteUser(String username) {
        userRepository.deleteByUsername(username);
    }

    @Transactional
    public boolean authUser(String username, UserPassCommand userPassCommand) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            PasswordChecker passwordChecker = new PasswordChecker();
            return passwordChecker.checkPasswordMatching(userPassCommand.getPassword(), user.getPassword(), user.getPasswordSalt());
        }
        return false;
    }

    @Transactional
    public boolean updateUserPassword(String username, UserPassCommand userPassCommand) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            PBKDF2Hash pbkdf2Hash = new PBKDF2Hash();
            byte[] encodedPass = null;
            byte[] passwordSalt = null;
            PassAndSalt passAndSalt = pbkdf2Hash.hashPassword(userPassCommand.getPassword());
            if (passAndSalt != null && (encodedPass = passAndSalt.getPassword()) != null
                    && (passwordSalt = passAndSalt.getSalt()) != null) {
                user.setPassword(encodedPass);
                user.setPassWordSalt(passwordSalt);
                return true;
            }
        }
        return false;
    }

    @Transactional(readOnly = true)
    public List<DocumentGetCommand> getUserDocuments(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            return user.getDocuments().stream().map(document -> {
                DocumentGetCommand documentGetCommand = new DocumentGetCommand();
                BeanUtils.copyProperties(document, documentGetCommand);
                return documentGetCommand;
            }).collect(Collectors.toList());
        } else {
            throw new NullPointerException("User does not exist");
        }
    }

    @Transactional
    public void addGroupsToUser(UserAddGroupsCommand userAddGroupsCommand, String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            List<UserGroup> userGroupList = userGroupRepository.findAllById(userAddGroupsCommand.getId());
            for (UserGroup userGroup : userGroupList) {
                user.addGroup(userGroup);
            }
            userRepository.save(user);
        }
    }
    @Transactional
    public void removeGroupsFromUser(UserRemoveGroupsCommand userRemoveGroupsCommand, String username){
        User user = userRepository.findByUsername(username);
        if (user != null) {
            List<UserGroup> userGroupList = userGroupRepository.findAllById(userRemoveGroupsCommand.getId());
            for (UserGroup userGroup : userGroupList) {
                user.removeGroup(userGroup);
            }
            userRepository.save(user);
        }
    }

    @Transactional(readOnly = true)
    public List<UserGroupGetCommand> getUsersGroups(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            return user.getUserGroups().stream().map(userGroup -> {
                UserGroupGetCommand userGroupGetCommand = new UserGroupGetCommand();
                BeanUtils.copyProperties(userGroup, userGroupGetCommand);
                return userGroupGetCommand;
            }).collect(Collectors.toList());
        } else {
            throw new NullPointerException("User does not exist");
        }
    }
}
