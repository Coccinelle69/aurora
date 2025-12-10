package com.aurora.AuroraApartment.model;

import java.time.LocalDate;

import com.aurora.AuroraApartment.dto.ReservationStatus;

import jakarta.persistence.*;
import lombok.Data;



@Entity
@Data
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String reservationFirstName;
    private String reservationLastName;
    private String email;
    private String phone;

    private Integer adults;
    private Integer children;
    private Integer teens;
    private Integer totalNights;
    private Integer totalPrice;

    private LocalDate arrivalDate; 

    private LocalDate departureDate; 

     @Enumerated(EnumType.STRING)
    private ReservationStatus status = ReservationStatus.PENDING;
}
