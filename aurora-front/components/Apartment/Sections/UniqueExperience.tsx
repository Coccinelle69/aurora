"use client";

import Link from "next/link";
import { SlidesGallery } from "@/components";
import * as outdoorsImages from "@/assets/outdoors";
import { useTranslation } from "react-i18next";

export default function UniqueExperience() {
  const images = Object.values(outdoorsImages);
  const { t } = useTranslation();
  return (
    <section className="w-full flex flex-col lg:flex-row">
      {/* LEFT CONTENT */}
      <div className="bg-[#dce4eb] flex flex-col justify-center px-10 lg:px-20 py-20 lg:w-1/2">
        <h2 className="font-heading text-default text-5xl mb-8">
          {t("uniqueExperience")}
        </h2>

        <p className="text-[#4a6ca3] leading-relaxed mb-6 max-w-[600px]">
          {t("zukveDesc1")}
        </p>

        <p className="text-[#4a6ca3] leading-relaxed mb-10 max-w-[600px]">
          {t("zukveDesc2")}
        </p>

        <button
          className="
          bg-[#0e2e57] 
          text-white px-6 py-3 rounded 
          hover:bg-[#133a6d] 
          transition
          w-fit
        "
        >
          <Link href="/location"> {t("exploreLocation")}</Link>
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative bg-red lg:w-1/2 h-[400px] lg:h-auto">
        <SlidesGallery images={images} />
      </div>
    </section>
  );
}
