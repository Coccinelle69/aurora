// const fromDate = new Date("2025-06-28");
// const toDate = new Date("2025-07-06");

export const priceList = (fromDate: Date, toDate: Date) => {
  let amount = {};
  let nights;
  let total;
  let fromDays;
  let toDays;
  let fromDaysTotalPrice;
  let toDaysTotalPrice;
  let totalNights;
  switch (true) {
    //may
    case fromDate >= new Date("2025-05-15") && toDate <= new Date("2025-05-31"):
      nights = toDate.getDate() - fromDate.getDate();
      total = nights * 90;
      amount = {
        totalNights: nights,
        price: 90,
        total,
      };
      break;

    //june
    case fromDate >= new Date("2025-06-01") && toDate <= new Date("2025-06-30"):
      nights = toDate.getDate() - fromDate.getDate();
      total = nights * 105;
      amount = {
        totalNights: nights,
        price: 105,
        total,
      };
      break;

    //july/august
    case fromDate >= new Date("2025-07-01") && toDate <= new Date("2025-08-31"):
      const endJuly = new Date("2025-07-31");
      const daysJuly = endJuly.getDate() - fromDate.getDate() + 1;
      const beginAugust = new Date("2025-08-01");
      const daysAugust = toDate.getDate() - beginAugust.getDate();
      nights = daysAugust + daysJuly;
      total = nights * 120;
      amount = {
        totalNights: nights,
        price: 120,
        total,
      };
      break;

    //september
    case fromDate >= new Date("2025-09-01") && toDate <= new Date("2025-09-30"):
      const days = toDate.getDate() - fromDate.getDate();
      total = days * 105;
      amount = {
        days,
        price: 105,
        total,
      };
      break;

    //may-june
    case fromDate >= new Date("2025-05-15") &&
      fromDate <= new Date("2025-05-31") &&
      toDate >= new Date("2025-06-01") &&
      toDate <= new Date("2025-06-30"):
      const endMay = new Date("2025-05-31");
      const beginJune = new Date("2025-06-01");
      fromDays = endMay.getDate() - fromDate.getDate() + 1;
      toDays = toDate.getDate() - beginJune.getDate();
      total = fromDays * 90 + toDays * 105;
      totalNights = fromDays + toDays;
      fromDaysTotalPrice = fromDays * 90;
      toDaysTotalPrice = toDays * 105;

      amount = {
        fromDays,
        fromDaysPrice: 90,
        fromDaysTotalPrice,
        toDays,
        toDaysPrice: 105,
        toDaysTotalPrice,
        total,
        totalNights,
      };
      break;

    //june-july/august

    case fromDate >= new Date("2025-06-01") &&
      fromDate <= new Date("2025-06-30") &&
      toDate >= new Date("2025-07-01") &&
      toDate <= new Date("2025-08-31"):
      const endJune = new Date("2025-06-30");
      const julyAugust = new Date("2025-07-01");
      fromDays = endJune.getDate() - fromDate.getDate() + 1;
      toDays = toDate.getDate() - julyAugust.getDate();
      total = fromDays * 105 + toDays * 120;
      totalNights = fromDays + toDays;
      fromDaysTotalPrice = fromDays * 105;
      toDaysTotalPrice = toDays * 120;

      amount = {
        fromDays,
        fromDaysPrice: 105,
        fromDaysTotalPrice,
        toDays,
        toDaysPrice: 120,
        toDaysTotalPrice,
        total,
        totalNights,
      };
      break;

    //july/august-september
    case fromDate >= new Date("2025-07-01") &&
      fromDate <= new Date("2025-08-31") &&
      toDate >= new Date("2025-09-01") &&
      toDate <= new Date("2025-09-30"):
      const endAugust = new Date("2025-08-31");
      const beginSeptember = new Date("2025-09-01");
      fromDays = endAugust.getDate() - fromDate.getDate() + 1;
      toDays = toDate.getDate() - beginSeptember.getDate();
      total = fromDays * 120 + toDays * 105;
      totalNights = fromDays + toDays;
      fromDaysTotalPrice = fromDays * 120;
      toDaysTotalPrice = toDays * 105;

      amount = {
        fromDays,
        fromDaysPrice: 120,
        fromDaysTotalPrice,
        toDays,
        toDaysPrice: 105,
        toDaysTotalPrice,
        total,
        totalNights,
      };
      break;

    default:
      amount = "hors-season";
  }
  return amount;
};
