"use client";

import { useDevice } from "@/utils/hooks";
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
  const mq = useDevice();
  const lg = !mq.xl;

  const btnStyle = `mt-6 ${
    lg ? "px-8 py-4" : "px-12 py-6"
  }  rounded-lg bg-transparent border-2 border-marineBlue text-marineBlue font-bold text-[1.25rem]
        hover:bg-babyBlue/50 hover:text-white transition-all shadow-md`;

  if (visibleCount >= images.length)
    return (
      <div className={`${lg ? "mb-8" : "my-28"}`}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open("/book", "_blank", "noopener,noreferrer");
          }}
          className={btnStyle}
        >
          {t("book")}
        </button>
      </div>
    );

  return (
    <div className={`${lg ? "mb-8" : "my-28"}`}>
      <button
        onClick={() => setVisibleCount((prev) => prev + batchSize)}
        className={btnStyle}
      >
        {t("view-more")}
      </button>
    </div>
  );
}
