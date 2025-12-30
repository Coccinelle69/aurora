"use client";
import {
  EmblaCarousel,
  Introduction,
  ExploreApartment,
  Features,
  ShareButton,
} from "@/components";

import * as houseImages from "@/assets/carousel";

export default function Home() {
  const slides = Object.values(houseImages);
  console.log(
    "Stripe PK loaded:",
    !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  return (
    <main>
      <EmblaCarousel slides={slides} />
      <div>
        <Introduction />
        <ExploreApartment />
        <Features />
        <ShareButton />
      </div>
    </main>
  );
}
