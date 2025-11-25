"use client";

import { changeCurrency } from "@/reducers/currency";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

type Currency = {
  code: string;
  sign: string;
};

export const CURRENCIES: Currency[] = [
  { code: "EUR", sign: "€" },
  { code: "USD", sign: "$" },
  {
    code: "GBP",
    sign: "£",
  },
  { code: "PLN", sign: "zł" },
  // { code: "RUB", sign: "₽" },
  { code: "HUF", sign: "Ft" },
  { code: "CZK", sign: "Kč" },
  { code: "CNY", sign: "¥" },
];
type Props = { onChange?: (currency: Currency) => void };

export default function CurrencyDropdown({ onChange }: Props) {
  // ✅ initialize from localStorage during the initial render (no effect + setState)
  const dispatch = useDispatch();

  const [selected, setSelected] = useState<Currency>(() => {
    if (typeof window === "undefined") return CURRENCIES[0]; // default EN during SSR
    const code = localStorage.getItem("lang");
    return CURRENCIES.find((l) => l.code === code) ?? CURRENCIES[0];
  });

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current?.contains(e.target as Node))
        setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const choose = (currency: Currency) => {
    setSelected(currency);
    setOpen(false);
    if (typeof window !== "undefined") onChange?.(currency);

    dispatch(changeCurrency(currency.code));
  };

  return (
    <div ref={ref} className="relative pl-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 rounded-md  bg-transparent px-3 py-2 text-sm text-white hover:bg-white/10 `}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="hidden sm:inline">{selected.code}</span>
        <span className="hidden sm:inline">{selected.sign}</span>
      </button>

      {open && (
        <ul
          className="absolute right-0 z-50 mt-2 w-52 rounded-md border border-slate-200 bg-white p-1 shadow-lg"
          role="listbox"
        >
          {CURRENCIES.map((currency) => (
            <li key={currency.code}>
              <button
                onClick={() => choose(currency)}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                role="option"
                aria-selected={selected.code === currency.code}
              >
                <span className="truncate">{currency.code}</span>
                <span className="truncate">{currency.sign}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
