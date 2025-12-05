"use client";
import * as houseAmenities from "@/assets/amenities";
import { memo, useMemo, useRef, useState } from "react";
import { Icon } from "../../UI/Icon";
import { useTranslation } from "react-i18next";
import { colors } from "@/utils/ui/colors";
import { AnimatePresence, motion } from "framer-motion";

const PropertyAmenities = () => {
  const amenities = useMemo(() => Object.values(houseAmenities), []);
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);
  const titles = useMemo(
    () => [
      t("houseAmenities.airConditioner"),
      t("houseAmenities.backyard"),
      t("houseAmenities.handSanitizer"),
      t("houseAmenities.coffeeMachine"),
      t("houseAmenities.cookware"),
      t("houseAmenities.crib"),
      t("houseAmenities.dishwasher"),
      t("houseAmenities.disney"),
      t("houseAmenities.familyFriendly"),
      t("houseAmenities.fireExtinguisher"),
      t("houseAmenities.firstAidKit"),
      t("houseAmenities.fridge"),
      t("houseAmenities.hairdryer"),
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
      t("houseAmenities.stove"),
      t("houseAmenities.toaster"),
      t("houseAmenities.towels"),
    ],
    [t]
  );

  const amenitiesToDisplay = amenities.slice(0, visibleCount);

  const handleToggle = () => {
    if (!containerRef.current) return;

    const top =
      containerRef.current.getBoundingClientRect().top + window.scrollY;

    setVisibleCount((prev) => (prev === 4 ? amenities.length : 4));

    setTimeout(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo({
          top,
          behavior: "smooth",
        });
      });
    }, 50);
  };

  return (
    <div className="border-top" ref={containerRef}>
      <p className="details-title pt-[1rem]">{t("amenities")}</p>
      <div className="pt-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-center">
          <AnimatePresence>
            {amenitiesToDisplay.map((amenity, i) => {
              const src = amenity.src;
              const props = {
                color: colors.babyBlue,
                size: 35,
              };
              const alt = amenity.src.substring(20).split(".")[0];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center gap-2"
                >
                  <Icon src={src} alt={alt} {...props} />
                  <span>{titles[i]}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={handleToggle}
        className="font-semibold mt-5 text-[#27C2F5] px-2 py-3 rounded-2xl text-shadow-lg duration-400 ease-out hover:text-white hover:bg-white/30 active:text-white active:bg-white/30"
      >
        {visibleCount === 4 ? t("showMore") : t("showLess")}
      </button>
    </div>
  );
};

export default memo(PropertyAmenities);
