package com.aurora.AuroraApartment.config;

import java.util.List;

import org.springframework.stereotype.Component;

import com.aurora.AuroraApartment.dto.PaymentStatus;
import com.aurora.AuroraApartment.model.Payment;
import com.aurora.AuroraApartment.model.Reservation;
import com.aurora.AuroraApartment.repo.PaymentRepo;
import com.aurora.AuroraApartment.repo.ReservationRepo;
import com.aurora.AuroraApartment.service.EmailService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EmailJob {

    private final EmailService emailService;
    private final ReservationRepo reservationRepo;
    private final PaymentRepo paymentRepo;

public void run() {
        Reservation reservation = reservationRepo.findById(2).orElseThrow();

        Payment payment = paymentRepo.findByReservationAndPaymentStatus(reservation,PaymentStatus.PARTIAL).orElseThrow(()-> new IllegalStateException("No payment for this reservation reference"));
        // emailService.sendFullPaymentBalanceReminder(reservation, payment);
        // emailService.sendPartialPaymentBalanceReminder(reservation, payment);
        // emailService.sendFullPaymentConfirmation(reservation);
        // emailService.sendPartialPaymentConfirmation(reservation, payment);
        emailService.sendReservationCancellation(reservation);
        reservation.setReminderSent(true);
    
    }

    
}
