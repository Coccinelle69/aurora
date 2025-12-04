"use client";

import { SearchBooking, PriceAvailability } from "@/components/";
import { useAppSelector } from "@/store/hooks";

const BookingPage = () => {
  const modalOpen = useAppSelector((state) => state.modal.value);

  return (
    <div className="relative min-h-screen">
      <div
        className="
      fixed inset-0 -z-10
      bg-[url('/beach2.jpg')]
      bg-cover
      bg-center
      bg-no-repeat
    "
      />
      <div className="relative top-[10rem]   md:top-0 ">
        <SearchBooking />
        {modalOpen && <PriceAvailability />}
      </div>
    </div>
  );
};

export default BookingPage;
