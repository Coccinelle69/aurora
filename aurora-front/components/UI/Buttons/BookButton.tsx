"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

const BookButton = () => {
  const { t } = useTranslation();

  return (
    <Link
      href="/book"
      className="hidden sm:flex border border-white text-white py-2 px-1 text-center sm:py-2 sm:px-4 mb-3 ml-2 sm:ml-0 uppercase text-[11px] sm:text-sm font-bold hover:scale-110 cursor-pointer transition-transform duration-300 ease-out"
    >
      {t("book")}
    </Link>
  );
};

export default BookButton;
