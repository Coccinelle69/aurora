package com.aurora.AuroraApartment.model;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import com.aurora.AuroraApartment.dto.PaymentStatus;
import com.aurora.AuroraApartment.dto.PaymentMethod;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentMethod paymentMethod;

    @Column(name = "stripe_payment_intent_id")
    private String stripePaymentIntentId;

    @Column(name = "stripe_charge_id")
    private String stripeChargeId;

    @Column(nullable = false)
    @Builder.Default
    private String currency = "EUR";

    @Column(name = "amount_expected", nullable = false)
    private int amountExpected;

    @Column(name = "amount_paid", nullable = false)
    @Builder.Default
    private int amountPaid=0;

    @Column(name = "amount_refunded", nullable = false)
    @Builder.Default
    private int amountRefunded=0;

    @Column(name = "discount_amount", nullable = false)
    @Builder.Default
    private int discountAmount=0;

    @Column(name = "discount_code")
    private String discountCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    @Builder.Default
    private PaymentStatus paymentStatus=PaymentStatus.PENDING;

    @CreationTimestamp
    private Instant createdAt;

    public static Payment createPending(
            Reservation reservation,
            int amountExpected 
    ) {
        
        return Payment.builder()
                .reservation(reservation)
                .paymentMethod(PaymentMethod.STRIPE)
                .amountExpected(amountExpected)
                .build();
    }

    // public static Payment createPaid(
    //         Reservation reservation,
    //         int amountExpected,
    //         int amountPaid,
    //         PaymentMethod method,
    //         String stripeIntentId,
    //         String stripeChargeId
    // ) {
    //     return Payment.builder()
    //             .reservation(reservation)
    //             .paymentMethod(method)
    //             .amountExpected(amountExpected)
    //             .amountPaid(amountPaid)
    //             .paymentStatus(PaymentStatus.PAID)
    //             .stripePaymentIntentId(stripeIntentId)
    //             .stripeChargeId(stripeChargeId)
    //             .currency("EUR")
    //             .build();
    // }
}
