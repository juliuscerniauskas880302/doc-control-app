package it.akademija.wizards.services;

import it.akademija.wizards.entities.User;
import it.akademija.wizards.models.user.UserCreateCommand;
import it.akademija.wizards.models.user.UserGetCommand;
import it.akademija.wizards.models.user.UserUpdateCommand;
import it.akademija.wizards.repositories.UserRepository;
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
        userRepository.save(user);
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
}
