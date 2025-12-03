"use client";

import { useAppSelector } from "@/store/hooks";
import { formatDate, formatPriceUniversal } from "@/utils/format";
import { useCurrency } from "@/utils/hooks";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { CancellationPolicy } from "./CancellationPolicy";
import { useEffect } from "react";
import { finalPriceCalc } from "@/reducers/price";
import { useDispatch } from "react-redux";
import PriceBreakdown from "./PriceBreakdown";

const CheckoutCard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    arrival: from,
    departure: to,
    adults,
    teens,
    children,
  } = useAppSelector((state) => state.search);
  const { priceData, sign } = useCurrency({ from, to });
  // const { finalPrice } = useAppSelector((state) => state.price);
  const { value } = useAppSelector((state) => state.currency);

  const { arrival, departure, nights } = formatDate({
    from,
    to,
    locale: i18next.language,
  });
  const guests = +adults + +teens + +children;

  const price = priceData?.total ?? 0;

  useEffect(() => {
    if (price !== null) {
      dispatch(finalPriceCalc({ amount: price, sign, nights }));
    }
  }, [value, price]);
  const formattedPrice = formatPriceUniversal(price, i18next.language);

  return (
    <div className="w-full max-w-[560px] sm:w-[400px] mx-auto bg-white rounded-2xl shadow-lg border p-6 flex flex-col gap-4 sm:sticky sm:top-[25px] sm:self-start order-1 sm:order-2">
      {/* TITLE */}
      <h2 className="text-xl text-center font-semibold text-default leading-tight">
        {t("apartmentTitle")}
      </h2>

      {/* CHECK-IN / CHECK-OUT / NIGHTS / GUEST */}
      <div className="flex justify-between text-sm text-gray-600 border-b pb-3">
        <div>
          <p className="checkout-item-title">{t("checkIn")}</p>
          <p className="checkout-item">{arrival}</p>
        </div>
        <div>
          <p className="checkout-item-title">{t("checkOut")}</p>
          <p className="checkout-item">{departure}</p>
        </div>
        <div>
          <p className="checkout-item-title">{t("nights")}</p>
          <p className="checkout-item">
            {nights} {t("nights")}
          </p>
        </div>
        <div>
          <p className="checkout-item-title">
            {guests > 1 ? t("moreGuests") : t("oneGuest")}
          </p>
          <p className="checkout-item">{guests}</p>
        </div>
      </div>

      {/* CANCELLATION */}
      <CancellationPolicy />

      {/* COUPON */}
      <label className="flex items-center gap-2 text-sm text-gray-700 border-b pb-3 cursor-pointer">
        <input type="checkbox" className="w-4 h-4 rounded border-gray-400" />
        {t("iHaveCoupon")}
      </label>

      <PriceBreakdown />

      {/* TOTAL */}
      <div className="flex justify-between text-lg font-semibold  text-gray-900">
        <span className="text-default">{t("total")}</span>
        <span className="text-blue-700">
          {sign} {formattedPrice}
        </span>
      </div>

      {value !== "EUR" && (
        <p className="text-xs text-gray-700 text-center">
          {t("paymentCurrencyNote")}
        </p>
      )}

      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-3 pt-2">
        <button className="flex-1 bg-blue-500 text-white py-3 rounded-lg text-center font-medium hover:bg-blue-600 transition">
          {t("requestToBook")}
        </button>
      </div>
    </div>
  );
};

export default CheckoutCard;
