package com.aurora.AuroraApartment.service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aurora.AuroraApartment.dto.ReservationRequest;
import com.aurora.AuroraApartment.dto.ReservationStatus;
import com.aurora.AuroraApartment.model.Reservation;
import com.aurora.AuroraApartment.repo.ReservationRepo;
import com.aurora.AuroraApartment.service.pricing.PriceCalculator;

import jakarta.transaction.Transactional;

@Service
public class ReservationService {
    @Autowired
    ReservationRepo reservationRepo;
    private final EmailService emailService;

    public ReservationService(
            ReservationRepo reservationRepo,
            EmailService emailService
    ) {
        this.reservationRepo = reservationRepo;
        this.emailService = emailService;
    }


public boolean isAvailable(LocalDate arrival, LocalDate departure) {
    List<Reservation> overlaps = reservationRepo
            .findOverlappingReservations(arrival, departure);
    return overlaps.isEmpty();
}
   
public List<Reservation> allReservations() {
    List<Reservation> reservations = reservationRepo.findAll();
    if(reservations.isEmpty()) return List.of();
    return reservations;
}
public Reservation createReservation(ReservationRequest reservation) {
    PriceCalculator priceCalculator = new PriceCalculator();
    priceCalculator.priceList(reservation.getArrivalDate(), reservation.getDepartureDate());
    Reservation newReservation = Reservation.builder()
        .mainContactFirstName(reservation.getFirstName())
        .mainContactLastName(reservation.getLastName())
        .email(reservation.getEmail())
        .phone(reservation.getPhone())
        .language(reservation.getLanguage())
        .arrivalDate(reservation.getArrivalDate())
        .departureDate(reservation.getDepartureDate())
        .totalNights(priceCalculator.getTotalNights())
        .totalPrice(priceCalculator.getPrice())
        .guests(reservation.getAdults() + reservation.getTeens() +reservation.getChildren())
        .adults(reservation.getAdults())
        .teens(reservation.getTeens())
        .children(reservation.getChildren())
        .build();
    Reservation saved = reservationRepo.save(newReservation);

    
    emailService.sendCheckoutRecapToAdmin(saved);          
    emailService.sendCheckoutRecapToUser(saved); 

    return saved;

}

@Transactional
public Reservation cancelReservation(UUID reservationToken) {
    Reservation reservation = reservationRepo.findByPublicToken(reservationToken).orElseThrow(() -> new RuntimeException("Not found"));
    reservation.setStatus(ReservationStatus.CANCELLED);
    return reservation;

}

@Transactional
public Reservation confirmReservation(UUID reservationToken) {
    Reservation reservation = reservationRepo.findByPublicToken(reservationToken).orElseThrow(() -> new RuntimeException("Not found"));
    reservation.setStatus(ReservationStatus.CONFIRMED);
    return reservation;

}
}
