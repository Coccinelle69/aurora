package com.aurora.AuroraApartment.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aurora.AuroraApartment.dto.ReservationRequest;
import com.aurora.AuroraApartment.model.Reservation;
import com.aurora.AuroraApartment.repo.ReservationRepo;
import com.aurora.AuroraApartment.service.pricing.PriceCalculator;

@Service
public class ReservationService {
    @Autowired
    ReservationRepo reservationRepo;

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

    return reservationRepo.save(newReservation);

}
}
