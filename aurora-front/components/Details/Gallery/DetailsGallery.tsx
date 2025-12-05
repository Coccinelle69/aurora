"use client";
import Image, { StaticImageData } from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { useEffect, useState, useCallback, memo } from "react";
import { ThumbnailGallery } from "@/components";

type Slide = StaticImageData | string;

interface PropType {
  slides: Slide[];
  options?: EmblaOptionsType;
}

function DetailsGallery({ slides, options }: PropType) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    loop: true,
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    Promise.resolve().then(() => onSelect());

    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const onThumbClick = (index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  };

  const btnStyle = `top-[50%] -translate-y-1/2 text-white/90 
    text-[4rem] px-3 -py-1 
    text-white 
    text-shadow-lg/90
    active:scale-90
    `;
  const btnStyleRight = "absolute right-4 " + btnStyle;
  const btnStyleLeft = "absolute left-4 " + btnStyle;

  return (
    <div className="flex flex-col md:flex-row w-full sm:w-[90%]  gap-10 mx-auto mt-[5rem] py-[7rem]  sm:py-[2rem] overflow-hidden ">
      {/* MAIN GALLERY */}
      <div className="relative flex-[4] overflow-hidden sm:rounded-tl-3xl sm:rounded-bl-3xl">
        {/* Embla viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((src, i) => (
              <div
                key={i}
                className="flex-[0_0_100%] relative w-full h-[65vh]" // fixed height for mobile
              >
                <Image
                  src={src}
                  alt={`Slide ${i + 1}`}
                  fill // ensures image fills height/width
                  className={`object-cover transition-all duration-700 ease-in-out ${
                    i === selectedIndex
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => onThumbClick(i)}
              className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
                i === selectedIndex
                  ? "border-white opacity-100 bg-transparent"
                  : "border-white/70 bg-black/80 opacity-30 hover:opacity-60"
              }`}
            />
          ))}
        </div>

        {/* your existing arrows — UNCHANGED */}
        <div className="md:hidden">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className={btnStyleLeft}
          >
            ‹
          </button>

          <button
            onClick={() => emblaApi?.scrollNext()}
            className={btnStyleRight}
          >
            ›
          </button>
        </div>
      </div>

      {/* THUMBNAILS */}
      <ThumbnailGallery />
    </div>
  );
}

export default memo(DetailsGallery);
