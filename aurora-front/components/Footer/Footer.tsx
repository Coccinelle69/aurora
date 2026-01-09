"use client";

import { useTranslation } from "react-i18next";
import {
  Copyrights,
  Socials,
  Email,
  Phone,
  DirectionsButton,
} from "@/components";
import dynamic from "next/dynamic";

const FooterWeather = dynamic(
  () => import("@/components/Footer/FooterWeather"),
  {
    ssr: false,
  }
);

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-defaultBg text-white">
      {/* Top content */}
      <div
        className="
          mx-auto w-full max-w-6xl px-6 py-16
          grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4
          text-center md:text-left
          sm:items-start
        "
      >
        {/* Weather & Time */}
        <FooterWeather />

        <div className="w-full flex flex-col items-center lg:items-start">
          <h3 className="font-heading text-2xl font-semibold tracking-wide mb-6">
            {t("contact")}
          </h3>
          <div className="space-y-6">
            <div>
              <Phone />
            </div>

            <div>
              <Email />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center lg:items-start">
          <h3 className="font-heading text-2xl font-semibold tracking-wide mb-6">
            {t("footer-findUs")}
          </h3>
          <Socials />
        </div>

        <div className="flex w-full flex-col items-center lg:items-start">
          <h3 className="font-heading text-2xl font-semibold tracking-wide mb-6">
            {t("footer-location")}
          </h3>
          <div>
            <DirectionsButton />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-0.5 w-full bg-white/10" />

      <Copyrights />
    </footer>
  );
}
