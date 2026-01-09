"use client";
import {
  ShareButton,
  EmblaCarousel,
  Introduction,
  ExploreApartment,
  Features,
} from "@/components";

const HomeWrapper = () => {
  return (
    <>
      <EmblaCarousel />
      <div>
        <Introduction />
        <ExploreApartment />
        <Features />
        <ShareButton />
      </div>
    </>
  );
};

export default HomeWrapper;
