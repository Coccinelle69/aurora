"use client";

import { useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import * as houseImages from "@/assets/carousel";

type Slide = string | StaticImageData;
const slides = Object.values(houseImages);

const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
    skipSnaps: false,
    inViewThreshold: 0.6,
  });

  const items: Slide[] = slides!;

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 10000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className=" relative" role="region" aria-label="Image carousel">
      <p className="sr-only">This carousel auto-advances every 10 seconds.</p>
      <div className="absolute inset-0 top-60 z-10 flex items-center justify-center pointer-events-none lg:top-0 left-0">
        <p
          aria-hidden
          className="font-logo
          text-white tracking-[0.25rem] text-[4rem] opacity-70 sm:text-[8rem]"
        >
          Aurora
        </p>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((src, index) => (
            <div
              className="flex-[0_0_100%] relative h-[550px] lg:h-[600px]"
              key={typeof src === "string" ? src : src.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${items.length}`}
            >
              <div className="transition-transform duration-300 ease-out will-change-transform">
                <div className="relative h-[800px] w-full">
                  <Image
                    src={src}
                    alt={`Aurora Apartment view ${index + 1}`}
                    fill
                    className="object-cover pointer-events-none select-none opacity-95 "
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "low"}
                    sizes="100vw"
                    quality={80}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="btn-carousel left"
        aria-label="Previous slide"
      >
        ‹
      </button>

      <button
        onClick={() => emblaApi?.scrollNext()}
        className="btn-carousel right"
        aria-label="Next slide"
      >
        ›
      </button>
    </div>
  );
};

export default EmblaCarousel;
