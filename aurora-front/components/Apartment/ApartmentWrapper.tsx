"use client";
import {
  Amenities,
  ApartmentFeatures,
  Gallery,
  ShareButton,
  UniqueExperience,
  EmblaCarousel,
  GalleryBackdrop,
} from "@/components";
import { useState } from "react";

const ApartmentWrapper = () => {
  const [backdropIndex, setBackdropIndex] = useState<number | null>(null);

  return (
    <>
      <EmblaCarousel />
      <ApartmentFeatures />
      <Gallery openBackdrop={setBackdropIndex} />
      {backdropIndex !== null && (
        <GalleryBackdrop
          openBackdrop={() => setBackdropIndex(null)}
          startIndex={backdropIndex}
        />
      )}
      <Amenities />
      <UniqueExperience />
      <ShareButton />
    </>
  );
};

export default ApartmentWrapper;
