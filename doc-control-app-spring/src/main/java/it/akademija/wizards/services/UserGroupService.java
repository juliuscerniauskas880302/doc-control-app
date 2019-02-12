package it.akademija.wizards.services;

import it.akademija.wizards.entities.DocumentType;
import it.akademija.wizards.entities.User;
import it.akademija.wizards.entities.UserGroup;
import it.akademija.wizards.models.user.UserGetCommand;
import it.akademija.wizards.models.usergroup.GroupAddUsersCommand;
import it.akademija.wizards.models.usergroup.GroupRemoveUsersCommand;
import it.akademija.wizards.models.usergroup.UserGroupCreateCommand;
import it.akademija.wizards.models.usergroup.UserGroupGetCommand;
import it.akademija.wizards.repositories.UserGroupRepository;
import it.akademija.wizards.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserGroupService {

    private UserGroupRepository userGroupRepository;
    private UserRepository userRepository;

    @Autowired
    public UserGroupService(UserGroupRepository userGroupRepository, UserRepository userRepository) {
        this.userGroupRepository = userGroupRepository;
        this.userRepository = userRepository;
    }

    public UserGroupRepository getUserGroupRepository() {
        return userGroupRepository;
    }

    public void setUserGroupRepository(UserGroupRepository userGroupRepository) {
        this.userGroupRepository = userGroupRepository;
    }

    @Transactional(readOnly = true)
    public List<UserGroupGetCommand> getUserGroups() {
        return userGroupRepository.findAll().stream().map(userGroup -> {
            UserGroupGetCommand userGroupGetCommand = new UserGroupGetCommand();
            BeanUtils.copyProperties(userGroup, userGroupGetCommand);
            return userGroupGetCommand;
        }).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserGroupGetCommand getUserGroup(String id) {
        UserGroup userGroup = userGroupRepository.findById(id).orElse(null);
        UserGroupGetCommand userGroupGetCommand = new UserGroupGetCommand();
        BeanUtils.copyProperties(userGroup, userGroupGetCommand);
        return userGroupGetCommand;
    }

    @Transactional
    public void createUserGroup(UserGroupCreateCommand userGroupCreateCommand) {
        UserGroup userGroup = new UserGroup();
        BeanUtils.copyProperties(userGroupCreateCommand, userGroup);
        userGroupRepository.save(userGroup);
    }

    @Transactional
    public void updateUserGroup(UserGroupCreateCommand userGroupCreateCommand, String id) {
        UserGroup userGroup = userGroupRepository.findById(id).orElse(null);
        BeanUtils.copyProperties(userGroupCreateCommand, userGroup);
        userGroupRepository.save(userGroup);
    }

    @Transactional
    public void deleteUserGroup(String id) {
        UserGroup userGroup = userGroupRepository.findById(id).orElse(null);
        if (userGroup != null) {
            for (DocumentType submissionDocumentType: userGroup.getSubmissionDocumentType()) {
                submissionDocumentType.removeSubmissionUserGroup(userGroup);
            }
            for (DocumentType reviewDocumentType: userGroup.getReviewDocumentType()) {
                reviewDocumentType.removeReviewUserGroup(userGroup);
            }
            userGroupRepository.deleteById(id);
        }
    }

    @Transactional
    public List<UserGetCommand> addUsersToGroup(GroupAddUsersCommand groupAddUsersCommand, String id) {
        UserGroup userGroup = userGroupRepository.findById(id).orElse(null);
        if (userGroup != null) {
            List<User> userList = userRepository.findAllByUsernameIn(groupAddUsersCommand.getUsers());
            userGroup.setUsers(new HashSet<>(userList));
            userGroupRepository.save(userGroup);
            return getGroupsUsers(id);
        } else {
            throw new NullPointerException("User group does not exist");
        }
    }

    @Transactional(readOnly = true)
    public List<UserGetCommand> getGroupsUsers(String id) {
        UserGroup userGroup = userGroupRepository.findById(id).orElse(null);
        if (userGroup != null) {
            return userGroup.getUsers().stream().map(user -> {
                UserGetCommand userGetCommand = new UserGetCommand();
                BeanUtils.copyProperties(user, userGetCommand);
                return userGetCommand;
            }).collect(Collectors.toList());
        } else {
            throw new NullPointerException("User group does not exist");
        }
    }
}
