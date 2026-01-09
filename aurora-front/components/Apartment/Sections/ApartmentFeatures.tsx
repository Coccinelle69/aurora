"use client";

import {
  SurfaceIcon,
  PeopleIcon,
  BedIcon,
  OceanIcon,
  TerraceIcon,
} from "@/icons";
import { useDevice } from "@/utils/hooks";
import { useTranslation } from "react-i18next";

export default function ApartmentFeatures() {
  const { t } = useTranslation();
  const { xl } = useDevice();

  const features = [
    {
      icon: <SurfaceIcon color="#4a6ca3" size={!xl ? 50 : 70} />,
      label: `${t("surface")}`,
    },
    {
      icon: <PeopleIcon color="#4a6ca3" size={!xl ? 50 : 70} />,
      label: `${t("guests")}`,
    },
    {
      icon: <BedIcon color="#4a6ca3" size={!xl ? 50 : 70} />,
      label: `${t("beds")}`,
    },
    {
      icon: <OceanIcon color="#4a6ca3" size={!xl ? 50 : 70} />,
      label: `${t("view")}`,
    },
    {
      icon: <TerraceIcon color="#4a6ca3" size={!xl ? 50 : 70} />,
      label: `${t("terrace")}`,
    },
  ];
  return (
    <section
      className="border-t border-gray-200 bg-white"
      aria-label={t("apartment-features")}
    >
      <div
        className="
          mx-0 flex flex-wrap justify-center items-center
          px-6 py-8 
          lg:px-10
          lg:divide-x-2 lg:divide-babyBlue
        "
        role="list"
      >
        {features.map(({ icon, label }, i) => (
          <div
            key={i}
            className="
              flex flex-col 2xl:flex-row items-center justify-center gap-3 text-center
              flex-1 min-w-40 py-4 mx-0
            "
            role="listitem"
          >
            <span aria-hidden="true">{icon}</span>
            <span
              className={`${
                !xl ? "text-base" : "text-lg"
              } font-medium text-babyBlue whitespace-nowrap`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
