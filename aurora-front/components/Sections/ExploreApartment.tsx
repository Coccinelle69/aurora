"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function ExploreApartment() {
  const { t } = useTranslation();
  return (
    <section className="relative w-full">
      <div className="relative h-[70vh] min-h-[520px] w-full">
        <Image
          src="/beach2.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1 bg-black/30" />
      </div>

      <div className="pointer-events-none absolute inset-0 w-full">
        <div className="pointer-events-auto mx-auto h-full max-w-7xl px-4 sm:px-6">
          <div className="relative flex h-full justify-start mt-5 sm:mt-24 w-full mx-auto">
            <div className="absolute w-full  lg:max-w-xl 2xl:-left-30 lg:left-20">
              <div className="bg-marineBlue p-6 sm:p-8 text-white shadow-md">
                <h2 className={`font-heading text-3xl md:text-4xl`}>
                  {t("explore-h2")}
                </h2>
              </div>
              <div className="bg-white/60 px-8 py-8 shadow-md backdrop-blur">
                <p className="text-slate-700 leading-relaxed font-body text-[0.85rem] sm:text-[1rem]">
                  {t("explore-p-1")}
                </p>
                <p className="mt-4 text-slate-700 leading-relaxed font-body text-[0.85rem] sm:text-[1rem]">
                  {t("explore-p-2")}
                </p>

                <Link
                  href="/apartment"
                  className="mt-6 inline-block font-semibold tracking-wide text-marineBlue underline-offset-4 hover:underline font-bod"
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
