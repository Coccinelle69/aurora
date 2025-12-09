"use client";
import { useAppSelector } from "@/store/hooks";
import { formatDateNoYear, formatPriceUniversal } from "@/utils/format";
import { useCurrency } from "@/utils/hooks";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const PriceBreakdown = () => {
  const { arrival: from, departure: to } = useAppSelector(
    (state) => state.search
  );
  const { priceData, sign } = useCurrency({ from, to });
  const { t } = useTranslation();

  console.log(priceData);

  if (!priceData) {
    return null;
  }

  const fromDates = priceData?.fromDates ?? [];
  const fromDateStart = fromDates?.[0] ?? "";
  const fromDateEnd = fromDates?.[1] ?? "";

  const toDates = priceData?.toDates ?? [];
  const toDateStart = toDates?.[0] ?? "";
  const toDateEnd = toDates?.[1] ?? "";

  const fromPrice = formatPriceUniversal(
    priceData?.fromPrice,
    i18next.language
  );
  const fromNights = priceData?.fromNights;
  const fromTotalPrice = formatPriceUniversal(
    priceData?.fromTotalPrice,
    i18next.language
  );
  const fromDateStartEndFormatted = formatDateNoYear({
    from: fromDateStart,
    to: fromDateEnd,
    locale: i18next.language,
  });

  const toPrice = formatPriceUniversal(priceData?.toPrice, i18next.language);
  const toNights = priceData?.toNights;
  const toTotalPrice = formatPriceUniversal(
    priceData?.toTotalPrice,
    i18next.language
  );
  const toDateStartEndFormatted = formatDateNoYear({
    from: toDateStart,
    to: toDateEnd,
    locale: i18next.language,
  });

  const price = formatPriceUniversal(priceData?.price, i18next.language);
  const totalNights = priceData?.totalNights;
  const totalPrice = formatPriceUniversal(priceData?.total, i18next.language);
  const dateStartEndFormatted = formatDateNoYear({
    from,
    to,
    locale: i18next.language,
  });

  return (
    <div>
      {/* PRICE DETAILS */}
      <div className="text-sm text-gray-700 border-b pb-3 space-y-2">
        <div className="flex justify-between">
          <span className="font-medium underline font-semibold text-default">
            {t("priceBreakdown")}
          </span>
        </div>

        {fromDates.length > 0 && (
          <div>
            <div className="flex justify-between">
              <span className="font-medium">
                {fromDateStartEndFormatted.arrival.split(",")[0]} –{" "}
                {fromDateStartEndFormatted.departure.split(",")[0]}
              </span>
              <span className="font-medium -translate-x-[5px]">
                {fromNights} {t("nights")} × {sign} {fromPrice}
              </span>
              <span className="font-medium">
                {sign} {fromTotalPrice}
              </span>
            </div>
            <div className="flex justify-between">
              {toDateStartEndFormatted.arrival.split(",")[0]} –{" "}
              {toDateStartEndFormatted.departure.split(",")[0]}
              <span className="font-medium">
                {toNights} {t("nights")} × {sign} {toPrice}
              </span>
              <span className="font-medium">
                {sign} {toTotalPrice}
              </span>
            </div>
          </div>
        )}

        {fromDates.length === 0 && (
          <div>
            <div className="flex justify-between">
              <span className="font-medium">
                {dateStartEndFormatted.arrival.split(",")[0]} –{" "}
                {dateStartEndFormatted.departure.split(",")[0]}
              </span>
              <span className="font-medium">
                {totalNights} {t("nights")} × {sign} {price}
              </span>
              <span className="font-medium">
                {sign} {totalPrice}
              </span>
            </div>
          </div>
        )}

        {/* TAXES */}
        <div className="flex justify-between">
          <span className="font-medium">{t("taxes")}</span>
          <span>{t("includedInPrice")}</span>
        </div>

        {/* CLEANING FEE */}
        <div className="flex justify-between">
          <span className="font-medium">{t("cleaningFee")}</span>
          <span>{t("includedInPrice")}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;
