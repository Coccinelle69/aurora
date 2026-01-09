"use client";

import { MoonIcon, SunIcon } from "@/icons";
import { useTranslation } from "react-i18next";
import { useTime, useOpenMeteo } from "@/utils/hooks";

export default function FooterWeather() {
  const { t } = useTranslation();

  const { time } = useTime();
  const { temperature, isDayCode, windspeed, weather } = useOpenMeteo();

  return (
    <div
      className="w-full flex flex-col items-center lg:items-start"
      role="region"
      aria-labelledby="footer-time-weather"
    >
      <h3
        id="footer-time-weather"
        className="font-heading text-2xl font-semibold tracking-wide mb-6"
      >
        {t("footer-timeWeather")}
      </h3>
      <div className="space-y-2">
        <p className="footer-title" aria-live="polite">
          <span>
            {t("footer-time")}: {time}
          </span>
          {isDayCode ? (
            <SunIcon size={22} aria-hidden="true" />
          ) : (
            <MoonIcon size={22} aria-hidden="true" />
          )}
        </p>
        <p className="footer-title">
          {t("footer-weather")}: <span>{t(`${weather?.description}`)}</span>
        </p>
        <p className="flex justify-center">
          <span aria-hidden="true">{weather?.icon}</span>
        </p>
        <p className="footer-title">
          {t("footer-temperature")}: <span>{temperature}</span>°C
        </p>

        <p className="footer-title">
          {t("footer-windspeed")}: <span>{windspeed}</span>km/h
        </p>
      </div>
    </div>
  );
}
