"use client";

import { MoonIcon, SunIcon } from "@/icons";
import { useTranslation } from "react-i18next";
import { useTime, useOpenMeteo } from "@/utils/hooks";
import {
  Copyrights,
  Socials,
  Email,
  Phone,
  DirectionsButton,
} from "@/components";

export default function Footer() {
  const { t } = useTranslation();

  const { time } = useTime();
  const { temperature, isDayCode, windspeed, weather } = useOpenMeteo();

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
        <div className="w-full flex flex-col items-center lg:items-start">
          <h3 className="font-heading text-2xl font-semibold tracking-wide mb-6">
            {t("footer-timeWeather")}
          </h3>
          <div className="space-y-2 ">
            <p className="footer-title">
              <span>
                {t("footer-time")}: {time}
              </span>
              {isDayCode ? <SunIcon size={22} /> : <MoonIcon size={22} />}
            </p>
            <p className="footer-title">
              {t("footer-weather")}: <span>{t(`${weather?.description}`)}</span>
            </p>
            <p className="flex justify-center">
              <span>{weather?.icon}</span>
            </p>
            <p className="footer-title">
              {t("footer-temperature")}: <span>{temperature}</span>°C
            </p>

            <p className="footer-title">
              {t("footer-windspeed")}: <span>{windspeed}</span>km/h
            </p>
          </div>
        </div>

        {/* Find us */}
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

        {/* Contact / Social */}
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
      <div className="h-[2px] w-full bg-white/10" />

      <Copyrights />
    </footer>
  );
}
