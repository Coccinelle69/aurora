// priceList.ts

export interface PriceResult {
  totalNights: number;
  price: number | null;
  total: number;

  fromDays?: number;
  fromDaysPrice?: number;
  fromDaysTotalPrice?: number;

  toDays?: number;
  toDaysPrice?: number;
  toDaysTotalPrice?: number;

  error?: string;
}

export const priceList = (fromDate: Date, toDate: Date): PriceResult => {
  const year = fromDate.getFullYear(); // ⭐ DYNAMIC YEAR HERE

  let nights: number;
  let total: number;
  let fromDays: number;
  let toDays: number;
  let totalNights: number;

  // helper to build date with the same year
  const d = (mmdd: string) => new Date(`${year}-${mmdd}`);

  // MAY
  if (fromDate >= d("05-15") && toDate <= d("05-31")) {
    nights = toDate.getDate() - fromDate.getDate();
    total = nights * 90;
    return { totalNights: nights, price: 90, total };
  }

  // JUNE
  if (fromDate >= d("06-01") && toDate <= d("06-30")) {
    nights = toDate.getDate() - fromDate.getDate();
    total = nights * 105;
    return { totalNights: nights, price: 105, total };
  }

  // JULY-AUGUST
  if (fromDate >= d("07-01") && toDate <= d("08-31")) {
    const endJuly = d("07-31");
    const daysJuly = endJuly.getDate() - fromDate.getDate() + 1;

    const beginAugust = d("08-01");
    const daysAugust = toDate.getDate() - beginAugust.getDate();

    nights = daysJuly + daysAugust;
    total = nights * 120;

    return { totalNights: nights, price: 120, total };
  }

  // SEPTEMBER
  if (fromDate >= d("09-01") && toDate <= d("09-30")) {
    nights = toDate.getDate() - fromDate.getDate();
    total = nights * 105;
    return { totalNights: nights, price: 105, total };
  }

  // MAY → JUNE
  if (
    fromDate >= d("05-15") &&
    fromDate <= d("05-31") &&
    toDate >= d("06-01") &&
    toDate <= d("06-30")
  ) {
    const endMay = d("05-31");
    const beginJune = d("06-01");

    fromDays = endMay.getDate() - fromDate.getDate() + 1;
    toDays = toDate.getDate() - beginJune.getDate();

    totalNights = fromDays + toDays;

    return {
      totalNights,
      price: 90,
      total: fromDays * 90 + toDays * 105,
      fromDays,
      fromDaysPrice: 90,
      fromDaysTotalPrice: fromDays * 90,
      toDays,
      toDaysPrice: 105,
      toDaysTotalPrice: toDays * 105,
    };
  }

  // JUNE → JULY/AUGUST
  if (
    fromDate >= d("06-01") &&
    fromDate <= d("06-30") &&
    toDate >= d("07-01") &&
    toDate <= d("08-31")
  ) {
    const endJune = d("06-30");
    const julyAugust = d("07-01");

    fromDays = endJune.getDate() - fromDate.getDate() + 1;
    toDays = toDate.getDate() - julyAugust.getDate();

    totalNights = fromDays + toDays;

    return {
      totalNights,
      price: 105,
      total: fromDays * 105 + toDays * 120,
      fromDays,
      fromDaysPrice: 105,
      fromDaysTotalPrice: fromDays * 105,
      toDays,
      toDaysPrice: 120,
      toDaysTotalPrice: toDays * 120,
    };
  }

  // JULY/AUGUST → SEPTEMBER
  if (
    fromDate >= d("07-01") &&
    fromDate <= d("08-31") &&
    toDate >= d("09-01") &&
    toDate <= d("09-30")
  ) {
    const endAugust = d("08-31");
    const beginSeptember = d("09-01");

    fromDays = endAugust.getDate() - fromDate.getDate() + 1;
    toDays = toDate.getDate() - beginSeptember.getDate();

    totalNights = fromDays + toDays;

    return {
      totalNights,
      price: 120,
      total: fromDays * 120 + toDays * 105,
      fromDays,
      fromDaysPrice: 120,
      fromDaysTotalPrice: fromDays * 120,
      toDays,
      toDaysPrice: 105,
      toDaysTotalPrice: toDays * 105,
    };
  }

  // OUT OF SEASON
  return {
    totalNights: 0,
    price: null,
    total: 0,
    error: "hors-season",
  };
};
