"use client";

import { useAppSelector } from "@/store/hooks";
import { formatDate, formatPriceUniversal } from "@/utils/format";
import { useCurrency } from "@/utils/hooks";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { PriceBreakdown, Policy } from "@/components";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckoutProps } from "@/utils/interfaces";

const CheckoutCard = ({
  setCheckoutUI,
  checkoutUI,
  internalNavigationRef,
}: CheckoutProps) => {
  const { t } = useTranslation();

  const {
    arrival: from,
    departure: to,
    adults,
    teens,
    children,
  } = useAppSelector((state) => state.search);
  const { priceData, sign } = useCurrency({ from, to });
  const { value } = useAppSelector((state) => state.currency);

  const { arrival, departure } = formatDate({
    from,
    to,
    locale: i18next.language,
  });
  const guests = +adults + +teens + +children;

  const price = priceData?.total ?? 0;

  const formattedPrice = formatPriceUniversal(price, i18next.language);

  const nights = priceData?.totalNights;

  const goToCheckoutForm = () => {
    internalNavigationRef!.current = true;

    window.history.pushState({}, "", "/book/details/checkout");

    setCheckoutUI((prev) => {
      return { ...prev, changeUI: true };
    });
  };

  useEffect(() => {
    if (checkoutUI.changeUI) {
      const hideCheckoutCardTimer = setTimeout(() => {
        setCheckoutUI((prevUI) => {
          return {
            ...prevUI,
            checkoutCardRemove: true,
            checkoutFormRemove: false,
            changeUI: false,
          };
        });
      }, 1500);

      return () => {
        clearTimeout(hideCheckoutCardTimer);
      };
    }
  }, [checkoutUI.changeUI]);

  return (
    <AnimatePresence>
      {!checkoutUI.checkoutCardRemove && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={
            checkoutUI.changeUI && !checkoutUI.checkoutCardRemove
              ? { opacity: 0, y: -60 }
              : { opacity: 1, y: 60 }
          }
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full max-w-[560px] sm:w-[400px] md:w-120 lg:w-155 2xl:w-[480px] mx-auto bg-white rounded-2xl lg:sticky lg:top-px lg:self-start order-1 lg:order-2 shadow-lg border p-6 flex flex-col gap-4  "
        >
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
          <Policy policy="cancellation" />
          <Policy policy="payment" />

          {/* COUPON */}
          <label className="flex items-center gap-2 text-sm text-gray-700 border-b pb-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-400"
            />
            {t("iHaveCoupon")}
          </label>

          {/* BREAKDOWN */}
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
            <button
              onClick={goToCheckoutForm}
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg text-center font-medium hover:bg-blue-600 transition"
            >
              {t("requestToBook")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutCard;
