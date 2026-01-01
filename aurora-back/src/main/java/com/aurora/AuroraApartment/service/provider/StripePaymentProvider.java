package com.aurora.AuroraApartment.service.provider;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.aurora.AuroraApartment.dto.PaymentStatus;
import com.aurora.AuroraApartment.model.Reservation;
import com.stripe.model.checkout.Session;

@Service
public class StripePaymentProvider {
    
    public Session createCheckoutSession(Reservation reservation, PaymentStatus paymentStatus) {
        try {
            Map<String,Object> params = new HashMap<>();

             params.put("mode", "payment");

             params.put("success_url",
             "http://localhost:3000/payment/result?status=success&ref=" + reservation.getReservationReference());
             params.put("cancel_url",
             "http://localhost:3000/payment/result?status=cancelled&ref=" + reservation.getReservationReference());
             params.put("customer_email", reservation.getEmail());

             Map<String,Object> metadata = new HashMap<>();
             metadata.put("reservationReference", reservation.getReservationReference());
             metadata.put("reservationId", reservation.getId());
             
             Map<String,Object> priceData = new HashMap<>();
             priceData.put("currency", "eur");
             BigDecimal total = reservation.getTotalPrice();
             BigDecimal amountPaid = paymentStatus == PaymentStatus.FULL ? total : total.multiply(BigDecimal.valueOf(0.3));
             //  Long unitAmount = paymentStatus == PaymentStatus.FULL ? 
             //  total.multiply(BigDecimal.valueOf(100)).longValueExact() : 
             //  total.multiply(BigDecimal.valueOf(30)).longValueExact();
             Long unitAmount = amountPaid.multiply(BigDecimal.valueOf(100)).longValueExact();
             priceData.put("unit_amount", unitAmount);
             
             Map<String,Object> productData = new HashMap<>();
             productData.put("name", "Aurora Apartment Reservation");
             productData.put("description", reservation.getArrivalDate() + " → " + reservation.getDepartureDate());
             priceData.put("product_data", productData);
             
             Map<String,Object> lineItem = new HashMap<>();
             lineItem.put("price_data", priceData);
             lineItem.put("quantity", 1);
             
             params.put("line_items", List.of(lineItem));
             
             metadata.put("amountPaid", amountPaid.toPlainString());
             metadata.put("paymentStatus", paymentStatus.name());
             params.put("metadata", metadata);

             Session session = Session.create(params);
             return session;


        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Stripe session creation failed", e);
        }
       
    }
}
