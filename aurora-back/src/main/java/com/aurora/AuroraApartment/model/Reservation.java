package com.aurora.AuroraApartment.model;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

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
    @JdbcTypeCode(SqlTypes.UUID)
    private UUID publicToken;

    @Column(name="admin_action_expires_at", nullable = false)
    private Instant adminActionExpiresAt;

    @Builder.Default
    @Column(name="admin_action_used", nullable = false)
    private boolean adminActionUsed=false;

    @Column(name = "reservation_reference", nullable = false, unique = true, updatable = false)
    private String reservationReference;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
    private String message;

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
    @Column(name = "total_price", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalPrice;

    @Column(name = "arrival_date", nullable = false)
    private LocalDate arrivalDate; 
    @Column(name = "departure_date", nullable = false)
    private LocalDate departureDate; 

    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(nullable = false)
    private ReservationStatus status = ReservationStatus.PENDING;
    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Payment> payments;

    @CreationTimestamp
    @Column(name = "created_at",nullable = false, updatable = false)
    private Instant createdAt;

    @Builder.Default
    @Column(name="reminder_sent", nullable = false)
    private boolean reminderSent=false;

    @Builder.Default
    @Column(name="cancellation_email_sent", nullable = false)
    private boolean cancellationEmailSent=false;

    @Column(name="reminder_due_at")
    private LocalDate reminderDueAt;

    @Column(name="balance_due_at")
    private LocalDate balanceDueAt;

   @PreUpdate
    private void computeDueDates() {
        if (arrivalDate != null) {
        reminderDueAt = LocalDate.now().plusDays(5);
        balanceDueAt = arrivalDate.minusDays(30);
    }
}
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
                 
    }

     public String getLanguage() {
        return this.customer != null ? this.customer.getLanguage() : null;
    }

    public String getEmail() {
        return this.customer != null ? this.customer.getEmail() : null;
    }

    public String getMainContactFirstName() {
        return this.customer != null ? this.customer.getFirstName() : null;
    }

    public String getPhone() {
        return this.customer != null ? this.customer.getPhone() : null;
    }

    public String getMainContactLastName() {
        return this.customer != null ? this.customer.getLastName() : null;
    }

}
