"use client";

import { useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";

type Slide = string | StaticImageData;
type Props = {
  options?: EmblaOptionsType;
  images?: StaticImageData[]; // optional; if omitted we use defaults below
};

export default function GalleryBackdrop({ images }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
    skipSnaps: false,
    inViewThreshold: 0.6,
  });

  // ✅ use provided slides or fallback to your images
  const items: Slide[] = images!;

  useEffect(() => {
    if (!emblaApi) return;

    // 🔁 Move to the next slide every 3 seconds
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [emblaApi]); // 👈 use emblaApi, not emblaRef

  return (
    <div className="embla relative">
      <div className="absolute inset-0 top-[15rem] left-[2rem] z-10 flex items-center justify-center pointer-events-none lg:top-0 left-0"></div>
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {items.map((src, index) => (
            <div
              className="embla__slide flex-[0_0_100%] relative h-[80%] lg:h-[600px]"
              key={typeof src === "string" ? src : src.src}
            >
              <div className="embla__image transition-transform duration-300 ease-out will-change-transform">
                <div className="embla__image relative h-[800px] w-full">
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover pointer-events-none select-none opacity-95 "
                    priority
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
