"use client";

import Image, { StaticImageData } from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import * as apartmentImages from "@/assets/aurora";

type Props = {
  options?: EmblaOptionsType;
  images?: StaticImageData[];
  openBackdrop: React.Dispatch<React.SetStateAction<number | null>>;
  startIndex: number;
};

export default function GalleryBackdrop({ startIndex, openBackdrop }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
    skipSnaps: false,
    inViewThreshold: 0.6,
  });
  const apartment = Object.values(apartmentImages);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        openBackdrop(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openBackdrop]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(startIndex, true);
  }, [emblaApi, startIndex]);

  return createPortal(
    <div
      className="fixed inset-0 w-screen h-screen bg-black/80 z-9999"
      onClick={() => openBackdrop(null)}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <div
        className="embla relative"
        role="region"
        aria-roledescription="carousel"
      >
        <div className="embla__viewport overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {apartment.map((src, index) => (
              <div
                key={typeof src === "string" ? src : src.src}
                className="embla__slide flex-[0_0_100%] w-full h-screen flex items-center justify-center"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${apartment.length}`}
              >
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  width={1200}
                  height={800}
                  className="object-contain max-w-[90vw] max-h-[90vh]"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            emblaApi?.scrollPrev();
          }}
          className="btn-gallery left"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            emblaApi?.scrollNext();
          }}
          className="btn-gallery right"
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </div>,
    document.body
  );
}
