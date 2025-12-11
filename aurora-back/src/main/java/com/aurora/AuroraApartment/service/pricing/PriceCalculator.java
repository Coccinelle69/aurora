package com.aurora.AuroraApartment.service.pricing;

import java.time.LocalDate;
import java.util.List;
import java.util.function.Function;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PriceCalculator {
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

    private String error;

    public PriceCalculator priceList(LocalDate from, LocalDate to) {
    int year = from.getYear();

    // helper: convert "MM-dd" → LocalDate
    Function<String, LocalDate> d = mmdd -> LocalDate.parse(year + "-" + mmdd);

    PriceCalculator result = new PriceCalculator();

    // MAY (15–31)
    if (!from.isBefore(d.apply("05-15")) && !to.isAfter(d.apply("05-31"))) {
        int nights = (int) (to.toEpochDay() - from.toEpochDay());
        result.setTotalNights(nights);
        result.setPrice(90);
        result.setTotal(nights * 90);
        return result;
    }

    // JUNE (01–30)
    if (!from.isBefore(d.apply("06-01")) && !to.isAfter(d.apply("06-30"))) {
        int nights = (int) (to.toEpochDay() - from.toEpochDay());
        result.setTotalNights(nights);
        result.setPrice(105);
        result.setTotal(nights * 105);
        return result;
    }

    // JULY–AUGUST (01–31, 01–31)
    if (!from.isBefore(d.apply("07-01")) && !to.isAfter(d.apply("08-31"))) {

        LocalDate julyStart = from.isBefore(d.apply("07-01")) ? d.apply("07-01") : from;
        LocalDate julyEnd = to.isAfter(d.apply("07-31")) ? d.apply("07-31") : to;

        LocalDate augustStart = from.isAfter(d.apply("08-01")) ? from : d.apply("08-01");
        LocalDate augustEnd = to;

        int julyNights = Math.max(0, (int) (julyEnd.toEpochDay() - julyStart.toEpochDay()));
        int augustNights = Math.max(0, (int) (augustEnd.toEpochDay() - augustStart.toEpochDay()));

        int totalNights = julyNights + augustNights;

        result.setTotalNights(totalNights);
        result.setPrice(120);
        result.setTotal(totalNights * 120);
        return result;
    }

    // SEPTEMBER
    if (!from.isBefore(d.apply("09-01")) && !to.isAfter(d.apply("09-30"))) {
        int nights = (int) (to.toEpochDay() - from.toEpochDay());
        result.setTotalNights(nights);
        result.setPrice(105);
        result.setTotal(nights * 105);
        return result;
    }

    // MAY → JUNE SPLIT
    if (!from.isBefore(d.apply("05-15")) &&
        !from.isAfter(d.apply("05-31")) &&
        !to.isBefore(d.apply("06-01")) &&
        !to.isAfter(d.apply("06-30"))) {

        LocalDate endMay = d.apply("05-31");
        LocalDate beginJune = d.apply("06-01");

        int fromNights = (int) (endMay.toEpochDay() - from.toEpochDay()) + 1;
        int toNights = (int) (to.toEpochDay() - beginJune.toEpochDay());

        int totalNights = fromNights + toNights;

        result.setTotalNights(totalNights);
        result.setPrice(90);
        result.setTotal(fromNights * 90 + toNights * 105);

        result.setFromNights(fromNights);
        result.setFromPrice(90);
        result.setFromTotalPrice(fromNights * 90);
        result.setFromDates(List.of(from, endMay));

        result.setToNights(toNights);
        result.setToPrice(105);
        result.setToTotalPrice(toNights * 105);
        result.setToDates(List.of(beginJune, to));

        return result;
    }

    // JUNE → JULY/AUGUST SPLIT
    if (!from.isBefore(d.apply("06-01")) &&
        !from.isAfter(d.apply("06-30")) &&
        !to.isBefore(d.apply("07-01")) &&
        !to.isAfter(d.apply("08-31"))) {

        LocalDate endJune = d.apply("06-30");
        LocalDate beginJuly = d.apply("07-01");

        int fromNights = (int) (endJune.toEpochDay() - from.toEpochDay()) + 1;
        int toNights = (int) (to.toEpochDay() - beginJuly.toEpochDay());

        int totalNights = fromNights + toNights;

        result.setTotalNights(totalNights);
        result.setPrice(105);
        result.setTotal(fromNights * 105 + toNights * 120);

        result.setFromNights(fromNights);
        result.setFromPrice(105);
        result.setFromTotalPrice(fromNights * 105);
        result.setFromDates(List.of(from, endJune));

        result.setToNights(toNights);
        result.setToPrice(120);
        result.setToTotalPrice(toNights * 120);
        result.setToDates(List.of(beginJuly, to));

        return result;
    }

    // JULY/AUGUST → SEPTEMBER SPLIT
    if (!from.isBefore(d.apply("07-01")) &&
        !from.isAfter(d.apply("08-31")) &&
        !to.isBefore(d.apply("09-01")) &&
        !to.isAfter(d.apply("09-30"))) {

        LocalDate endAugust = d.apply("08-31");
        LocalDate beginSeptember = d.apply("09-01");

        int fromNights = (int) (endAugust.toEpochDay() - from.toEpochDay()) + 1;
        int toNights = (int) (to.toEpochDay() - beginSeptember.toEpochDay());

        int totalNights = fromNights + toNights;

        result.setTotalNights(totalNights);
        result.setPrice(120);
        result.setTotal(fromNights * 120 + toNights * 105);

        result.setFromNights(fromNights);
        result.setFromPrice(120);
        result.setFromTotalPrice(fromNights * 120);
        result.setFromDates(List.of(from, endAugust));

        result.setToNights(toNights);
        result.setToPrice(105);
        result.setToTotalPrice(toNights * 105);
        result.setToDates(List.of(beginSeptember, to));

        return result;
    }

    // OUT OF SEASON
    result.setTotalNights(0);
    result.setPrice(null);
    result.setTotal(0);
    result.setError("hors-season");

    return result;
}

}
