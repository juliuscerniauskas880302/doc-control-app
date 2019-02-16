package it.akademija.wizards.services;

import it.akademija.wizards.entities.Document;
import it.akademija.wizards.entities.Role;
import it.akademija.wizards.entities.DocumentType;
import it.akademija.wizards.entities.User;
import it.akademija.wizards.entities.UserGroup;
import it.akademija.wizards.enums.DocumentState;
import it.akademija.wizards.enums.RoleName;
import it.akademija.wizards.exception.AppException;
import it.akademija.wizards.models.document.DocumentGetCommand;
import it.akademija.wizards.models.documenttype.DocumentTypeGetCommand;
import it.akademija.wizards.models.user.*;
import it.akademija.wizards.models.usergroup.UserGroupGetCommand;
import it.akademija.wizards.security.payload.ApiResponse;
import it.akademija.wizards.repositories.RoleRepository;
import it.akademija.wizards.repositories.UserGroupRepository;
import it.akademija.wizards.repositories.UserRepository;
import it.akademija.wizards.services.auxiliary.Mapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {

    private UserRepository userRepository;
    private UserGroupRepository userGroupRepository;
    private Mapper mapper;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    public UserService(UserRepository userRepository, UserGroupRepository userGroupRepository, Mapper mapper) {
        this.userRepository = userRepository;
        this.userGroupRepository = userGroupRepository;
        this.mapper = mapper;
    }

    public UserRepository getUserRepository() {
        return userRepository;
    }

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Transactional(readOnly = true)
    public UserPageGetCommand getUsers(Integer pageNumber, Integer pageLimit) {
        Pageable pageable;
        Sort sort = Sort.by("firstname").ascending().and(Sort.by("lastname")).ascending();
        if (pageNumber != null && pageLimit != null) {
            pageable = PageRequest.of(pageNumber, pageLimit, sort);
        } else {
            pageable = PageRequest.of(0, Integer.MAX_VALUE, sort);
        }
        Page<User> pageUser = userRepository.findAll(pageable);
        List<UserGetCommand> userList = pageUser.stream().map(user -> {
            UserGetCommand userGetCommand = new UserGetCommand();
            BeanUtils.copyProperties(user, userGetCommand);
            return userGetCommand;
        }).collect(Collectors.toList());
        UserPageGetCommand userPageGetCommand = new UserPageGetCommand(userList, pageUser.getTotalElements(), pageUser.getTotalPages());
        return userPageGetCommand;
    }

    @Transactional(readOnly = true)
    public UserGetCommand getUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            UserGetCommand userGetCommand = new UserGetCommand();
            BeanUtils.copyProperties(user, userGetCommand);
            return userGetCommand;
        } else {
            throw new NullPointerException("User does not exist");
        }
    }

    @Transactional
    public ResponseEntity<?> createUser(UserCreateCommand userCreateCommand) {
        if (userRepository.existsByUsername(userCreateCommand.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(userCreateCommand.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        BeanUtils.copyProperties(userCreateCommand, user);
        user.setPassword(passwordEncoder.encode(userCreateCommand.getPassword()));
        Role userRole = null;
        if (userCreateCommand.isAdmin()) {
            userRole = roleRepository.findByName(RoleName.ROLE_ADMIN).orElseThrow(
                    () -> new AppException("Admin Role not set")
            );
        } else {
            userRole = roleRepository.findByName(RoleName.ROLE_USER).orElseThrow(
                    () -> new AppException("User Role not set")
            );
        }
        user.getRoles().add(userRole);
        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }

    @Transactional
    public void createUserForStartUp(UserCreateCommand userCreateCommand) {
        if (userRepository.existsByUsername(userCreateCommand.getUsername())) {
            throw new IllegalArgumentException("User already exists");
        }

        if (userRepository.existsByEmail(userCreateCommand.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        User user = new User();
        BeanUtils.copyProperties(userCreateCommand, user);
        user.setPassword(passwordEncoder.encode(userCreateCommand.getPassword()));
        Role userRole = null;
        if (userCreateCommand.isAdmin()) {
            userRole = roleRepository.findByName(RoleName.ROLE_ADMIN).orElseThrow(
                    () -> new AppException("Admin Role not set")
            );
        } else {
            userRole = roleRepository.findByName(RoleName.ROLE_USER).orElseThrow(
                    () -> new AppException("User Role not set")
            );
        }
        user.getRoles().add(userRole);
        userRepository.save(user);
    }

    @Transactional
    public void updateUser(String username, UserUpdateCommand userUpdateCommand) {
        User user = userRepository.findByUsername(username);
        BeanUtils.copyProperties(userUpdateCommand, user);
        Role userRole = null;
        if (userUpdateCommand.isAdmin()) {
            userRole = roleRepository.findByName(RoleName.ROLE_ADMIN).orElseThrow(
                    () -> new AppException("Admin Role not set")
            );
        } else {
            userRole = roleRepository.findByName(RoleName.ROLE_USER).orElseThrow(
                    () -> new AppException("User Role not set")
            );
        }
        user.setRoles(new HashSet<>(Arrays.asList(userRole)));
        userRepository.save(user);
    }

    @Transactional
    public void deleteUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            for (UserGroup userGroup : user.getUserGroups()) {
                userGroup.removeUser(user);
            }
            for (Document document : user.getDocuments()) {
                document.setAuthor(null);
            }
            userRepository.delete(user);
        } else {
            throw new NullPointerException("User does not exist");
        }
    }

    @Transactional
    public boolean updateUserPassword(String username, UserPassCommand userPassCommand) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            user.setPassword(passwordEncoder.encode(userPassCommand.getPassword()));
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Transactional(readOnly = true)
    public List<DocumentGetCommand> getUserDocuments(String username, String state) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            List<DocumentGetCommand> documents = new ArrayList<>();
            if (state.toLowerCase().equals("created")) {
                documents = user.getDocuments().stream()
                        .filter(document -> document.getDocumentState().equals(DocumentState.CREATED))
                        .map(mapper::entityToGetCommand).collect(Collectors.toList());
            } else if (state.toLowerCase().equals("submitted")) {
                documents = user.getDocuments().stream()
                        .filter(document -> !document.getDocumentState().equals(DocumentState.CREATED))
                        .map(mapper::entityToGetCommand).collect(Collectors.toList());
            }
            return documents;
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
    public void removeGroupsFromUser(UserRemoveGroupsCommand userRemoveGroupsCommand, String username) {
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

    @Transactional
    public Set<DocumentTypeGetCommand> getUserSubmissionDocTypes(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            Set<UserGroup> userGroups = user.getUserGroups();
            Set<DocumentType> submissionDocTypes = new HashSet<>();
            userGroups.stream().forEach(userGroup -> {
                submissionDocTypes.addAll(userGroup.getSubmissionDocumentType());
            });
            return submissionDocTypes.stream().map(documentType -> {
                DocumentTypeGetCommand documentTypeGetCommand = new DocumentTypeGetCommand();
                BeanUtils.copyProperties(documentType, documentTypeGetCommand);
                return documentTypeGetCommand;
            }).collect(Collectors.toSet());
        }
        throw new NullPointerException("User does not exist");
    }

    @Transactional
    public boolean isActionAllowed(String username, String action) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            for (UserGroup userGroup : user.getUserGroups()) {
                if (action.equals("submit")) {
                    if (!userGroup.getSubmissionDocumentType().isEmpty()) return true;
                } else if (action.equals("review")) {
                    if (!userGroup.getReviewDocumentType().isEmpty()) return true;
                }
            }
            return false;
        } else {
            throw new NullPointerException("User does not exist");
        }
    }

    @Transactional
    public List<UserGetCommand> getPageableUsers(int page, int recordsPerPage) {
        Pageable userPage = PageRequest.of(page, recordsPerPage, Sort.by("firstname").descending().and(Sort.by("lastname")));
        return userRepository.findAll(userPage).stream().map(user -> {
            UserGetCommand userGetCommand = new UserGetCommand();
            BeanUtils.copyProperties(user, userGetCommand);
            return userGetCommand;
        }).collect(Collectors.toList());
    }

    public Long getUsersCount() {
        return userRepository.count();
    }
}
