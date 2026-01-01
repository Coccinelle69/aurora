package com.aurora.AuroraApartment.service;
import java.math.BigDecimal;
import java.util.Map;
import java.util.Optional;

import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

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

    @SuppressWarnings("null")
    @Transactional
    public String startStripePayment(Reservation reservation, PaymentStatus paymentStatus) {

    if (reservation.getStatus() == ReservationStatus.PAID) {
    throw new IllegalStateException("Reservation already paid");

}
    Payment payment = null;
    if(paymentStatus == PaymentStatus.FULL) {
     payment = paymentRepo
    .findByReservationAndPaymentStatus(reservation, PaymentStatus.PENDING)
    .orElseGet(() ->
        paymentRepo.save(Payment.createPending(reservation, reservation.getTotalPrice(), reservation.getTotalPrice())));
    } else {
         payment = paymentRepo.findByReservationAndPaymentStatus(reservation, PaymentStatus.PENDING).orElseGet(() -> paymentRepo.save(
            Payment.createPending(reservation, reservation.getTotalPrice(), reservation.getTotalPrice().multiply(BigDecimal.valueOf(0.3))
        )));
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

    Reservation reservation = reservationRepo.findByReservationReference(reference).orElseThrow(()-> new IllegalStateException(" No reservation under this reference"));

    Payment payment = paymentRepo.findByReservationAndPaymentStatus(reservation, PaymentStatus.PENDING).orElseThrow(() -> new IllegalStateException("No pending payment"));

    if(reservation.getTotalPrice().compareTo(amountPaid) == 0) {
           payment.setPaymentStatus(PaymentStatus.FULL);
           payment.setAmountPaid(reservation.getTotalPrice());
           reservation.setStatus(ReservationStatus.PAID);
        } else {
            payment.setPaymentStatus(PaymentStatus.PARTIAL);
            payment.setAmountPaid(amountPaid);
            reservation.setStatus(ReservationStatus.PARTIALLY_PAID);
            reservation.setBalanceDueAt(reservation.getArrivalDate().minusDays(37));
        }
        
    payment.setStripePaymentIntentId(session.getPaymentIntent());
    paymentRepo.saveAndFlush(payment);
    reservationRepo.saveAndFlush(reservation);
}
}
