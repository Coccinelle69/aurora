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
import { useDevice } from "@/utils/hooks";

type Feature = {
  title: string;
  text: string;
  icon: React.ReactNode;
};

const Amenities = () => {
  const { t } = useTranslation();
  const mq = useDevice();
  const lg = !mq.xl;

  const features: Feature[] = [
    {
      title: `${t("parking")}`,
      text: `${t("parking-p")}`,
      icon: <FreeParkingIcon color={colors.babyBlue} size={lg ? 85 : 120} />,
    },
    {
      title: `${t("wifi")}`,
      text: `${t("wifi-p")}`,
      icon: <WifiIcon color={colors.babyBlue} size={lg ? 85 : 120} />,
    },
    {
      title: `${t("view")}`,
      text: `${t("view-p")}`,
      icon: <OceanIcon color={colors.babyBlue} size={lg ? 85 : 120} />,
    },
    {
      title: `${t("family")}`,
      text: `${t("family-p")}`,
      icon: <FamilyIcon color={colors.babyBlue} size={lg ? 85 : 120} />,
    },
    {
      title: `${t("linens")}`,
      text: `${t("linens-p")}`,
      icon: <BlanketIcon color={colors.babyBlue} size={lg ? 85 : 120} />,
    },
    {
      title: `${t("barbecue")}`,
      text: `${t("barbecue-p")}`,
      icon: <BarbecueIcon color={colors.babyBlue} size={lg ? 85 : 120} />,
    },
  ];
  return (
    <section className="w-full py-20">
      <h2 className="text-center text-6xl font-heading text-marineBlue mb-16">
        {t("amenities")}
      </h2>

      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          sm:gap-y-14 sm:gap-x-7 
          lg:gap-y-20 lg:gap-x-10 
          max-w-[1400px] 
          mx-auto 
          px-6
        "
      >
        {features.map((feature, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center max-w-[350px] mx-auto mb-5 sm:mb-0"
          >
            {feature.icon}

            <h3 className="mt-2 sm:mt-6 text-2xl font-heading text-marineBlue">
              {feature.title}
            </h3>

            <p className="mt-2 text-gray-600 text-sm leading-relaxed ">
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Amenities;
