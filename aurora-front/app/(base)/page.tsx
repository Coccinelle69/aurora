"use client";
import {
  EmblaCarousel,
  Introduction,
  ExploreApartment,
  Features,
} from "@/components";

import * as houseImages from "../../assets/carousel";

export default function Home() {
  const slides = Object.values(houseImages);

  return (
    <>
      <EmblaCarousel slides={slides} />
      <div className="w-full ">
        <Introduction />
        <ExploreApartment />
        <Features />
      </div>
    </>
  );
}
