"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

const BookButton = () => {
  const { t } = useTranslation();

  return (
    <Link href="/book">
      <button
        className="hidden lg:block border border-white text-white py-2 px-4 mb-[0.75rem] uppercase text-sm font-bold hover:scale-110 cursor-pointer 
                 transition-transform duration-300 ease-out "
      >
        {t("book")}
      </button>
    </Link>
  );
};

export default BookButton;
