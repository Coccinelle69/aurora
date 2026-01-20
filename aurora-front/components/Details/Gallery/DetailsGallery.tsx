"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { useEffect, useState, useCallback, memo, useId } from "react";
import { ThumbnailGallery } from "@/components";
import * as houseImages from "@/assets/carousel";

interface PropType {
  options?: EmblaOptionsType;
}

function DetailsGallery({ options }: PropType) {
  const slides = Object.values(houseImages);
  const carouselId = useId();

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
    <div
      className="flex flex-col md:flex-row w-full sm:w-[90%]  gap-10 mx-auto mt-20 py-28  sm:py-8 overflow-hidden "
      role="region"
      aria-roledescription="carousel"
      aria-label="Property Image Gallery"
    >
      <div className="relative flex-4 overflow-hidden sm:rounded-3xl lg:rounded-tr-none lg:rounded-br-none">
        <div className="overflow-hidden" ref={emblaRef} aria-live="polite">
          <div className="flex">
            {slides.map((src, i) => (
              <div
                key={i}
                className="flex-[0_0_100%] relative w-full h-[65vh]"
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${i + 1} of ${slides.length}`}
                aria-hidden={i !== selectedIndex}
              >
                <Image
                  src={src}
                  alt={`View of property - Image ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  className={`object-cover transition-all duration-700 ease-in-out ${
                    i === selectedIndex
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                  fetchPriority={i === 0 ? "high" : "low"}
                  priority={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                  quality={60}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20"
          role="tablist"
          aria-label="Select slide"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => onThumbClick(i)}
              role="tab"
              aria-selected={i === selectedIndex}
              aria-label={`Go to slide ${i + 1}`}
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
            aria-label="Previous slide"
            aria-controls={carouselId}
          >
            ‹
          </button>

          <button
            onClick={() => emblaApi?.scrollNext()}
            className={btnStyleRight}
            aria-label="Next slide"
            aria-controls={carouselId}
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
