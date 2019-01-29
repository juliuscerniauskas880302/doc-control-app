package it.akademija.wizards.services;

import it.akademija.wizards.entities.UserGroup;
import it.akademija.wizards.models.usergroup.UserGroupCreateCommand;
import it.akademija.wizards.models.usergroup.UserGroupGetCommand;
import it.akademija.wizards.repositories.UserGroupRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserGroupService {

    private UserGroupRepository userGroupRepository;

    @Autowired
    public UserGroupService(UserGroupRepository userGroupRepository) {
        this.userGroupRepository = userGroupRepository;
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
        userGroupRepository.deleteById(id);
    }
}
