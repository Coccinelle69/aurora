package com.aurora.AuroraApartment.service.provider;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.aurora.AuroraApartment.model.Reservation;
import com.stripe.model.checkout.Session;

@Service
public class StripePaymentProvider {
    
    public Session createCheckoutSession(Reservation reservation) {
        try {
            Map<String,Object> params = new HashMap();

             params.put("mode", "payment");

             params.put("success_url",
             "http://localhost:3000/payment/result?status=success&ref=" + reservation.getReservationReference());
             params.put("cancel_url",
             "http://localhost:3000/payment/result?status=cancelled&ref=" + reservation.getReservationReference());
             params.put("customer_email", reservation.getEmail());

             Map<String,Object> metadata = new HashMap();
             metadata.put("reservationReference", reservation.getReservationReference());
             metadata.put("reservationId", reservation.getId());
             params.put("metadata", metadata);

             Map<String,Object> priceData = new HashMap();
             priceData.put("currency", "eur");
             priceData.put("unit_amount", reservation.getTotalPrice() * 100);

             Map<String,Object> productData = new HashMap();
             productData.put("name", "Aurora Apartment Reservation");
             productData.put("description", reservation.getArrivalDate() + " → " + reservation.getDepartureDate());
             priceData.put("product_data", productData);

             Map<String,Object> lineItem = new HashMap();
             lineItem.put("price_data", priceData);
             lineItem.put("quantity", 1);

             params.put("line_items", List.of(lineItem));

             Session session = Session.create(params);
             return session;


        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Stripe session creation failed", e);
        }
       
    }
}
