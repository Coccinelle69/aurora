package com.aurora.AuroraApartment.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aurora.AuroraApartment.dto.ContactRequest;
import com.aurora.AuroraApartment.dto.ReservationRequest;
import com.aurora.AuroraApartment.model.Reservation;
import com.aurora.AuroraApartment.service.EmailService;
import com.aurora.AuroraApartment.service.ReservationService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    ReservationService reservationService;

@GetMapping("/availability")
public ResponseEntity<?> checkAvailability(
    @RequestParam LocalDate arrival,
    @RequestParam LocalDate departure
) {

    boolean available = reservationService.isAvailable(arrival, departure);

    return ResponseEntity.ok(Map.of("available", available));
}

@GetMapping("/all")
public ResponseEntity<?> fetchReservations() {

    List<Reservation> reservations = reservationService.allReservations();

    return ResponseEntity.ok(Map.of("reservations", reservations));
}

@PostMapping("/check")
    public ResponseEntity<?> verifyForm(@Valid @RequestBody ReservationRequest request) {

    return ResponseEntity.ok("{\"success\": true}");
}

@PostMapping("/checkout")
public ResponseEntity<?> checkout(@Valid @RequestBody ReservationRequest request) {
    reservationService.createReservation(request);

    return ResponseEntity.ok("{\"success\": true}");
}

@PostMapping("/confirm/{id}")
public ResponseEntity<?> confirm(@Valid @RequestBody ReservationRequest request, @PathVariable UUID token) {
    reservationService.confirmReservation(token);

    return ResponseEntity.ok("{\"success\": true}");
}

@PostMapping("/cancel/{id}")
public ResponseEntity<?> cancel(@Valid @RequestBody ReservationRequest request, @PathVariable UUID token) {
    reservationService.cancelReservation( token);

    return ResponseEntity.ok("{\"success\": true}");
}

}
