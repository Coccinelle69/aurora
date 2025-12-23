"use client";

import { StaticImageData } from "next/image";
import { useMemo, useState } from "react";
import { ViewMore, LazyImage } from "@/components";

interface GalleryProps {
  images: StaticImageData[];
  openBackdrop: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function Gallery({ images, openBackdrop }: GalleryProps) {
  const [visibleCount, setVisibleCount] = useState(7);
  const imagesToDisplay = useMemo(
    () => images.slice(0, visibleCount),
    [images, visibleCount]
  );

  return (
    <div className="flex flex-col items-center bg-footer-bg">
      <div className="w-full md:w-[90%] mx-auto max-w-[1400px] my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-4">
        {imagesToDisplay.map((img) => {
          const index = images.findIndex((i) => i.src === img.src);
          return (
            <div
              key={img.src}
              className="relative group mb-4 break-inside-avoid overflow-hidden rounded-xl"
            >
              <LazyImage
                index={index}
                src={img}
                alt={`img-${img}`}
                openBackdrop={openBackdrop}
              />
            </div>
          );
        })}
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
