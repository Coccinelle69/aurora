"use client";

import { useTranslation } from "react-i18next";

interface PriceListProps {
  price?: null | number | string;
  sign?: string;
}

const PriceList = ({ price = 0, sign = "€" }: PriceListProps) => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
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
          <tr>
            <td className="p-3 border">15/05 – 31/05</td>
            <td className="p-3 border">5</td>
            <td className="p-3 border">
              <div className="flex items-center justify-center gap-1 leading-none">
                <span className="text-[16px]">{sign}</span>
                <span className="text-[16px]">90</span>
              </div>
            </td>
            <td className="p-3 border">7</td>
          </tr>

          <tr className="bg-gray-50">
            <td className="p-3 border">01/06 – 30/06</td>
            <td className="p-3 border">5</td>
            <td className="p-3 border">
              <div className="flex items-center justify-center gap-1 leading-none">
                <span className="text-[16px]">{sign}</span>
                <span className="text-[16px]">105</span>
              </div>
            </td>
            <td className="p-3 border">7</td>
          </tr>

          <tr>
            <td className="p-3 border">01/07 – 31/08</td>
            <td className="p-3 border">5</td>
            <td className="p-3 border">
              <div className="flex items-center justify-center gap-1 leading-none">
                <span className="text-[16px]">{sign}</span>
                <span className="text-[16px]">120</span>
              </div>
            </td>
            <td className="p-3 border">7</td>
          </tr>

          <tr className="bg-gray-50">
            <td className="p-3 border">01/09 – 15/09</td>
            <td className="p-3 border">5</td>
            <td className="p-3 border">
              <div className="flex items-center justify-center gap-1 leading-none">
                <span className="text-[16px]">{sign}</span>
                <span className="text-[16px]">105</span>
              </div>
            </td>
            <td className="p-3 border">7</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PriceList;
