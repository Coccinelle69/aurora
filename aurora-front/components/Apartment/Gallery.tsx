"use client";

import { StaticImageData } from "next/image";
import { useState } from "react";
import { ViewMore, LazyImage } from "../";

interface GalleryProps {
  images: StaticImageData[];
  openBackdrop: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function Gallery({ images, openBackdrop }: GalleryProps) {
  const [visibleCount, setVisibleCount] = useState(7);
  const imagesToDisplay = images.slice(0, visibleCount);

  return (
    <div className="flex flex-col items-center bg-[#d1d8de]">
      <div className="mx-auto w-full max-w-[1400px] my-[2rem] columns-1 sm:columns-2 lg:columns-3 gap-4">
        {imagesToDisplay.map((src, i) => (
          <div
            key={i}
            className="relative group mb-4 break-inside-avoid overflow-hidden rounded-xl"
            onClick={() => {
              console.log("CLICKED IMAGE:", i);
              openBackdrop(i);
            }}
          >
            <LazyImage src={src} alt={`img-${i}`} />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 hover:cursor-pointer" />
          </div>
        ))}
      </div>

      <ViewMore
        images={images}
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
        batchSize={7}
      />
    </div>
  );
}
