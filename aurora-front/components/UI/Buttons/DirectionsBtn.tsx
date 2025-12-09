"use client";

import { AddressIcon } from "@/icons";
import { useDirections } from "@/utils/hooks";
import { useTranslation } from "react-i18next";

const DirectionsButton = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const { getDirections } = useDirections();
  return (
    <>
      <p className={`${className}`}>{t("googleMaps")}: </p>

      <div className="my-2 px-2 flex items-center w-[12rem] hover:scale-110 transition-transform duration-300 ease-out  hover:border rounded-xl focus:border rounded-xl active:border rounded-xl">
        <AddressIcon size={32} />
        <button
          onClick={getDirections}
          className="rounded-xl px-2 py-3  hover:opacity-90"
        >
          {t("getDirections")}
        </button>
      </div>
    </>
  );
};

export default DirectionsButton;
