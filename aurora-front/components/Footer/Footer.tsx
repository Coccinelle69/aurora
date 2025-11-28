"use client";

import { MoonIcon, SunIcon } from "@/icons";
import { useTranslation } from "react-i18next";
import { useTime, useOpenMeteo } from "@/utils/hooks";
import DirectionsButton from "../UI/DirectionsBtn";
import { Copyrights, Socials, Email, Phone } from "../index";

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
          grid grid-cols-1 gap-12 md:grid-cols-4
          text-center md:text-left
          md:items-start    
        "
      >
        {/* Weather & Time */}
        <div className="w-full flex flex-col items-center md:items-start">
          <h3 className="font-heading text-2xl font-body font-semibold tracking-wide mb-6">
            {t("footer-timeWeather")}
          </h3>
          <div className="space-y-2 ">
            <p className="text-md font-semibold   flex justify-center items-center gap-1 md:justify-start">
              <span>
                {t("footer-time")}: {time}
              </span>
              {isDayCode ? <SunIcon size={22} /> : <MoonIcon size={22} />}
            </p>
            <p className="text-md font-semibold ">
              {t("footer-weather")}: <span>{t(`${weather?.description}`)}</span>
            </p>
            <p className="flex justify-center">
              <span>{weather?.icon}</span>
            </p>
            <p className="text-md font-semibold">
              {t("footer-temperature")}: <span>{temperature}</span>°C
            </p>

            <p className="text-md font-semibold">
              {t("footer-windspeed")}: <span>{windspeed}</span>km/h
            </p>
          </div>
        </div>

        {/* Find us */}
        <div className="w-full flex flex-col items-center md:items-start">
          <h3 className="font-heading text-2xl font-semibold tracking-wide mb-6">
            {t("footer-findUs")}
          </h3>
          <div className="space-y-6">
            <div>
              <Phone className="text-md font-semibold" />
            </div>

            <div>
              <Email className="text-md font-semibold" />
            </div>
          </div>
        </div>

        {/* Contact / Social */}
        <div className="w-full flex flex-col items-center md:items-start">
          <h3 className="font-heading text-2xl font-semibold tracking-wide mb-6">
            {t("contact")}
          </h3>
          <Socials className="text-md font-semibold" />
        </div>

        {/* Location / CTA */}
        {/* If you want this visible from md and up, use hidden md:flex. 
           Your previous sm:hidden lg:flex hides it on md (768–1023px) which can create odd gaps. */}
        <div className="flex w-full flex-col items-center md:items-start">
          <h3 className="font-heading text-2xl font-semibold tracking-wide mb-6">
            {t("footer-location")}
          </h3>
          <div>
            <DirectionsButton className="text-md font-semibold" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[2px] w-full bg-white/10" />

      <Copyrights />
    </footer>
  );
}
