package com.aurora.AuroraApartment.config;

import java.time.LocalDate;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import com.aurora.AuroraApartment.dto.PaymentStatus;
import com.aurora.AuroraApartment.model.Payment;
import com.aurora.AuroraApartment.model.Reservation;
import com.aurora.AuroraApartment.repo.PaymentRepo;
import com.aurora.AuroraApartment.repo.ReservationRepo;
import com.aurora.AuroraApartment.service.EmailService;

import jakarta.transaction.Transactional;

@EnableScheduling
@Configuration
public class SchedulerConfig {

    ReservationRepo reservationRepo;
    PaymentRepo paymentRepo;
    EmailService emailService;
    
@Scheduled(cron = "0 0 9 * * *")
@Transactional
public void sendBalanceReminders() {

    List<Reservation> reservations = reservationRepo.findAllBalanceDueToday(LocalDate.now());
    
    for (Reservation reservation : reservations) {
        Payment payment = paymentRepo.findByReservationAndPaymentStatus(reservation,PaymentStatus.PARTIAL).orElseThrow(()-> new IllegalStateException("No payment for this reservation reference"));
        emailService.sendBalanceReminder(reservation, payment);
        reservation.setReminderSent(true);
    }

    reservationRepo.saveAll(reservations);
}
}
