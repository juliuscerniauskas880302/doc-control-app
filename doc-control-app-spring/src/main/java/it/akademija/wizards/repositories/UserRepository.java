package it.akademija.wizards.repositories;

import it.akademija.wizards.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    User findByUsername(String username);
    void deleteByUsername(String username);
}
