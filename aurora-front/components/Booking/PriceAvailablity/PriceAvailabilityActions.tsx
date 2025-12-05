"use client";
import { openModal } from "@/reducers/modal";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const PriceAvailabilityActions = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className="mx-auto">
      <button
        onClick={() => dispatch(openModal("availability"))}
        type="button"
        className="booking-btn"
      >
        {t("availability")}
      </button>
      <button
        onClick={() => dispatch(openModal("prices"))}
        type="button"
        className="booking-btn"
      >
        {t("priceList")}
      </button>
    </div>
  );
};

export default PriceAvailabilityActions;
