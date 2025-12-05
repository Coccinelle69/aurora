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

  const rate = priceData?.rate;
  const preSeason = formatPriceUniversal(90 * rate! || 90, i18next.language);
  const lowSeason = formatPriceUniversal(105 * rate! || 105, i18next.language);
  const highSeason = formatPriceUniversal(120 * rate! || 120, i18next.language);

  const prices = [preSeason, lowSeason, highSeason, lowSeason];

  const periods = [
    "15/05 – 31/05",
    "01/06 – 30/06",
    "01/07 – 31/08",
    "01/09 – 15/09",
  ];

  return (
    <div className="w-full max-w-4xl mt-[3rem]">
      {/* Header */}
      <div className="bg-gray-300 text-gray-800 font-semibold px-4 py-3 rounded-t-lg">
        {t("regularPriceList")}
      </div>

      <table className="w-full border-collapse">
        {/* Column titles */}
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm">
            <th className="p-3 border">{t("period")}</th>
            <th className="p-3 border">{t("maxGuests")}</th>
            <th className="p-3 border">{t("price")}</th>
            <th className="p-3 border">{t("minimumStayTitle")} </th>
          </tr>
        </thead>

        {/* Rows */}
        <tbody className="text-center text-gray-800">
          {periods.map((p, i) => {
            return (
              <tr key={i}>
                <td className="p-3 border">{p}</td>
                <td className="p-3 border">{guestNumber}</td>
                <td className="p-3 border">
                  <div className="flex items-center justify-center gap-1 leading-none">
                    <span className="text-[16px]">{sign}</span>
                    <span className="text-[16px]">{prices[i]}</span>
                  </div>
                </td>
                <td className="p-3 border">{minimumStay}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PriceList;
