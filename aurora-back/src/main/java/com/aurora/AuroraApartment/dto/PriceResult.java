package com.aurora.AuroraApartment.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PriceResult {
    private int totalNights;
    private Integer price; 
    private Integer total;

    private Integer fromNights;
    private Integer fromPrice;
    private Integer fromTotalPrice;
    private List<LocalDate> fromDates;

    private Integer toNights;
    private Integer toPrice;
    private Integer toTotalPrice;
    private List<LocalDate> toDates;

    private String error;
}
