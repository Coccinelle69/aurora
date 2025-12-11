package com.aurora.AuroraApartment.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;



@Entity
@Data
@Builder
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    private String email;
    private String phone;
    private String message;
    @Builder.Default
    private String language="en";
}
