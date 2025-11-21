"use client";

import { SearchBooking } from "@/components/";
import { useAppSelector } from "@/store/hooks";
import { useCurrency } from "@/utils/hooks";

const BookingPage = () => {
  const currency = useAppSelector((state) => state.currency.value);
  console.log(currency);

  const from = "2025-06-30";
  const to = "2025-07-07";

  const { price } = useCurrency({ currency, from, to });

  return (
    <div className="flex items-center justify-start bg-red mx-auto h-screen w-full text-white ">
      <SearchBooking />
    </div>
  );
};

export default BookingPage;
