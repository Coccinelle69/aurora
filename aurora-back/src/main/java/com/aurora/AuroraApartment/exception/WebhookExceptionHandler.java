package com.aurora.AuroraApartment.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.stripe.exception.StripeException;

  @RestControllerAdvice
    public class WebhookExceptionHandler {

    @ExceptionHandler(JsonProcessingException.class)
    public ResponseEntity<String> jsonError(JsonProcessingException e) {
        return ResponseEntity.badRequest().body("Invalid Stripe payload");
    }

    @ExceptionHandler(StripeException.class)
    public ResponseEntity<String> stripeError(StripeException e) {
        return ResponseEntity.status(502).body("Stripe API error");
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<String> businessError(IllegalStateException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> fallback(Exception e) {
        return ResponseEntity.status(500).body("Internal error");
    }
} 
    

