"use client";

import { SearchBooking, PriceAvailability } from "@/components/";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";

const BookingPage = () => {
  const modalOpen = useAppSelector((state) => state.modal.value);

  return (
    <main className="relative">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/beach2.jpg"
          alt="Aurora beach view"
          fill
          priority
          quality={80}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="relative top-40   md:top-0 ">
        <SearchBooking />
        {modalOpen && <PriceAvailability />}
      </div>
    </main>
  );
};

export default BookingPage;
