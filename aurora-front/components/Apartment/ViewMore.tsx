"use client";

import { StaticImageData } from "next/image";
import { useTranslation } from "react-i18next";

interface ViewMoreProps {
  images: StaticImageData[];
  visibleCount: number;
  setVisibleCount: (fn: (prev: number) => number) => void;
  batchSize?: number;
}

export default function ViewMore({
  images,
  visibleCount,
  setVisibleCount,
  batchSize = 7,
}: ViewMoreProps) {
  const { t } = useTranslation();
  console.log("RENDER VIEWMORE");

  if (visibleCount >= images.length)
    return (
      <div className="my-[7rem]">
        <button
          onClick={(e) => {
            e.stopPropagation(); // ⬅️ prevent parent onClick from firing
            window.open("/book", "_blank", "noopener,noreferrer");
          }}
          className="
        mt-6 px-12 py-6 rounded-lg bg-transparent border border-2 border-marineBlue text-marineBlue font-bold text-[1.25rem]
        hover:bg-babyBlue/50 hover:text-white transition-all shadow-md
      "
        >
          {t("book")}
        </button>
      </div>
    );

  return (
    <div className="my-[7rem]">
      <button
        onClick={() => setVisibleCount((prev) => prev + batchSize)}
        className="
        mt-6 px-12 py-6 rounded-lg bg-transparent border border-2 border-marineBlue text-marineBlue font-bold text-[1.25rem]
        hover:bg-babyBlue/50 hover:text-white transition-all shadow-md
      "
      >
        {t("view-more")}
      </button>
    </div>
  );
}
