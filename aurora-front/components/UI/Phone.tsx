"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

interface PhoneProps {
  className?: string;
}

const Phone = ({ className }: PhoneProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <p className={`${className}`}>{t("phone")}:</p>
      <Link
        href="tel:+385921385595"
        className="mt-1 inline-flex items-center gap-2 hover:underline"
      >
        +385 92138 5595
      </Link>
    </div>
  );
};

export default Phone;
