// app/components/ComfortSection.tsx
"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function ComfortSection() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* FULL-BLEED RIGHT PANEL (goes to the screen edge, taller than the photo) */}
      <div className="absolute right-0 top-28 h-180 sm:h-[480px] lg:h-[550px] xl:h-[480px] w-[62vw] bg-[#D3DAE0]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* CONTENT LAYER (sits above the panel) */}
        <div className="relative z-10 flex items-center justify-between">
          {/* LEFT PHOTO (shorter than panel) */}
          <div className="hidden lg:block">
            <div className="h-[500px] w-[410px] xl:relative xl:left-24 overflow-hidden shadow-[0_35px_35px_rgba(0,0,0,0.20)]">
              <Image
                src="/beach.jpg" // <-- your image
                alt="Aurora Suites pool"
                width={400}
                height={750}
                className="h-full  object-cover"
                priority
              />
            </div>
          </div>

          <div className="mx-auto xl:ml-auto  flex w-full justify-center lg:w-[47%]">
            <div className="py-16 text-center">
              <h2
                className={`font-heading text-2xl md:text-3xl text-slate-800`}
              >
                <span>{t("introduction-h2-1")}</span>
                <br />
                <span>{t("introduction-h2-2")}</span>
              </h2>
              <div className="mx-auto mt-6 max-w-2xl space-y-4 text-xs md:text-sm leading-relaxed text-slate-600">
                <p className="font-body text-[1rem]">{t("introduction-p-1")}</p>
                <p className="font-body text-[1rem]">{t("introduction-p-2")}</p>
                <p className="font-body text-[1rem]">{t("introduction-p-3")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE: stacked layout */}
        <div className="lg:hidden relative z-10 mt-6">
          <div className="h-64 overflow-hidden shadow">
            <Image
              src="/beach.jpg"
              alt="Aurora Suites pool"
              width={1200}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
