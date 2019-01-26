package it.akademija.wizards.services;

import it.akademija.wizards.entities.DocumentType;
import it.akademija.wizards.models.documenttype.DocumentTypeCreateCommand;
import it.akademija.wizards.models.documenttype.DocumentTypeGetCommand;
import it.akademija.wizards.repositories.DocumentTypeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentTypeService {

    @Autowired
    private DocumentTypeRepository documentTypeRepository;

    @Transactional(readOnly = true)
    public List<DocumentTypeGetCommand> getDocumentTypes() {
        return documentTypeRepository.findAll().stream().map(docType -> {
            DocumentTypeGetCommand documentTypeGetCommand = new DocumentTypeGetCommand();
            BeanUtils.copyProperties(docType, documentTypeGetCommand);
            return documentTypeGetCommand;
        }).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DocumentTypeGetCommand getDocumentTypeById(String id) {
        DocumentTypeGetCommand documentTypeGetCommand = new DocumentTypeGetCommand();
        BeanUtils.copyProperties(documentTypeRepository.findById(id).orElse(null), documentTypeGetCommand);
        return documentTypeGetCommand;
    }

    @Transactional
    public void createDocumentType(DocumentTypeCreateCommand documentTypeCreateCommand) {
        DocumentType documentType = new DocumentType();
        BeanUtils.copyProperties(documentTypeCreateCommand, documentType);
        documentTypeRepository.save(documentType);
    }

    @Transactional
    public void updateDocumentType(String id, DocumentTypeCreateCommand documentTypeCreateCommand) {
        DocumentType documentType = documentTypeRepository.findById(id).orElse(null);
        BeanUtils.copyProperties(documentTypeCreateCommand, documentType);
        documentTypeRepository.save(documentType);
    }

    @Transactional
    public void deleteDocumentType(String id) {
        documentTypeRepository.deleteById(id);
    }
}
