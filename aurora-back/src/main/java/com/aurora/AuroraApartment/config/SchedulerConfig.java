package com.aurora.AuroraApartment.config;

import java.time.LocalDate;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import com.aurora.AuroraApartment.dto.PaymentStatus;
import com.aurora.AuroraApartment.dto.ReservationStatus;
import com.aurora.AuroraApartment.model.Payment;
import com.aurora.AuroraApartment.model.Reservation;
import com.aurora.AuroraApartment.repo.PaymentRepo;
import com.aurora.AuroraApartment.repo.ReservationRepo;
import com.aurora.AuroraApartment.service.EmailService;
import com.aurora.AuroraApartment.service.ReservationService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@EnableScheduling
@Configuration
@RequiredArgsConstructor
public class SchedulerConfig {

    private final ReservationRepo reservationRepo;
    private final PaymentRepo paymentRepo;
    private final EmailService emailService;
    private final ReservationService reservationService;
    
@Scheduled(cron = "0 0 9 * * *", zone="Europe/Paris")
@Transactional
public void sendPartialPaymentBalanceReminders() {

    List<Reservation> reservations = reservationRepo.findAllRemindersDueToday(LocalDate.now(), ReservationStatus.PARTIALLY_PAID);
    
    for (Reservation reservation : reservations) {
        if (reservation.isReminderSent()) continue;
        Payment payment = paymentRepo.findByReservationAndPaymentStatus(reservation,PaymentStatus.PARTIAL).orElseThrow(()-> new IllegalStateException("No payment for this reservation reference"));
        emailService.sendPartialPaymentBalanceReminder(reservation, payment);
        reservation.setReminderSent(true);
    }
}

@Scheduled(cron = "0 0 9 * * *", zone="Europe/Paris")
@Transactional
public void sendFullPaymentBalanceReminders() {

    List<Reservation> reservations = reservationRepo.findAllRemindersDueToday(LocalDate.now(), ReservationStatus.CONFIRMED);
    
    for (Reservation reservation : reservations) {
        if (reservation.isReminderSent()) continue;
        Payment payment = paymentRepo.findByReservationAndPaymentStatus(reservation,PaymentStatus.PENDING).orElseThrow(()-> new IllegalStateException("No payment for this reservation reference"));
        emailService.sendFullPaymentBalanceReminder(reservation, payment);
        reservation.setReminderSent(true);
    }
}

@Scheduled(cron = "0 0 9 * * *", zone="Europe/Paris")
@Transactional
public void cancelReservationAutomatically() {

    List<Reservation> reservations = reservationRepo.findAllBalancesDueToday(LocalDate.now(), ReservationStatus.PARTIALLY_PAID);
    
    for (Reservation reservation : reservations) {
         boolean fullyPaid = paymentRepo
        .findByReservationAndPaymentStatus(reservation, PaymentStatus.FULL)
        .isPresent();
        if(!fullyPaid && !reservation.isCancellationEmailSent()) {
            emailService.sendReservationCancellation(reservation);
            reservation.setCancellationEmailSent(true);
            reservationService.cancelReservation(reservation.getPublicToken());
        }
    }

}
}