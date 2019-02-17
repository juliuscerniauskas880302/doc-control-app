package it.akademija.wizards.services;

import it.akademija.wizards.entities.DocumentType;
import it.akademija.wizards.entities.UserGroup;
import it.akademija.wizards.models.documenttype.DocumentTypeCreateCommand;
import it.akademija.wizards.models.documenttype.DocumentTypeGetCommand;
import it.akademija.wizards.models.user.UserAddGroupsCommand;
import it.akademija.wizards.models.user.UserRemoveGroupsCommand;
import it.akademija.wizards.models.usergroup.UserGroupGetCommand;
import it.akademija.wizards.repositories.DocumentTypeRepository;
import it.akademija.wizards.repositories.UserGroupRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentTypeService {

    @Autowired
    private DocumentTypeRepository documentTypeRepository;
    @Autowired
    private UserGroupRepository userGroupRepository;

    //GET
    @Transactional(readOnly = true)
    public List<DocumentTypeGetCommand> getDocumentTypes() {
        return documentTypeRepository.findAll(Sort.by(Sort.Order.asc("title").ignoreCase())).stream().map(docType -> {
            DocumentTypeGetCommand documentTypeGetCommand = new DocumentTypeGetCommand();
            BeanUtils.copyProperties(docType, documentTypeGetCommand);
            return documentTypeGetCommand;
        }).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DocumentTypeGetCommand getDocumentTypeById(String id) {
        DocumentTypeGetCommand documentTypeGetCommand = new DocumentTypeGetCommand();
        BeanUtils.copyProperties(this.getDocTypeFromDB(id), documentTypeGetCommand);
        return documentTypeGetCommand;
    }

    //CREATE
    @Transactional
    public void createDocumentType(DocumentTypeCreateCommand documentTypeCreateCommand) {
        DocumentType documentType = new DocumentType();
        BeanUtils.copyProperties(documentTypeCreateCommand, documentType);
        documentTypeRepository.save(documentType);
    }

    //UPDATE
    @Transactional
    public void updateDocumentType(String id, DocumentTypeCreateCommand documentTypeCreateCommand) {
        DocumentType documentType = this.getDocTypeFromDB(id);
        BeanUtils.copyProperties(documentTypeCreateCommand, documentType);
        documentTypeRepository.save(documentType);
    }

    //DELETE
    @Transactional
    public void deleteDocumentType(String id) {
        DocumentType documentType = this.getDocTypeFromDB(id);
        for (UserGroup userGroup: userGroupRepository.findAll()) {
            documentType.removeSubmissionUserGroup(userGroup);
            documentType.removeReviewUserGroup(userGroup);
        }
        documentTypeRepository.delete(documentType);
    }

    //GET GROUPS
    @Transactional
    public List<UserGroupGetCommand> getDocTypeGroups(String id, String groupType) {
        DocumentType documentType = this.getDocTypeFromDB(id);
        if (groupType.equals("submission")) {
            System.out.println("service: submission");
            return documentType.getSubmissionUserGroups()
                    .stream()
                    .map(userGroup -> {
                        UserGroupGetCommand userGroupGetCommand = new UserGroupGetCommand();
                        BeanUtils.copyProperties(userGroup, userGroupGetCommand);
                        return userGroupGetCommand;
                    }).collect(Collectors.toList());
        } else if (groupType.equals("review")) {
            return documentType.getReviewUserGroups()
                    .stream()
                    .map(userGroup -> {
                        UserGroupGetCommand userGroupGetCommand = new UserGroupGetCommand();
                        BeanUtils.copyProperties(userGroup, userGroupGetCommand);
                        return userGroupGetCommand;
                    }).collect(Collectors.toList());
        } return null;
    }

    //ADD GROUPS
    @Transactional
    public void addGroupsToDocType(String id, String groupType, UserAddGroupsCommand userAddGroupsCommand) {
        DocumentType documentType = this.getDocTypeFromDB(id);
        List<UserGroup> userGroups = userGroupRepository.findAllById(userAddGroupsCommand.getId());
        for (UserGroup userGroup : userGroups) {
            if(groupType.equals("submission")) documentType.addSubmissionUserGroup(userGroup);
            else if (groupType.equals("review")) documentType.addReviewUserGroup(userGroup);
        }
        documentTypeRepository.save(documentType);
    }

    //REMOVE GROUPS
    @Transactional
    public void removeGroupsFromDocType(String id, String groupType, UserRemoveGroupsCommand userRemoveGroupsCommand) {
        DocumentType documentType = this.getDocTypeFromDB(id);
        List<UserGroup> userGroups = userGroupRepository.findAllById(userRemoveGroupsCommand.getId());
        for (UserGroup userGroup : userGroups) {
            if(groupType.equals("submission")) documentType.removeSubmissionUserGroup(userGroup);
            else if (groupType.equals("review")) documentType.removeReviewUserGroup(userGroup);
        }
        documentTypeRepository.save(documentType);
    }


    //PRIVATE METHODS (GETTING ENTITIES FROM DB)
    @Transactional
    private DocumentType getDocTypeFromDB(String id) {
        return documentTypeRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Document type not found"));

    }
}
