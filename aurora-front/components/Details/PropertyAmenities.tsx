"use client";
import * as houseAmenities from "@/assets/amenities";
import { memo } from "react";
import { Icon } from "../UI/Icon";
import { useTranslation } from "react-i18next";
import { colors } from "@/utils/ui/colors";

const PropertyAmenities = () => {
  const amenities = Object.values(houseAmenities);
  const { t } = useTranslation();
  const titles = [
    t("houseAmenities.airConditioner"),
    t("houseAmenities.backyard"),
    t("houseAmenities.coffeeMachine"),
    t("houseAmenities.cookware"),
    t("houseAmenities.crib"),
    t("houseAmenities.dishwasher"),
    t("houseAmenities.disney"),
    t("houseAmenities.fireExtinguisher"),
    t("houseAmenities.firstAidKit"),
    t("houseAmenities.fridge"),
    t("houseAmenities.gasStove"),
    t("houseAmenities.hairdryer"),
    t("houseAmenities.handSanitizer"),
    t("houseAmenities.hanger"),
    t("houseAmenities.highChair"),
    t("houseAmenities.iron"),
    t("houseAmenities.kettle"),
    t("houseAmenities.laundryMachine"),
    t("houseAmenities.luggage"),
    t("houseAmenities.netflix"),
    t("houseAmenities.safe"),
    t("houseAmenities.shampoo"),
    t("houseAmenities.silverware"),
    t("houseAmenities.familyFriendly"),
    t("houseAmenities.toaster"),
    t("houseAmenities.towels"),
  ];

  return (
    <div className="border-top">
      <p className="details-title pt-[1rem]">{t("amenities")}</p>
      <div className="pt-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-center">
          {amenities.map((amenity, i) => {
            const src = amenity.src;
            const props = {
              color: colors.babyBlue,
              size: 35,
            };
            const alt = amenity.src.substring(20).split(".")[0];
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

export default memo(PropertyAmenities);
