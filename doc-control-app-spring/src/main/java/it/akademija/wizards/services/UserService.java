package it.akademija.wizards.services;

import it.akademija.wizards.entities.User;
import it.akademija.wizards.models.user.UserAuthCommand;
import it.akademija.wizards.models.user.UserCreateCommand;
import it.akademija.wizards.models.user.UserGetCommand;
import it.akademija.wizards.models.user.UserUpdateCommand;
import it.akademija.wizards.repositories.UserRepository;
import it.akademija.wizards.security.PBKDF2;
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

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserRepository getUserRepository() {
        return userRepository;
    }

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<UserGetCommand> getUsers() {
        return userRepository.findAll().stream().map(user ->
            new UserGetCommand(user.getUsername(), user.getFirstname(), user.getLastname(), user.getEmail())
        ).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserGetCommand getUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            return new UserGetCommand(user.getUsername(), user.getFirstname(), user.getLastname(), user.getEmail());
        }
        return null;
    }

    @Transactional
    public void createUser(UserCreateCommand userCreateCommand) {
        User user = new User();
        BeanUtils.copyProperties(userCreateCommand, user);
        PBKDF2 pbkdf2 = new PBKDF2();
        byte[] encodedPass = null;
        byte[] salt = null;
        PassAndSalt passAndSalt = pbkdf2.hashPassword(userCreateCommand.getPassword());
        if (passAndSalt != null && (encodedPass = passAndSalt.getPassword()) != null
                && (salt = passAndSalt.getSalt()) != null) {
            user.setPassword(encodedPass);
            user.setSalt(salt);
            userRepository.save(user);
        } else {
            throw new NullPointerException();
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
    public boolean authUser(String username, UserAuthCommand userAuthCommand) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            PasswordChecker passwordChecker = new PasswordChecker();
            return passwordChecker.checkPasswordMatching(userAuthCommand.getPassword(), user.getPassword(), user.getSalt());
        }
        return false;
    }
}
