"use client";

import { useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";

type Slide = string | StaticImageData;
type Props = {
  options?: EmblaOptionsType;
  images?: StaticImageData[];
};

export default function GalleryBackdrop({ images }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
    skipSnaps: false,
    inViewThreshold: 0.6,
  });

  const items: Slide[] = images!;

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div
      className=" relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Image gallery"
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex" aria-live="polite">
          {items.map((src, index) => (
            <div
              className="flex-[0_0_100%] relative h-[400px] md:h-[450px] lg:h-[712px]
"
              key={typeof src === "string" ? src : src.src}
            >
              <div className="transition-transform duration-300 ease-out will-change-transform">
                <div className="relative h-[450px] md:h-[500px] lg:h-[712px] w-full">
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    fill
                    sizes="450px"
                    className="object-cover pointer-events-none select-none opacity-95 "
                    priority
                    aria-hidden="true"
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
