export interface PriceResult {
  totalNights: number;
  price: number | null;
  total: number;

  fromNights?: number;
  fromPrice?: number;
  fromTotalPrice?: number;
  fromDates?: Date[];

  toNights?: number;
  toPrice?: number;
  toTotalPrice?: number;
  toDates?: Date[];

  error?: string;
}

export const priceList = (fromDate: Date, toDate: Date): PriceResult => {
  const year = fromDate.getFullYear();

  let nights: number;
  let total: number;
  let fromNights: number;
  let toNights: number;
  let totalNights: number;

  const d = (mmdd: string) => new Date(`${year}-${mmdd}`);

  console.log("PRICE LLIST " + fromDate, toDate);

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
    const julyStart = fromDate < d("07-01") ? d("07-01") : fromDate;
    const julyEnd = toDate > d("07-31") ? d("07-31") : toDate;

    const augustStart = fromDate > d("08-01") ? fromDate : d("08-01");
    const augustEnd = toDate;

    const julyNights = Math.max(
      0,
      Math.ceil((julyEnd.getTime() - julyStart.getTime()) / 86400000)
    );

    const augustNights = Math.max(
      0,
      Math.ceil((augustEnd.getTime() - augustStart.getTime()) / 86400000)
    );

    const totalNights = julyNights + augustNights;
    const total = totalNights * 120;

    return { totalNights, price: 120, total };
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

    fromNights = endMay.getDate() - fromDate.getDate() + 1;
    toNights = toDate.getDate() - beginJune.getDate();

    totalNights = fromNights + toNights;

    const fromDates = [fromDate, endMay];
    const toDates = [beginJune, toDate];

    return {
      totalNights,
      price: 90,
      total: fromNights * 90 + toNights * 105,
      fromDates,
      fromNights,
      fromPrice: 90,
      fromTotalPrice: fromNights * 90,
      toDates,
      toNights,
      toPrice: 105,
      toTotalPrice: toNights * 105,
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
    const beginJuly = d("07-01");

    fromNights = endJune.getDate() - fromDate.getDate() + 1;
    toNights = toDate.getDate() - beginJuly.getDate();

    totalNights = fromNights + toNights;

    const fromDates = [fromDate, endJune];
    const toDates = [beginJuly, toDate];

    return {
      totalNights,
      price: 105,
      total: fromNights * 105 + toNights * 120,
      fromDates,
      fromNights,
      fromPrice: 105,
      fromTotalPrice: fromNights * 105,
      toDates,
      toNights,
      toPrice: 120,
      toTotalPrice: toNights * 120,
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

    fromNights = endAugust.getDate() - fromDate.getDate() + 1;
    toNights = toDate.getDate() - beginSeptember.getDate();

    totalNights = fromNights + toNights;

    const fromDates = [fromDate, endAugust];
    const toDates = [beginSeptember, toDate];

    return {
      totalNights,
      price: 120,
      total: fromNights * 120 + toNights * 105,
      fromDates,
      fromNights,
      fromPrice: 120,
      fromTotalPrice: fromNights * 120,
      toDates,
      toNights,
      toPrice: 105,
      toTotalPrice: toNights * 105,
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
