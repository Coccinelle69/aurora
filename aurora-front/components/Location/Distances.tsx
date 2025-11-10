// components/Location/Distances.tsx
"use client";
import { ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";

type DistanceItem = { icon: ReactNode; label: string; value: string };

type ColumnProps = { data: DistanceItem[] };
function DistancesColumn({ data }: ColumnProps) {
  return (
    <ul className="divide-y divide-gray-200">
      {data.map(({ icon, label, value }, i) => (
        <li key={i} className="flex items-center gap-3 py-3">
          <span className="shrink-0 text-gray-700">{icon}</span>
          <span className="flex-1 text-gray-800">{label}</span>
          <span className="shrink-0 text-gray-900">{value}</span>
        </li>
      ))}
    </ul>
  );
}

type DistancesProps = { title?: string; items: DistanceItem[] };

export default function Distances({ items }: DistancesProps) {
  // (optional) keep the split stable between renders
  const [left, right] = useMemo(() => {
    const l: DistanceItem[] = [];
    const r: DistanceItem[] = [];
    items.forEach((it, i) => (i % 2 === 0 ? l : r).push(it));
    return [l, r];
  }, [items]);

  const { t } = useTranslation();

  return (
    <section className="border-t border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          {t("distances.title")}
        </h2>

        <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
          <DistancesColumn data={left} />
          <DistancesColumn data={right} />
        </div>
      </div>
    </section>
  );
}
