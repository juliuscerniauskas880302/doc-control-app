package it.akademija.wizards.repositories;

import it.akademija.wizards.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
