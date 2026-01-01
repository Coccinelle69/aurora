package com.aurora.AuroraApartment.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aurora.AuroraApartment.service.PaymentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.net.Webhook;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/stripe")
@RequiredArgsConstructor
public class StripeWebhookController {

    @Value("${STRIPE_WEBHOOK_SECRET}")
    private String webhookSecret;
    private final PaymentService paymentService;

    @PostMapping("/webhook")
    public ResponseEntity<String> handle(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader
    ) throws StripeException, JsonProcessingException {
        try {
            Event event = Webhook.constructEvent(
                payload, sigHeader, webhookSecret
            );

            if("checkout.session.completed".equals(event.getType())) paymentService.finishStripePayment(event, payload);
            

            System.out.println("WEBHOOK OK: " + event.getType());
            return ResponseEntity.ok("ok");

        } catch (SignatureVerificationException e) {
            return ResponseEntity.status(400).body("invalid");
        }
    }
}

