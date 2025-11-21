"use client";

import {
  BarbecueIcon,
  BlanketIcon,
  FamilyIcon,
  FreeParkingIcon,
  OceanIcon,
  WifiIcon,
} from "@/icons";
import { useTranslation } from "react-i18next";
import { colors } from "@/utils/ui/colors";

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
      icon: <FreeParkingIcon color={colors.babyBlue} />,
    },
    {
      title: `${t("wifi")}`,
      text: `${t("wifi-p")}`,
      icon: <WifiIcon color={colors.babyBlue} />,
    },
    {
      title: `${t("view")}`,
      text: `${t("view-p")}`,
      icon: <OceanIcon color={colors.babyBlue} />,
    },
    {
      title: `${t("family")}`,
      text: `${t("family-p")}`,
      icon: <FamilyIcon color={colors.babyBlue} />,
    },
    {
      title: `${t("linens")}`,
      text: `${t("linens-p")}`,
      icon: <BlanketIcon color={colors.babyBlue} />,
    },
    {
      title: `${t("barbecue")}`,
      text: `${t("barbecue-p")}`,
      icon: <BarbecueIcon color={colors.babyBlue} />,
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
                  <h3 className={"font-heading text-xl  text-marineBlue"}>
                    {f.title}
                  </h3>
                  <p className="mt-2 text-slate-600 leading-relaxed text-sm font-body">
                    {f.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: navy panel */}
        <div className="lg:col-span-5">
          <div className="bg-marineBlue px-10 py-12 text-center text-white shadow-md">
            <h2 className={`font-heading text-2xl md:text-3xl`}>
              {t("facilities-h2")}
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed opacity-90 font-body">
              {t("facilities-p")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
