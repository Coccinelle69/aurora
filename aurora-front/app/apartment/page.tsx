"use client";

import { EmblaCarousel, ApartmentFeatures } from "@/components";
import house1 from "@/public/carousel/house1.jpg";
import house2 from "@/public/carousel/house2.jpg";
import house3 from "@/public/carousel/house3.jpg";

const Apartment = () => {
  const slides = [house1, house2, house3];
  return (
    <div>
      <EmblaCarousel slides={slides} />
      <ApartmentFeatures />
    </div>
  );
};

export default Apartment;
