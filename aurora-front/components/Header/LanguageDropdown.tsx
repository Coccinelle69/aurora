"use client";

import { changeLanguage } from "@/reducers/language";
import i18next from "i18next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

type Lang = { code: string; native: string; flag: string };

const LANGS: Lang[] = [
  { code: "en", native: "English", flag: "/languages/UK.png" },
  { code: "de", native: "Deutsch", flag: "/languages/DE.png" },
  { code: "es", native: "Español", flag: "/languages/ES.png" },
  { code: "fr", native: "Français", flag: "/languages/FR.png" },
  { code: "hr", native: "Hrvatski", flag: "/languages/HR.png" },
  { code: "pl", native: "Polski", flag: "/languages/PL.png" },
  { code: "hu", native: "Magyar", flag: "/languages/HU.png" },
  { code: "cz", native: "Čeština", flag: "/languages/CZ.png" },
  { code: "it", native: "Italiano", flag: "/languages/IT.png" },
  // { code: "ru", native: "Русский", flag: "/languages/RU.png" },
  { code: "sl", native: "Slovenščina", flag: "/languages/SL.png" },
  // { code: "zh", native: "中文", flag: "/languages/ZH.png" },
];

type Props = { onChange?: (lang: Lang) => void; book?: boolean };

export default function LanguageDropdown({ onChange, book }: Props) {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState<Lang>({
    code: "en",
    native: "English",
    flag: "/languages/UK.png",
  });

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // outside click / Esc
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
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

  const choose = (lang: Lang) => {
    setSelected(lang);
    setOpen(false);
    if (typeof window !== "undefined") localStorage.setItem("lang", lang.code);
    onChange?.(lang);
    console.log(lang.code);
    i18next.changeLanguage(lang.code);

    dispatch(changeLanguage(lang.code));
  };

  return (
    <div ref={ref} className="relative pl-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 rounded-md  bg-transparent px-1 py-2 text-sm text-white hover:bg-white/10 `}
        aria-label={`Change language, current language ${selected.native}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="language-listbox"
      >
        <Image
          src={selected.flag}
          alt={selected.native}
          width={book ? 30 : 20}
          height={10}
          className={`rounded-sm h-3.5`}
        />
        <span className="hidden sm:inline text-[1rem]">{selected.native}</span>
      </button>

      {open && (
        <ul
          className="absolute right-0 z-50 mt-2 w-52 rounded-md border border-slate-200 bg-white p-1 shadow-lg"
          role="listbox"
          id="language-listbox"
          aria-activedescendant={`lang-${selected.code}`}
        >
          {LANGS.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => choose(lang)}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                role="option"
                aria-selected={selected.code === lang.code}
                id={`lang-${lang.code}`}
              >
                <Image
                  src={lang.flag}
                  alt=""
                  height={15}
                  width={20}
                  className="rounded-sm"
                  aria-hidden
                />
                <span className="truncate">{lang.native}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
