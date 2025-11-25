package com.aurora.AuroraApartment.controller;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aurora.AuroraApartment.service.ReservationService;


@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    ReservationService reservationService;
    
@GetMapping("/check")
public ResponseEntity<?> checkAvailability(
    @RequestParam LocalDate arrival,
    @RequestParam LocalDate departure
) {
    boolean available = reservationService.isAvailable(arrival, departure);

    return ResponseEntity.ok(Map.of("available", available));
}
}
