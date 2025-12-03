interface formatDate {
  from: string | Date;
  to: string | Date;
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

export function formatDateNoYear({ from, to, locale }: formatDate) {
  const arrival = new Date(from);
  const departure = new Date(to);

  return {
    arrival: arrival.toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
    }),
    departure: departure.toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
    }),
  };
}

export function formatPriceUniversal(amount: number, locale: string) {
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
}
