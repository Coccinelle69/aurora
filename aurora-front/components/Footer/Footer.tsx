"use client";

import Link from "next/link";
import {
  AddressIcon,
  FacebookIcon,
  InstagramIcon,
  MoonIcon,
  SunIcon,
} from "@/icons";
import Copyrights from "./Copyrights";
import { useTranslation } from "react-i18next";
import { useTime, useOpenMeteo, useDirections } from "@/utils/hooks";

export default function Footer() {
  const { t } = useTranslation();

  const { time } = useTime();
  const { temperature, isDayCode, windspeed, weather } = useOpenMeteo();
  const { getDirections } = useDirections();

  console.log(weather);

  return (
    <footer className="bg-babyBlue text-white">
      {/* Top content */}
      <div
        className="
          mx-auto w-full max-w-6xl px-6 py-16
          grid grid-cols-1 gap-12 md:grid-cols-4
          text-center md:text-left
          md:items-start     /* align items to start on md+ */
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
              <p className="text-md font-semibold">{t("footer-phone")}:</p>
              <Link
                href="tel:+385921385595"
                className="mt-1 inline-flex items-center gap-2 hover:underline"
              >
                +385 92138 5595
              </Link>
            </div>

            <div>
              <p className="text-md font-semibold">{t("footer-email")}:</p>
              <Link
                href="mailto:dorotea0105@gmail.com"
                className="mt-1 inline-flex items-center gap-2 hover:underline"
              >
                dorotea0105@gmail.com
              </Link>
            </div>
          </div>
        </div>

        {/* Contact / Social */}
        <div className="w-full flex flex-col items-center md:items-start">
          <h3 className="font-heading text-2xl font-semibold tracking-wide mb-6">
            {t("footer-contact")}
          </h3>
          <p className="text-md font-semibold">{t("footer-followUs")}</p>
          <p className="text-md opacity-90 mb-4">{t("footer-onSocial")}</p>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <Link
              aria-label="Facebook"
              href="#"
              className="h-10 w-10 grid place-items-center rounded-full text-[#17364e] hover:opacity-90"
            >
              <FacebookIcon size={25} />
            </Link>
            <Link
              aria-label="Instagram"
              href="#"
              className="h-10 w-10 grid place-items-center rounded-full text-[#17364e] hover:opacity-90"
            >
              <InstagramIcon size={25} />
            </Link>
          </div>
        </div>

        {/* Location / CTA */}
        {/* If you want this visible from md and up, use hidden md:flex. 
           Your previous sm:hidden lg:flex hides it on md (768–1023px) which can create odd gaps. */}
        <div className="flex w-full flex-col items-center md:items-start">
          <h3 className="font-heading text-2xl font-semibold tracking-wide mb-6">
            {t("footer-location")}
          </h3>
          <div>
            <p className="text-md font-semibold">{t("footer-googleMaps")}: </p>
            <div className="my-2 px-1 flex items-center hover:scale-110 transition-transform duration-300 ease-out  hover:border rounded-xl focus:border rounded-xl active:border rounded-xl">
              <AddressIcon size={32} />
              <button
                onClick={getDirections}
                className="rounded-xl px-2 py-3  hover:opacity-90"
              >
                {t("footer-getDirections")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[2px] w-full bg-white/10" />

      <Copyrights />
    </footer>
  );
}
