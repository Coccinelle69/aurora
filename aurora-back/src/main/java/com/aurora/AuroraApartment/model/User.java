package com.aurora.AuroraApartment.model;

import com.aurora.AuroraApartment.dto.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String email;
    @Column
    private String password;
    @Column(name = "full_name")
    private String fullName;
    @Column(nullable = false)
    @Builder.Default
    private Role role=Role.ADMIN; 
    @Column(name = "is_technical_contact", nullable = false)
    @Builder.Default
    private Boolean isTechnicalContact = false;

}
