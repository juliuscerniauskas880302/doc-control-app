package it.akademija.wizards.services;

import it.akademija.wizards.entities.UserGroup;
import it.akademija.wizards.repositories.UserGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    @Transactional
    public List<UserGroup> findUserGroupsByUserGroupId(Iterable<String> userGroupIdList) {
       return  userGroupRepository.findAllByUserGroupId(userGroupIdList);
    }
}
