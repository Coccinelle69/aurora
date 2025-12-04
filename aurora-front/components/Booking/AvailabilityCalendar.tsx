"use client";

import { useState, useMemo } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

type Range = { start: string; end: string };

const monthsAhead = 24;
const weekdayFormat = "short";

interface CalendarProps {
  unavailable: Range[];
}

function eachDay(start: Date, end: Date): string[] {
  const arr: string[] = [];
  const d = new Date(start);
  while (d <= end) {
    arr.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + 1);
  }
  return arr;
}

export default function AvailabilityCalendar({ unavailable }: CalendarProps) {
  const today = new Date();
  const { t } = useTranslation();

  const [page, setPage] = useState(0); // each page = 4 months
  const totalPages = Math.ceil(monthsAhead / 4);

  // Build list of months from current month → +24 months
  const allMonths = Array.from({ length: monthsAhead }, (_, i) => {
    return new Date(today.getFullYear(), today.getMonth() + i, 1);
  });

  // Current visible block
  const visibleMonths = allMonths.slice(page * 4, page * 4 + 4);

  // Convert unavailable ranges → Set of yyyy-mm-dd
  const unavailableSet = useMemo(() => {
    const set = new Set<string>();
    for (const r of unavailable) {
      const start = new Date(r.start);
      const end = new Date(r.end);
      for (const d of eachDay(start, end)) {
        set.add(d);
      }
    }
    return set;
  }, [unavailable]);

  const isUnavailable = (date: Date) =>
    unavailableSet.has(date.toISOString().slice(0, 10));

  // ✅ CORRECT WEEKDAY LABELS — always Monday → Sunday
  const weekdayLabels = Array.from({ length: 7 }, (_, i) => {
    const base = new Date(2025, 0, 6 + i); // 6 Jan 2025 = Monday
    return base.toLocaleDateString(i18next.language, {
      weekday: weekdayFormat,
    });
  });

  return (
    <div className="w-full bg-[#f5f5f5] rounded-3xl flex flex-col gap-6">
      {/* Navigation */}
      <div className="flex justify-center gap-3 px-2">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
          className="w-10 h-10 rounded-full border border-default text-default flex items-center justify-center
            hover:bg-white disabled:opacity-20 disabled:hover:bg-transparent"
        >
          ‹
        </button>

        <button
          disabled={page >= totalPages - 1}
          onClick={() => setPage((p) => p + 1)}
          className="w-10 h-10 rounded-full border border-default text-default flex items-center justify-center
            hover:bg-white disabled:opacity-20 disabled:hover:bg-transparent"
        >
          ›
        </button>
      </div>

      {/* 4-month grid */}
      <div className="grid grid-cols-1 w-[90%] mx-auto md:grid-cols-2 gap-6">
        {visibleMonths.map((month) => {
          const year = month.getFullYear();
          const m = month.getMonth();

          const first = new Date(year, m, 1);

          // ✅ PERFECT MONDAY-FIRST OFFSET
          // JS: Sunday=0, Monday=1 → convert to Monday=0 ... Sunday=6
          const startIndex = (first.getDay() + 6) % 7;

          const daysInMonth = new Date(year, m + 1, 0).getDate();

          const days: (Date | null)[] = [];
          for (let i = 0; i < startIndex; i++) days.push(null);
          for (let d = 1; d <= daysInMonth; d++)
            days.push(new Date(year, m, d));

          const label = month.toLocaleDateString(i18next.language, {
            month: "long",
            year: "numeric",
          });

          return (
            <div
              key={label}
              className="bg-white h-[310px] p-4 rounded-3xl shadow-sm"
            >
              <h3 className="font-semibold text-default capitalize mb-4 text-lg">
                {label}
              </h3>

              {/* Weekday header */}
              <div className="grid grid-cols-7 mb-2 text-xs text-gray-400">
                {weekdayLabels.map((w, idx) => (
                  <div className="text-center" key={idx}>
                    {w}
                  </div>
                ))}
              </div>

              {/* Day grid */}
              <div className="grid grid-cols-7 gap-y-1 text-sm">
                {days.map((date, i) => {
                  if (!date) return <div key={i} />;

                  const unavailable = isUnavailable(date);

                  return (
                    <div
                      key={date.toISOString()}
                      className={[
                        "h-8 flex items-center justify-center rounded-xl",
                        unavailable
                          ? "bg-red-100 text-red-700"
                          : "text-gray-800",
                      ].join(" ")}
                    >
                      {date.getDate()}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full border border-[#9FB1C5]"></span>
          <span className="text-default">{t("availableDates")}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-200"></span>
          <span className="text-default">{t("unavailableDates")}</span>
        </div>
      </div>
    </div>
  );
}
