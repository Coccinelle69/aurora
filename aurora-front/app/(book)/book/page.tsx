"use client";

import { SearchBooking } from "@/components/";
import { useAppSelector } from "@/store/hooks";
import { useCurrency } from "@/utils/hooks";

const BookingPage = () => {
  const currency = useAppSelector((state) => state.currency.value);

  const from = "2025-06-30";
  const to = "2025-07-07";

  const { price } = useCurrency({ currency, from, to });

  return (
    <div className="relative min-h-screen">
      {/* FIXED BACKGROUND */}
      <div
        className="
      fixed inset-0 -z-10
      bg-[url('/beach2.jpg')]
      bg-cover
      bg-center
      bg-no-repeat
    "
      />

      {/* YOUR CONTENT */}
      <SearchBooking />

      <div className="mt-10">{/* Rest of your page */}</div>
    </div>
  );
};

export default BookingPage;
