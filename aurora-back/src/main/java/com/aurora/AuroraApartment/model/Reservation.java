package com.aurora.AuroraApartment.model;

import java.time.LocalDate;

import com.aurora.AuroraApartment.dto.ReservationStatus;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "main_contact_first_name")
    private String mainContactFirstName;
    @Column(name = "main_contact_last_name")
    private String mainContactLastName;
    @Column(name = "main_contact_email")
    private String email;
    @Column(name = "main_contact_phone")
    private String phone;
    @Builder.Default
    private String language="en";

    private Integer guests;
    private Integer adults;
    private Integer children;
    private Integer teens;
    @Column(name = "total_nights")
    private Integer totalNights;
    @Column(name = "price")
    private Integer totalPrice;

    @Column(name = "arrival_date")
    private LocalDate arrivalDate; 
    @Column(name = "departure_date")
    private LocalDate departureDate; 

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private ReservationStatus status = ReservationStatus.PENDING;
}
