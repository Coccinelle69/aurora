"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

const BookButton = () => {
  const { t } = useTranslation();

  return (
    <Link
      href="/book"
      className="flex border border-white text-white py-2 px-4 mb-3 uppercase text-sm font-bold hover:scale-110 cursor-pointer transition-transform duration-300 ease-out"
    >
      {t("book")}
    </Link>
  );
};

export default BookButton;
