/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect } from "react";
import i18next from "i18next";
import { CalendarLegend } from "@/components";
import { useResponse } from "@/utils/hooks";

type Range = { start: string; end: string };

const monthsAhead = 24;
const weekdayFormat = "short";

function toLocalYMD(date: Date) {
  return date.toLocaleDateString("en-CA");
}

function eachDay(start: Date, end: Date): string[] {
  const arr: string[] = [];
  const d = new Date(start);

  while (d <= end) {
    arr.push(toLocalYMD(d)); // << FIX HERE
    d.setDate(d.getDate() + 1);
  }

  return arr;
}

export default function AvailabilityCalendar() {
  const today = new Date();

  const [page, setPage] = useState(0); // each page = 4 months
  const totalPages = Math.ceil(monthsAhead / 4);
  const [unavailable, setUnavailable] = useState<Range[]>([]);
  const [trigger, setTrigger] = useState(true);

  const { done, errorMessage, data, success } = useResponse({
    url: "/api/reservation/all",
    method: "GET",
    trigger,
  });

  useEffect(() => {
    console.log(data);
    if (success && data.reservations) {
      const ranges = data.reservations.map(
        (r: { arrivalDate: string; departureDate: string }) => {
          return {
            start: r.arrivalDate,
            end: r.departureDate,
          };
        }
      );
      console.log(ranges);

      Promise.resolve().then(() => setUnavailable(ranges));
    }

    if (done) Promise.resolve().then(() => setTrigger(false));
  }, [done]);

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
    console.log(set);

    return set;
  }, [unavailable]);

  const isUnavailable = (date: Date) => unavailableSet.has(toLocalYMD(date));

  // ✅ CORRECT WEEKDAY LABELS — always Monday → Sunday
  const weekdayLabels = Array.from({ length: 7 }, (_, i) => {
    const base = new Date(2025, 0, 6 + i); // 6 Jan 2025 = Monday
    return base.toLocaleDateString(i18next.language, {
      weekday: weekdayFormat,
    });
  });
  return (
    <div className="w-full bg-[#f5f5f5] rounded-3xl flex flex-col gap-6 ">
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
      <div className="grid grid-cols-1 w-[90%] mx-auto md:grid-cols-2 gap-6 ">
        {visibleMonths.map((month) => {
          const year = month.getFullYear();
          const m = month.getMonth();

          const first = new Date(year, m, 1);

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
              className="bg-white h-[310px] p-4 rounded-3xl shadow-sm "
            >
              <h3 className="font-semibold text-default capitalize mb-4 text-lg">
                {label}
              </h3>

              {/* Weekday header */}
              <div className="grid grid-cols-7 mb-2 text-xs text-gray-400">
                {weekdayLabels.map((w, i) => (
                  <div className="text-center" key={i}>
                    {w}
                  </div>
                ))}
              </div>

              {/* Day grid */}
              <div className="grid grid-cols-7 gap-y-1 text-sm">
                {days.map((date, i) => {
                  if (!date) return <div key={i} />;

                  const notAvailable = isUnavailable(date);

                  function pure(date: Date): Date {
                    return new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate()
                    );
                  }

                  function isSeasonal(date: Date): boolean {
                    const y = date.getFullYear();
                    const d = pure(date);
                    const start = new Date(y, 4, 15);
                    const end = new Date(y, 8, 30);

                    return d >= start && d <= end;
                  }

                  return (
                    <div
                      key={date.toISOString()}
                      className={[
                        "h-8 flex items-center justify-center rounded-xl",
                        notAvailable
                          ? "bg-red-100 text-red-700"
                          : isSeasonal(date)
                          ? " text-gray-500"
                          : "bg-gray-300 text-gray-500",
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
      <CalendarLegend />
    </div>
  );
}
