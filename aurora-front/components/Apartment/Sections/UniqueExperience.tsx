"use client";

import Link from "next/link";
import { SlidesGallery } from "@/components";
import * as outdoorsImages from "@/assets/outdoors";
import { useTranslation } from "react-i18next";

export default function UniqueExperience() {
  const images = Object.values(outdoorsImages);
  const { t } = useTranslation();
  return (
    <section
      className="w-full flex flex-col lg:flex-row"
      aria-labelledby="unique-experience-title"
    >
      <div className="relative bg-[#dce4eb] flex flex-col  justify-center px-10  lg:px-20 lg:w-1/2">
        <h2
          id="unique-experience-title"
          className=" font-heading text-default text-5xl mt-6 lg:mt-0 mb-8 text-center lg:text-left"
        >
          {t("uniqueExperience")}
        </h2>

        <p className="text-babyBlue leading-relaxed mb-6 max-w-[600px] ">
          {t("zukveDesc1")}
        </p>

        <p className="text-babyBlue leading-relaxed mb-10 max-w-[600px] ">
          {t("zukveDesc2")}
        </p>

        <Link
          href="/location"
          className="
          bg-[#0e2e57] 
          text-white px-6 py-3 rounded 
          hover:bg-[#133a6d] 
          transition
          w-fit
          mb-6 lg:mb-0
        "
        >
          {t("exploreLocation")}
        </Link>
      </div>

      <div
        className="relative bg-red lg:w-1/2 h-[400px] lg:h-auto"
        aria-labelledby="unique-experience-title"
      >
        <SlidesGallery images={images} />
      </div>
    </section>
  );
}
