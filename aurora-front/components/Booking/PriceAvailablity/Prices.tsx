"use client";

import { formatPriceUniversal } from "@/utils/format";
import { useCurrency } from "@/utils/hooks";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const PriceList = () => {
  const { t } = useTranslation();
  const { priceData, sign } = useCurrency({
    from: "2026-05-15",
    to: "2026-09-15",
  });

  const guestNumber = 5;
  const minimumStay = 7;
  const rate = priceData?.rate ?? 1;

  const prices = [
    formatPriceUniversal(90 * rate, i18next.language),
    formatPriceUniversal(105 * rate, i18next.language),
    formatPriceUniversal(120 * rate, i18next.language),
    formatPriceUniversal(105 * rate, i18next.language),
  ];

  const periods = [
    "15/05 – 31/05",
    "01/06 – 30/06",
    "01/07 – 31/08",
    "01/09 – 15/09",
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 px-3 sm:px-0">
      {/* Header */}
      <div className="bg-gray-300 text-gray-800 font-semibold px-4 py-3 rounded-t-lg">
        {t("regularPriceList")}
      </div>

      {/* DESKTOP / TABLET TABLE */}
      <div className="hidden sm:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="p-3 border">{t("period")}</th>
              <th className="p-3 border">{t("maxGuests")}</th>
              <th className="p-3 border">{t("price")}</th>
              <th className="p-3 border">{t("minimumStayTitle")}</th>
            </tr>
          </thead>

          <tbody className="text-center text-gray-800">
            {periods.map((period, i) => (
              <tr key={i}>
                <td className="p-3 border">{period}</td>
                <td className="p-3 border">{guestNumber}</td>
                <td className="p-3 border">
                  <div className="flex items-center justify-center gap-1">
                    <span>{sign}</span>
                    <span>{prices[i]}</span>
                  </div>
                </td>
                <td className="p-3 border">{minimumStay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE */}
      <div className="sm:hidden space-y-4">
        {periods.map((period, i) => (
          <div
            key={i}
            className="rounded-lg border bg-white shadow-sm p-4 text-gray-800"
          >
            <div className="flex justify-between items-center font-semibold">
              <span>{t("period")}</span>
              <span>{period}</span>
            </div>

            <div className="flex justify-between mt-2">
              <span>{t("maxGuests")}</span>
              <span>{guestNumber}</span>
            </div>

            <div className="flex justify-between mt-2 text-lg font-bold">
              <span>{t("price")}</span>
              <span>
                {sign}
                {prices[i]}
              </span>
            </div>

            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>{t("minimumStayTitle")}</span>
              <span>{minimumStay}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceList;
