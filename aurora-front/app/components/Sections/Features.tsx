"use client";

import { Quintessential } from "next/font/google";
import {
  BarbecueIcon,
  BlanketIcon,
  FamilyIcon,
  FreeParkingIcon,
  OceanIcon,
  WifiIcon,
} from "../../icons";
import { useTranslation } from "react-i18next";
const titleFont = Quintessential({ subsets: ["latin"], weight: "400" });

type Feature = {
  title: string;
  text: string;
  icon: React.ReactNode;
};

export default function Features() {
  const { t } = useTranslation();

  const features: Feature[] = [
    {
      title: `${t("parking")}`,
      text: `${t("parking-p")}`,
      icon: <FreeParkingIcon color="#4a6ca3" />,
    },
    {
      title: `${t("wifi")}`,
      text: `${t("wifi-p")}`,
      icon: <WifiIcon color="#4a6ca3" />,
    },
    {
      title: `${t("view")}`,
      text: `${t("view-p")}`,
      icon: <OceanIcon color="#4a6ca3" />,
    },
    {
      title: `${t("family")}`,
      text: `${t("family-p")}`,
      icon: <FamilyIcon color="#4a6ca3" />,
    },
    {
      title: `${t("linens")}`,
      text: `${t("linens-p")}`,
      icon: <BlanketIcon color="#4a6ca3" />,
    },
    {
      title: `${t("barbecue")}`,
      text: `${t("barbecue-p")}`,
      icon: <BarbecueIcon color="#4a6ca3" />,
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12">
        {/* Left: features list */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 gap-y-14 sm:grid-cols-2 sm:gap-x-12">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="shrink-0">{f.icon}</div>
                <div>
                  <h3
                    className={`${titleFont.className} text-xl text-[#11344b]`}
                  >
                    {f.title}
                  </h3>
                  <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                    {f.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: navy panel */}
        <div className="lg:col-span-5">
          <div className="bg-[#11344b] px-10 py-12 text-center text-white shadow-md">
            <h2 className={`${titleFont.className} text-2xl md:text-3xl`}>
              {t("facilities-h2")}
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed opacity-90">
              {t("facilities-p")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
