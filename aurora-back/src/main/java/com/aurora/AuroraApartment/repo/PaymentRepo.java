package com.aurora.AuroraApartment.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aurora.AuroraApartment.dto.PaymentStatus;
import com.aurora.AuroraApartment.model.Payment;
import com.aurora.AuroraApartment.model.Reservation;


public interface PaymentRepo extends JpaRepository<Payment, Integer> {
    
    public Optional<Payment> findByStripePaymentIntentId(String stripePaymentIntentId);
    public Optional<Payment> findByReservation(Reservation reservation);
    public Optional<Payment> findByReservationAndPaymentStatus(Reservation reservation, PaymentStatus pending);
}
