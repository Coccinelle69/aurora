interface formatDate {
  from: string;
  to: string;
  locale?: string;
}

export function formatDate({ from, to, locale }: formatDate) {
  const arrival = new Date(from);
  const departure = new Date(to);
  const nights = (departure.getTime() - arrival.getTime()) / 86400000;

  return {
    arrival: arrival.toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    departure: departure.toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    nights,
  };
}

export function formatPriceUniversal(
  amount: number,
  currency: string,
  locale: string
) {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formatted = formatter.format(amount);

  return formatted;
}
