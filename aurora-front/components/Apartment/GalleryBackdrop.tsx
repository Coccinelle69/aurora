"use client";

import Image, { StaticImageData } from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { createPortal } from "react-dom";
import { useEffect } from "react";

type Slide = string | StaticImageData;
type Props = {
  options?: EmblaOptionsType;
  images?: StaticImageData[];
  openBackdrop: React.Dispatch<React.SetStateAction<number | null>>;
  startIndex: number;
};

const btnStyle = `absolute top-1/2 -translate-y-1/2 
  text-white text-3xl
  opacity-80 hover:opacity-100
  bg-transparent
  p-5
  cursor-pointer
  select-none`;
const btnStyleRight = "absolute right-[15%] " + btnStyle;
const btnStyleLeft = "absolute left-[15%] " + btnStyle;

export default function GalleryBackdrop({
  images,
  startIndex,
  openBackdrop,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false, // snapping feels smoother than free drag
    skipSnaps: false,
    inViewThreshold: 0.6,
  });

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

  // ✅ use provided slides or fallback to your images
  const items: Slide[] = images!;

  return createPortal(
    <div
      className="fixed inset-0 w-screen h-screen bg-black/80 z-[9999]"
      onClick={() => openBackdrop(null)}
    >
      <div className="embla relative ">
        <div className="embla__viewport overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {items.map((src, index) => (
              <div
                key={typeof src === "string" ? src : src.src}
                className="embla__slide flex-[0_0_100%] w-full h-screen flex items-center justify-center"
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
          className={btnStyleLeft}
        >
          ‹
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            emblaApi?.scrollNext();
          }}
          className={btnStyleRight}
        >
          ›
        </button>
      </div>
    </div>,
    document.body
  );
}
