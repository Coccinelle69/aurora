package com.aurora.AuroraApartment.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aurora.AuroraApartment.model.Contact;

@Repository
public interface ContactRepo extends JpaRepository<Contact, Integer> {
    
}
