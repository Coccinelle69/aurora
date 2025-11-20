"use client";

import { useTranslation } from "react-i18next";

const BookButton = () => {
  const { t } = useTranslation();

  return (
    <button
      onClick={() => window.open("/book", "_blank", "noopener,noreferrer")}
      className="hidden lg:block border border-white text-white py-2 px-4 mb-[0.75rem] uppercase text-sm font-bold hover:scale-110 cursor-pointer 
                 transition-transform duration-300 ease-out "
    >
      {t("book")}
    </button>
  );
};

export default BookButton;
