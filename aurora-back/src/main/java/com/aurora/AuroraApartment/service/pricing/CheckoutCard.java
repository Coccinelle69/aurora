package com.aurora.AuroraApartment.service.pricing;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class CheckoutCard {
    private LocalDate arrival;
    private LocalDate departure;
    
    private int totalNights;
    private Integer price; 
    private int total;

    private Integer fromNights;
    private Integer fromPrice;
    private Integer fromTotalPrice;
    private List<LocalDate> fromDates;

    private Integer toNights;
    private Integer toPrice;
    private Integer toTotalPrice;
    private List<LocalDate> toDates;

     private boolean isSplit;   // true for 2 rows
    private boolean outOfSeason;
}
