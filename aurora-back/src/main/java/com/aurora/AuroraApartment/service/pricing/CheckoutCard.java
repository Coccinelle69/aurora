package com.aurora.AuroraApartment.service.pricing;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class CheckoutCard {
    private LocalDate arrival;
    private LocalDate departure;
    
    private Integer totalNights;
    private Integer guests;
    private Integer totalPrice;

    private Integer fromNights;
    private Integer fromPrice;
    private Integer fromTotalPrice;
    private List<LocalDate> fromDates;

    private Integer toNights;
    private Integer toPrice;
    private Integer toTotalPrice;
    private List<LocalDate> toDates;

    private boolean isSplit;   
    private boolean outOfSeason;   
}
