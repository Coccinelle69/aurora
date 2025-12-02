"use client";
import * as houseRules from "@/assets/rules";
import { memo } from "react";
import { Icon } from "../UI/Icon";
import { useTranslation } from "react-i18next";
import { colors } from "@/utils/ui/colors";
const HouseRules = () => {
  const rules = Object.values(houseRules);
  const { t } = useTranslation();
  const titles = [
    t("noPets"),
    t("noSmoking"),
    t("noParties"),
    t("suitableForChildren"),
    t("suitableForInfants"),
  ];

  return (
    <div className="border-top">
      <p className="details-title pt-[1rem]">{t("houseRules")}</p>
      <div className="pt-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
          {rules.map((rule, i) => {
            const src = rule.src;
            const props = {
              color: colors.babyBlue,
              size: 50,
            };
            const alt = rule.src.substring(20).split(".")[0];
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

export default memo(HouseRules);
