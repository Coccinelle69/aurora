"use client";

import {
  SurfaceIcon,
  PeopleIcon,
  BedIcon,
  OceanIcon,
  TerraceIcon,
} from "@/icons";
import { useTranslation } from "react-i18next";

export default function ApartmentFeatures() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <SurfaceIcon color="#4a6ca3" size={70} />,
      label: `${t("surface")}`,
    },
    { icon: <PeopleIcon color="#4a6ca3" size={70} />, label: `${t("guests")}` },
    { icon: <BedIcon color="#4a6ca3" size={70} />, label: `${t("beds")}` },
    { icon: <OceanIcon color="#4a6ca3" size={70} />, label: `${t("view")}` },
    {
      icon: <TerraceIcon color="#4a6ca3" size={70} />,
      label: `${t("terrace")}`,
    },
  ];
  return (
    <section className="border-t border-gray-200 bg-white">
      <div
        className="
          mx-0 flex flex-wrap justify-center items-center
          px-6 py-8 
          lg:px-10
          lg:divide-x-[2px] lg:divide-[#4a6ca3]
        "
      >
        {features.map(({ icon, label }, i) => (
          <div
            key={i}
            className="
              flex flex-col sm:flex-row items-center justify-center gap-3 text-center
              flex-1 min-w-[160px] py-4 mx-0
            "
          >
            {icon}
            <span className="text-lg font-medium text-[#4a6ca3] whitespace-nowrap">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
