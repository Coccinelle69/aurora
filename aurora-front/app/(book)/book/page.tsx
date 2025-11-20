"use client";

import SearchBooking from "@/components/Booking/SearchBooking";
import { SeaIcon } from "@/icons";
import { useAppSelector } from "@/store/hooks";
import { useCurrency } from "@/utils/hooks";

const BookingPage = () => {
  const currency = useAppSelector((state) => state.currency.value);
  console.log(currency);

  const from = "2025-06-30";
  const to = "2025-07-07";

  const { price } = useCurrency({ currency, from, to });

  return (
    <div className="flex items-center justify-center bg-red mx-auto h-screen w-full text-red-500">
      <SearchBooking />
    </div>
  );
};

export default BookingPage;
