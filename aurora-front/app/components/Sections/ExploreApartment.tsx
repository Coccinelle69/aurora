// app/components/ExploreApartments.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Quintessential } from "next/font/google";
import { useTranslation } from "react-i18next";
const quintessential = Quintessential({ subsets: ["latin"], weight: "400" });

export default function ExploreApartment() {
  const { t } = useTranslation();
  return (
    <section className="relative w-full">
      {/* full-bleed background image */}
      <div className="relative h-[70vh] min-h-[520px] w-full">
        <Image
          src="/beach2.jpg" // <- replace with your full-width image
          alt="Apartments background"
          fill
          priority
          className="object-cover"
        />
        {/* optional dark edge like your ref (right side) */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1 bg-black/30" />
      </div>

      {/* overlay card */}
      <div className="pointer-events-none absolute inset-0">
        <div className="pointer-events-auto mx-auto h-full max-w-7xl px-4 sm:px-6">
          <div className="relative flex h-full justify-start pt-24 pr-[20rem]">
            {/* left-aligned panel */}
            <div className="absolute w-[100%] max-w-2xl lg:max-w-xl lg:-left-[10rem] ">
              {/* title bar */}
              <div className="bg-[#11344b] px-8 py-8 text-white shadow-md">
                <h2
                  className={`${quintessential.className} text-3xl md:text-4xl`}
                >
                  {t("explore-h2")}
                </h2>
              </div>
              {/* body box */}
              <div className="bg-white/60 px-8 py-8 shadow-md backdrop-blur">
                <p className="text-slate-700 leading-relaxed">
                  {t("explore-p-1")}
                </p>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  {t("explore-p-2")}
                </p>

                <Link
                  href="/apartment"
                  className="mt-6 inline-block font-semibold tracking-wide text-[#11344b] underline-offset-4 hover:underline"
                >
                  {t("explore-btn")} &gt;&gt;&gt;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
