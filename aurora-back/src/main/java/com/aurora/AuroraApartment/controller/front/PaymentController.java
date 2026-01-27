package com.aurora.AuroraApartment.controller.front;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aurora.AuroraApartment.dto.PaymentStatus;
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
    
    private final PaymentService paymentService;

    @GetMapping("/checkout/stripe/{reference}")
    public ResponseEntity<Void> createStripeCheckout(@PathVariable String reference, @RequestParam PaymentStatus status) {
        String redirectUrl = paymentService.startStripePayment(reference, status);
        
        return ResponseEntity
        .status(HttpStatus.FOUND)   
        .header("Location", redirectUrl)
        .build();

    }

   
    
}
