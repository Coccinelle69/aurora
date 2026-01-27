package com.aurora.AuroraApartment.service;
import java.math.BigDecimal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import com.aurora.AuroraApartment.dto.PaymentStatus;
import com.aurora.AuroraApartment.dto.ReservationStatus;
import com.aurora.AuroraApartment.model.Payment;
import com.aurora.AuroraApartment.model.Reservation;
import com.aurora.AuroraApartment.repo.PaymentRepo;
import com.aurora.AuroraApartment.repo.ReservationRepo;
import com.aurora.AuroraApartment.service.provider.StripePaymentProvider;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;

import com.stripe.model.checkout.Session;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepo paymentRepo;
    private final ReservationRepo reservationRepo;
    private final StripePaymentProvider stripePaymentProvider;
    private final EmailService emailService;
    @Value("${app.frontend.url}") 
    private String frontendBaseUrl;

    @SuppressWarnings("null")
    @Transactional
    public String startStripePayment(String reference, PaymentStatus paymentStatus) {

    Reservation reservation = reservationRepo.findByReservationReference(reference).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    String redirectUrl=null;

        if(reservation.getStatus() == ReservationStatus.PAID) {
          redirectUrl = UriComponentsBuilder.fromUriString(frontendBaseUrl)
                .path("/payment/result")
                .queryParam("status", "paid")
                .queryParam("ref", reservation.getReservationReference())
                .toUriString();
            return redirectUrl;
        }

        if(reservation.getStatus() != ReservationStatus.CONFIRMED && reservation.getStatus() != ReservationStatus.PARTIALLY_PAID) {
             throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Reservation not confirmed");
        }

    Payment payment = null;
    BigDecimal deposit = reservation.getTotalPrice().multiply(BigDecimal.valueOf(0.3));
    BigDecimal remaining = reservation.getTotalPrice().multiply(BigDecimal.valueOf(0.7));
    BigDecimal total = reservation.getTotalPrice();
    if(paymentStatus == PaymentStatus.FULL) {
     payment = paymentRepo
    .findByReservationAndPaymentStatus(reservation, PaymentStatus.PENDING)
    .orElseGet(() ->
        paymentRepo.save(Payment.createPending(reservation, total, total, BigDecimal.ZERO, BigDecimal.ZERO)));
    } else if(paymentStatus == PaymentStatus.DEPOSIT) {
         payment = paymentRepo.findByReservationAndPaymentStatus(reservation, PaymentStatus.PENDING).orElseGet(() -> paymentRepo.save(
            Payment.createPending(reservation, total, deposit, remaining, deposit)));
    } else if(paymentStatus == PaymentStatus.PARTIAL) {
        payment = paymentRepo.findByReservationAndPaymentStatus(reservation, PaymentStatus.PENDING)
            .orElseGet(() -> paymentRepo.save(Payment.createPending(reservation, total, remaining, BigDecimal.ZERO, deposit)));     
    }
     
    
    Session session = stripePaymentProvider.createCheckoutSession(reservation, paymentStatus);

    if (session.getPaymentIntent() != null) {
    payment.setStripePaymentIntentId(session.getPaymentIntent());
}

    paymentRepo.save(payment);

    return session.getUrl(); 
    
}

@Transactional
public void finishStripePayment(Event event, String payload) throws JsonProcessingException, StripeException {
    if(!"checkout.session.completed".equals(event.getType())) {
        return;
    }
    ObjectMapper mapper = new ObjectMapper();
    JsonNode root = mapper.readTree(payload);
    System.out.println(payload);
    
    String sessionId = root
        .path("data")
        .path("object")
        .path("id")
        .asText(null);

    if (sessionId == null) throw new IllegalStateException("No session id in webhook");
    

    Session session;
    try {
        session = Session.retrieve(sessionId);
    } catch (StripeException e) {
         throw new ResponseStatusException(HttpStatus.BAD_GATEWAY,"Failed to retrieve Stripe session");
    }

    Map<String, String> metadata = session.getMetadata();
    if (metadata == null || !metadata.containsKey("reservationReference")) throw new IllegalStateException("Missing reservationReference");
    

    String reference = metadata.get("reservationReference");
    BigDecimal amountPaid = new BigDecimal(metadata.get("amountPaid"));
    PaymentStatus paymentStatus = PaymentStatus.valueOf(metadata.get("paymentStatus"));

    Reservation reservation = reservationRepo.findByReservationReference(reference).orElseThrow(()-> new IllegalStateException(" No reservation under this reference"));

    Payment payment = paymentRepo.findByReservationAndPaymentStatus(reservation, PaymentStatus.PENDING).orElseThrow(() -> new IllegalStateException("No pending payment"));

    if(paymentStatus == PaymentStatus.FULL && reservation.getTotalPrice().compareTo(amountPaid) == 0) {
           payment.setPaymentStatus(PaymentStatus.FULL);
           reservation.setStatus(ReservationStatus.PAID);
           emailService.sendFullPaymentConfirmation(reservation);

        } else if(paymentStatus == PaymentStatus.DEPOSIT && amountPaid.compareTo(reservation.getTotalPrice().multiply(BigDecimal.valueOf(0.3))) ==0) {
            payment.setPaymentStatus(PaymentStatus.DEPOSIT);
            reservation.setStatus(ReservationStatus.PARTIALLY_PAID);
            reservation.setBalanceDueAt(reservation.getArrivalDate().minusDays(37));
            reservation.setReminderSent(false);
            emailService.sendPartialPaymentConfirmation(reservation, payment);
        }
        else if(paymentStatus == PaymentStatus.PARTIAL && 
            reservation.getTotalPrice().compareTo(amountPaid.add(payment.getAmountDeposit())) ==0) 
            {
            payment.setPaymentStatus(PaymentStatus.FULL);
            payment.setAmountPaid(amountPaid);
            reservation.setStatus(ReservationStatus.PAID);
            emailService.sendFullPaymentConfirmation(reservation);
        }
        
    payment.setStripePaymentIntentId(session.getPaymentIntent());
    paymentRepo.saveAndFlush(payment);
    reservationRepo.saveAndFlush(reservation);
}
}
