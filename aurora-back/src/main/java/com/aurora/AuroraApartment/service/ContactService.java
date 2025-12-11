package com.aurora.AuroraApartment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aurora.AuroraApartment.dto.ContactRequest;
import com.aurora.AuroraApartment.model.Contact;
import com.aurora.AuroraApartment.repo.ContactRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContactService {
    
    @Autowired
    ContactRepo contactRepo;

    public Contact conserveContact(ContactRequest contact){
      Contact newContact = Contact.builder()
        .firstName(contact.getFirstName())
        .lastName(contact.getLastName())
        .email(contact.getEmail())
        .phone(contact.getPhone())
        .message(contact.getMessage())
        .language(contact.getLanguage()).build();

        return contactRepo.save(newContact);
    }
}
