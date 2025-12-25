package com.aurora.AuroraApartment.service.pricing;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.aurora.AuroraApartment.dto.PriceResult;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CheckoutService {
    private final PriceCalculator priceCalculator;

    public CheckoutCard build(LocalDate arrival, LocalDate departure, int guests) {
        PriceResult calc = priceCalculator.calculate(arrival, departure);

        CheckoutCard card = new CheckoutCard();

        card.setArrival(arrival);
        card.setDeparture(departure);
        card.setGuests(guests);
        card.setTotalNights(calc.getTotalNights());
        card.setTotalPrice(calc.getTotal());

        if ("hors-season".equals(calc.getError())) {
            card.setOutOfSeason(true);
            return card;
        }

        // Split season
        if (calc.getFromNights() != null && calc.getToNights() != null) {
            card.setSplit(true);

            card.setFromNights(calc.getFromNights());
            card.setFromPrice(calc.getFromPrice());
            card.setFromTotalPrice(calc.getFromTotalPrice());
            card.setFromDates(calc.getFromDates());

            card.setToNights(calc.getToNights());
            card.setToPrice(calc.getToPrice());
            card.setToTotalPrice(calc.getToTotalPrice());
            card.setToDates(calc.getToDates());
        } else {
            // Single season
            card.setSplit(false);

            card.setFromNights(calc.getTotalNights());
            card.setFromPrice(calc.getPrice());
            card.setFromTotalPrice(calc.getTotal());
            card.setFromDates(List.of(arrival, departure));
        }

        return card;
    
    }
}
