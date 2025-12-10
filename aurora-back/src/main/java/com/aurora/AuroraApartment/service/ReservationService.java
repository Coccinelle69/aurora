package com.aurora.AuroraApartment.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aurora.AuroraApartment.model.Reservation;
import com.aurora.AuroraApartment.repo.ReservationRepo;

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
}
