"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

const Phone = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center lg:block">
      <p className="text-white footer-title">{t("phone")}:</p>
      <Link
        href="tel:+385921385595"
        className="mt-1 inline-flex items-center text-center gap-2 hover:underline"
      >
        +385 92138 5595
      </Link>
    </div>
  );
};

export default Phone;
