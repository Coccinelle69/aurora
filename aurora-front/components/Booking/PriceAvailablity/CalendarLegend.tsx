"use client";

import { useTranslation } from "react-i18next";

const CalendarLegend = () => {
  const { t } = useTranslation();
  const labels = [t("availableDates"), t("unavailableDates"), t("outOfSeason")];
  const styles = ["border border-[#9FB1C5]", "bg-red-200", "bg-gray-300"];

  return (
    <div className="flex gap-6 text-sm">
      {labels.map((label, i) => {
        return (
          <div key={i} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${styles[i]}`}></span>
            <span className="text-default">{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarLegend;
