"use client";

import { useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";

type Slide = string | StaticImageData;
type Props = {
  options?: EmblaOptionsType;
  slides?: StaticImageData[]; // optional; if omitted we use defaults below
};

const btnStyle = `top-[65%] -translate-y-1/2 text-white/90 
    text-[4rem] px-3 -py-1 rounded-full 
    bg-gradient-to-br from-white/30 to-white/10
    text-white hover:text-black
    shadow-[0_4px_15px_rgba(0,0,0,0.4)]
    border border-white/30
    transition-all duration-300 lg:top-1/2 
    hover:scale-110 hover:shadow-[0_8px_20px_rgba(0,0,0,0.6)]
    active:scale-95
    hover:text-white/100 cursor-pointer`;
const btnStyleRight =
  "absolute right-4 sm:right-5 xl:right-8 2xl:right-9 " + btnStyle;
const btnStyleLeft = "absolute left-4 " + btnStyle;

export default function EmblaCarousel({ slides }: Props) {
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
    <div className=" relative">
      <div className="absolute inset-0 top-[15rem] left-[2rem] z-10 flex items-center justify-center pointer-events-none lg:top-0 left-0">
        <p
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
              className="flex-[0_0_100%] relative h-[80%] lg:h-[600px]"
              key={typeof src === "string" ? src : src.src}
            >
              <div className="transition-transform duration-300 ease-out will-change-transform">
                <div className="relative h-[800px] w-full">
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

      {/* simple prev/next (optional) */}
      <button onClick={() => emblaApi?.scrollPrev()} className={btnStyleLeft}>
        ‹
      </button>

      <button onClick={() => emblaApi?.scrollNext()} className={btnStyleRight}>
        ›
      </button>
    </div>
  );
}
