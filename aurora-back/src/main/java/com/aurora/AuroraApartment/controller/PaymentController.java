package com.aurora.AuroraApartment.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.aurora.AuroraApartment.dto.PaymentStatus;
import com.aurora.AuroraApartment.dto.ReservationStatus;
import com.aurora.AuroraApartment.model.Reservation;
import com.aurora.AuroraApartment.repo.ReservationRepo;
import com.aurora.AuroraApartment.service.PaymentService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {
    
    private final ReservationRepo reservationRepo;
    private final PaymentService paymentService;

    @GetMapping("/checkout/stripe/{reference}")
    public ResponseEntity<Void> createStripeCheckout(@PathVariable String reference, @RequestParam PaymentStatus status) {
        Reservation reservation = reservationRepo.findByReservationReference(reference).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        PaymentStatus paymentStatus = status;
        if(reservation.getStatus() != ReservationStatus.CONFIRMED && reservation.getStatus() != ReservationStatus.PAID &&
      reservation.getStatus() != ReservationStatus.PARTIALLY_PAID) {
             throw new ResponseStatusException(
        HttpStatus.BAD_REQUEST,
        "Reservation not confirmed"
      );
        }
        String url = paymentService.startStripePayment(reservation, paymentStatus);
        
        return ResponseEntity
        .status(HttpStatus.FOUND)   
        .header("Location", url)
        .build();

    }

   
    
}
