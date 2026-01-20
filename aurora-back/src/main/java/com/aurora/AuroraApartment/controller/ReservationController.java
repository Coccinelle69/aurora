package com.aurora.AuroraApartment.controller;

import java.net.URI;
import org.springframework.http.HttpHeaders;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aurora.AuroraApartment.dto.ReservationRequest;
import com.aurora.AuroraApartment.model.Reservation;
import com.aurora.AuroraApartment.service.ReservationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/reservation")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

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

@GetMapping("/confirm/{token}")
public ResponseEntity<Void> confirm(@PathVariable UUID token) {
    reservationService.confirmReservation(token);

    HttpHeaders headers = new HttpHeaders();
    headers.setLocation(
        URI.create("http://localhost:3000/admin/reservation/result?status=confirmed")
    );

    return new ResponseEntity<>(headers, HttpStatus.FOUND);

}

@GetMapping("/cancel/{token}")
public ResponseEntity<Map<String, Object>> cancel(@PathVariable UUID token) {
    reservationService.cancelReservation(token);

    HttpHeaders headers = new HttpHeaders();
    headers.setLocation(
        URI.create("http://localhost:3000/admin/reservation/result?status=cancelled")
    );

    return new ResponseEntity<>(headers, HttpStatus.FOUND);

}


@PostMapping("/check")
    public ResponseEntity<?> verifyForm(@Valid @RequestBody ReservationRequest request) {

    return ResponseEntity.ok("{\"success\": true}");
}

@PostMapping("/checkout")
public ResponseEntity<?> checkout(@Valid @RequestBody ReservationRequest request) {
   Map<String,Object> result = reservationService.createReservation(request);
   System.out.println(result);

   if(result.get("existingReservation") !=null) {
    return ResponseEntity.ok(Map.of("existingReservation", true));
   }

    return ResponseEntity.ok(Map.of("success", true));
}

}
