package it.akademija.wizards.repositories;

import it.akademija.wizards.entities.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserGroupRepository extends JpaRepository <UserGroup, String> {
    List<UserGroup> findAllByUserGroupId(Iterable<String> iterable);
}
