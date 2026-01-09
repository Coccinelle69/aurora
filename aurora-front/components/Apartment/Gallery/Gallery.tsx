"use client";

import { useMemo, useState } from "react";
import { ViewMore, LazyImage } from "@/components";
import * as apartmentImages from "@/assets/aurora";

interface GalleryProps {
  openBackdrop: React.Dispatch<React.SetStateAction<number | null>>;
}
const apartment = Object.values(apartmentImages);

export default function Gallery({ openBackdrop }: GalleryProps) {
  const [visibleCount, setVisibleCount] = useState(7);
  const imagesToDisplay = useMemo(
    () => apartment.slice(0, visibleCount),
    [visibleCount]
  );

  return (
    <div
      className="flex flex-col items-center bg-footer-bg"
      role="region"
      aria-label="Photo Gallery"
    >
      <div
        className="w-full md:w-[90%] mx-auto max-w-[1400px] my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-4"
        role="list"
      >
        {imagesToDisplay.map((img) => {
          const index = apartment.findIndex((i) => i.src === img.src);
          return (
            <div
              key={img.src}
              className="relative group mb-4 break-inside-avoid overflow-hidden rounded-xl"
              role="listitem"
            >
              <div
                role="button"
                tabIndex={0}
                aria-label={`View image ${index + 1}`}
                onClick={() => openBackdrop(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openBackdrop(index);
                  }
                }}
                className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <LazyImage
                  index={index}
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  openBackdrop={openBackdrop}
                />
              </div>
            </div>
          );
        })}
      </div>

      <ViewMore
        images={apartment}
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
        batchSize={7}
      />
    </div>
  );
}
