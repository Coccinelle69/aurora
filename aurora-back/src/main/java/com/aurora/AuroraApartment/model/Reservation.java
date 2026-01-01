package com.aurora.AuroraApartment.model;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

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

    @Column(nullable = false, unique = true, updatable = false)
    private UUID publicToken;

    @Column(name="admin_action_expires_at", nullable = false)
    private Instant adminActionExpiresAt;

    @Column(name="admin_action_used", nullable = false)
    private boolean adminActionUsed;

    @Column(name = "reservation_reference", nullable = false, unique = true, updatable = false)
    private String reservationReference;


    @Column(name = "main_contact_first_name", nullable = false)
    private String mainContactFirstName;
    @Column(name = "main_contact_last_name", nullable = false)
    private String mainContactLastName;
    @Column(name = "main_contact_email", nullable = false)
    private String email;
    @Column(name = "main_contact_phone", nullable = false)
    private String phone;
    private String message;
    @Builder.Default
    private String language="en";

    @Column(nullable = false)
    private Integer guests;
    @Column(nullable = false)
    private Integer adults;
    @Column(nullable = false)
    private Integer children;
    @Column(nullable = false)
    private Integer teens;

    @Column(name = "total_nights", nullable = false)
    private Integer totalNights;
    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice;

    @Column(name = "arrival_date", nullable = false)
    private LocalDate arrivalDate; 
    @Column(name = "departure_date", nullable = false)
    private LocalDate departureDate; 

    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(nullable = false)
    private ReservationStatus status = ReservationStatus.PENDING;
    @OneToMany(mappedBy = "reservation")
    private List<Payment> payments;

    @CreationTimestamp
    @Column(name = "created_at",nullable = false, updatable = false)
    private Instant createdAt;

    
    @Column(name="reminder_sent", nullable = false)
    private boolean reminderSent;

    @Column(name="balance_due_at")
    private LocalDate balanceDueAt;

    @PrePersist
    private void prePersist() {
        if (publicToken == null) {
            publicToken = UUID.randomUUID();
        }


        if (adminActionExpiresAt == null) {
        adminActionExpiresAt = Instant.now().plus(120, ChronoUnit.HOURS);
    }

     if (status == null) {
        status = ReservationStatus.PENDING;
    }

        adminActionUsed = false;
        reminderSent = false;
    }

   

}
