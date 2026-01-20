package com.aurora.AuroraApartment.model;

import com.aurora.AuroraApartment.dto.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Data
@Builder
@AllArgsConstructor
public class InternalUser {
    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false, name = "fullName")
    private String full_name;
    @Column(nullable = false)
    @Builder.Default
    private Role role=Role.ADMIN; 
    @Column(name = "is_technical_contact")
    @Builder.Default
    private Boolean isTechnicalContact = false;

}
