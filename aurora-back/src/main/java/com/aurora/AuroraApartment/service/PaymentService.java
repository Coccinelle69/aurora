package com.aurora.AuroraApartment.service;
import java.util.Map;
import java.util.Optional;

import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aurora.AuroraApartment.dto.PaymentStatus;
import com.aurora.AuroraApartment.dto.ReservationStatus;
import com.aurora.AuroraApartment.model.Payment;
import com.aurora.AuroraApartment.model.Reservation;
import com.aurora.AuroraApartment.repo.PaymentRepo;
import com.aurora.AuroraApartment.repo.ReservationRepo;
import com.aurora.AuroraApartment.service.provider.StripePaymentProvider;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.StripeObject;
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
    public String startStripePayment(Reservation reservation) {

    if (reservation.getStatus() == ReservationStatus.PAID) {
    throw new IllegalStateException("Reservation already paid");

}
     Payment payment = paymentRepo
    .findByReservationAndPaymentStatus(reservation, PaymentStatus.PENDING)
    .orElseGet(() ->
        paymentRepo.save(
            Payment.createPending(
                reservation,
                reservation.getTotalPrice()
            )
        )
    );
    
    Session session = stripePaymentProvider.createCheckoutSession(reservation);

    if (session.getPaymentIntent() != null) {
    payment.setStripePaymentIntentId(session.getPaymentIntent());
}

    paymentRepo.save(payment);

    return session.getUrl(); 
    
}

@Transactional
public void finishStripePayment(Event event, String payload) {
    ObjectMapper mapper = new ObjectMapper();
    JsonNode root;
    System.out.println(payload);

    try {
        root = mapper.readTree(payload);
    } catch (Exception e) {
        throw new RuntimeException("Invalid Stripe payload", e);
    }

    String sessionId = root
        .path("data")
        .path("object")
        .path("id")
        .asText(null);

    if (sessionId == null) {
        throw new IllegalStateException("No session id in webhook");
    }

    Session session;
    try {
        session = Session.retrieve(sessionId);
    } catch (Exception e) {
        throw new RuntimeException("Failed to retrieve session", e);
    }

    Map<String, String> metadata = session.getMetadata();
    if (metadata == null || !metadata.containsKey("reservationReference")) {
        throw new IllegalStateException("Missing reservationReference");
    }

    String reference = metadata.get("reservationReference");

    Reservation reservation = reservationRepo
        .findByReservationReference(reference)
        .orElseThrow();

    Payment payment = paymentRepo
        .findByReservation(reservation)
        .orElseGet(() ->
            paymentRepo.save(
                Payment.createPending(
                    reservation,
                    reservation.getTotalPrice()
                )
            )
        );

    if (payment.getPaymentStatus() == PaymentStatus.PAID) return;

    payment.setPaymentStatus(PaymentStatus.PAID);
    payment.setAmountPaid(reservation.getTotalPrice());
    payment.setStripePaymentIntentId(session.getPaymentIntent());

    paymentRepo.saveAndFlush(payment);

    reservation.setStatus(ReservationStatus.PAID);
    reservationRepo.saveAndFlush(reservation);
}


// public void markIbanPaid(Reservation reservation, int amount) {
    //     Payment payment = Payment.createPaid(
    //         reservation,
    //         amount,
    //         PaymentMethod.IBAN
    //     );

    //     paymentRepo.save(payment);
    // }
}
