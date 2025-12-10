"use client";

import { CalendarIcon, EuroIcon } from "@/icons";
import { useEffect, useRef } from "react";
import { AvailabilityCalendar, Prices } from "@/components";
import { closeModal, openModal } from "@/reducers/modal";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";

const PriceAvailability = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const activeTab = useAppSelector((state) => state.modal.tab);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        dispatch(closeModal());
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(closeModal());
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto sm:overflow-hidden">
      <div className="absolute  inset-0 bg-black/80"></div>
      <div
        ref={ref}
        className="relative w-full sm:w-[50%] h-auto sm:max-h-[900px] bg-[#f5f5f5] p-8 sm:rounded-3xl flex flex-col gap-6 mx-auto my-auto "
      >
        <div className="visible sm:hidden text-default font-bold flex justify-end">
          <span
            onClick={() => dispatch(closeModal())}
            className="scale-[1.5] active:scale-[1.3]"
          >
            X
          </span>
        </div>
        <div className="flex flex-row items-center justify-between w-full sm:w-[60%] mx-auto">
          <div
            onClick={() => dispatch(openModal("availability"))}
            className={`tab duration-300 ease-out hover:border-default ${
              activeTab === "availability"
                ? "border-[#11344b]"
                : "border-[#D1DBE3]"
            }`}
          >
            <CalendarIcon size={20} color="#11344b" />
            <span>{t("availability")}</span>
          </div>
          <div
            onClick={() => dispatch(openModal("prices"))}
            className={`tab duration-300 ease-out hover:border-default ${
              activeTab === "prices" ? "border-[#11344b]" : "border-[#D1DBE3]"
            }`}
          >
            <EuroIcon size={20} color="#11344b" />
            <span>{t("priceList")}</span>
          </div>
        </div>

        {activeTab === "availability" && <AvailabilityCalendar />}
        {activeTab === "prices" && <Prices />}
      </div>
    </div>,
    document.body
  );
};

export default PriceAvailability;
