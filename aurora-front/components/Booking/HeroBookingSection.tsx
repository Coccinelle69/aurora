"use client";

import Image from "next/image";
import SearchBooking from "./SearchBar/SearchBooking";
import PriceAvailability from "./PriceAvailablity/PriceAvailability";
import { useAppSelector } from "@/store/hooks";

const HeroBookingSection = () => {
  const modalOpen = useAppSelector((state) => state.modal.value);

  return (
    <div>
      <div className="fixed inset-0 -z-10">
        <Image
          src="/beach2.webp"
          alt="Aurora beach view"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          fetchPriority="high"
        />
      </div>
      <div className="relative top-40   md:top-0 ">
        <SearchBooking />
        {modalOpen && <PriceAvailability />}
      </div>
    </div>
  );
};

export default HeroBookingSection;
