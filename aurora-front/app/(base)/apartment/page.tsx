"use client";

import {
  EmblaCarousel,
  ApartmentFeatures,
  Gallery,
  GalleryBackdrop,
  UniqueExperience,
  Amenities,
  ShareButton,
} from "@/components";

import * as houseImages from "@/assets/carousel";
import * as apartmentImages from "@/assets/aurora";
import { useState } from "react";

const ApartmentPage = () => {
  const slides = Object.values(houseImages);
  const apartment = Object.values(apartmentImages);
  const [backdropIndex, setBackdropIndex] = useState<number | null>(null);

  console.log("BACKDROP INDEX:", backdropIndex);

  return (
    <main>
      <EmblaCarousel slides={slides} />
      <ApartmentFeatures />
      <Gallery images={apartment} openBackdrop={setBackdropIndex} />
      {backdropIndex !== null && (
        <GalleryBackdrop
          images={apartment}
          openBackdrop={() => setBackdropIndex(null)}
          startIndex={backdropIndex}
        />
      )}

      <Amenities />
      <UniqueExperience />
      <ShareButton />
    </main>
  );
};

export default ApartmentPage;
