"use client";
import * as houseFeatures from "@/assets/features";
import { memo, useMemo } from "react";
import { Icon } from "@/components";
import { useTranslation } from "react-i18next";
import { colors } from "@/utils/ui/colors";
const PropertyFeatures = () => {
  const features = useMemo(() => Object.values(houseFeatures), []);
  const { t } = useTranslation();
  const titles = useMemo(
    () => [
      t("houseAmenities.bedrooms"),
      t("houseAmenities.bathrooms"),
      t("houseAmenities.kitchens"),
      t("houseAmenities.kingSizeBed"),
      t("houseAmenities.singleBeds"),
      t("houseAmenities.pullOutCouch"),
    ],
    [t]
  );

  return (
    <div className="border-top">
      <p className="details-title pt-4">{t("propertyFeatures")}</p>
      <div className="pt-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 text-center">
          {features.map((feature, i) => {
            const src = feature.src;
            const props = {
              color: colors.babyBlue,
              size: 40,
            };
            const alt = feature.src.substring(20).split(".")[0];
            return (
              <div className="flex flex-col items-center gap-2" key={i}>
                <Icon src={src} alt={alt} {...props} />
                <span key={i}>{titles[i]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(PropertyFeatures);
