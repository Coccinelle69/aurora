package com.aurora.AuroraApartment.service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.aurora.AuroraApartment.dto.PriceResult;
import com.aurora.AuroraApartment.dto.ReservationRequest;
import com.aurora.AuroraApartment.dto.ReservationStatus;
import com.aurora.AuroraApartment.model.Reservation;
import com.aurora.AuroraApartment.repo.ReservationRepo;
import com.aurora.AuroraApartment.service.pricing.PriceCalculator;

import jakarta.transaction.Transactional;

@Service
public class ReservationService {
    
    private final ReservationRepo reservationRepo;
    private final EmailService emailService;
    private final ReservationReferenceService referenceService;
    private final PriceCalculator priceCalculator;


    public ReservationService(
            ReservationRepo reservationRepo,
            EmailService emailService,
            ReservationReferenceService referenceService,
            PriceCalculator priceCalculator

    ) {
        this.reservationRepo = reservationRepo;
        this.emailService = emailService;
        this.referenceService = referenceService;
        this.priceCalculator = priceCalculator;
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

@Transactional
public Reservation createReservation(ReservationRequest reservation) {
    Reservation existingReservation = reservationRepo.findByArrivalDate(reservation.getArrivalDate()).orElseThrow(()-> new RuntimeException("Not found") );
    
    if(existingReservation !=null) {
        return existingReservation;
    }

    PriceResult price = priceCalculator.calculate(reservation.getArrivalDate(), reservation.getDepartureDate());
    
     if (price.getTotalNights() <= 0) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST,
            "Selected dates are not available"
        );
    }
    
    String reference = referenceService.generateReference();
    int adults = Optional.ofNullable(reservation.getAdults()).orElse(0);
    int teens = Optional.ofNullable(reservation.getTeens()).orElse(0);
    int children = Optional.ofNullable(reservation.getChildren()).orElse(0);

    Reservation newReservation = Reservation.builder()
        .mainContactFirstName(reservation.getFirstName())
        .mainContactLastName(reservation.getLastName())
        .email(reservation.getEmail())
        .phone(reservation.getPhone())
        .language(reservation.getLanguage())
        .message(reservation.getMessage())
        .arrivalDate(reservation.getArrivalDate())
        .departureDate(reservation.getDepartureDate())
        .totalNights(price.getTotalNights())
        .totalPrice(price.getTotal())
        .guests(adults + teens + children)
        .adults(reservation.getAdults())
        .teens(reservation.getTeens())
        .children(reservation.getChildren())
        .reservationReference(reference)
        .build();
    Reservation saved = reservationRepo.save(newReservation);

    
    emailService.sendCheckoutRecapToAdmin(saved);          
    emailService.sendCheckoutRecapToUser(saved); 

    return saved;

}

@Transactional
public Reservation cancelReservation(UUID reservationToken) {
    Reservation reservation = reservationRepo.findByPublicToken(reservationToken).orElseThrow(() -> new RuntimeException("Not found"));
     if (reservation.isAdminActionUsed())
        throw new ResponseStatusException(HttpStatus.GONE, "Link already used");

    if (Instant.now().isAfter(reservation.getAdminActionExpiresAt()))
        throw new ResponseStatusException(HttpStatus.GONE, "Link expired");
    reservation.setStatus(ReservationStatus.CANCELLED);
    reservation.setAdminActionUsed(true);
    return reservation;

}

@Transactional
public Reservation confirmReservation(UUID reservationToken) {
    Reservation reservation = reservationRepo.findByPublicToken(reservationToken).orElseThrow(() -> new RuntimeException("Not found"));

    if (reservation.isAdminActionUsed())
        throw new ResponseStatusException(HttpStatus.GONE, "Link already used");

    if (Instant.now().isAfter(reservation.getAdminActionExpiresAt()))
        throw new ResponseStatusException(HttpStatus.GONE, "Link expired");

    reservation.setStatus(ReservationStatus.CONFIRMED);
    reservation.setAdminActionUsed(true);

    emailService.sendPaymentInfoToUser(reservation);
    return reservation;

}
}
