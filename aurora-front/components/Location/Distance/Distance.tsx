"use client";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

type DistanceItem = {
  icon: ReactNode;
  label: string;
  value: string;
};

type DistancesProps = {
  title?: string;
  items: DistanceItem[];
};

export default function Distance({ items }: DistancesProps) {
  const { t } = useTranslation();

  return (
    <section className="border-t border-gray-200 bg-white min-h-[200px]">
      <div className="mx-auto w-full max-w-5xl px-4 py-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 font-body">
          {t("distances.title")}
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 divide-y divide-gray-200 sm:w-[80%] sm:mx-auto  xl:w-full xl:mx-0">
          {items.map(({ icon, label, value }, i) => (
            <li key={i} className="flex items-center gap-3 py-3 min-h-14">
              <span className="shrink-0 text-gray-700 w-8 h-8">{icon}</span>
              <span className="flex-1 text-gray-800 font-body">{label}</span>
              <span className="shrink-0 text-gray-900 font-body">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
