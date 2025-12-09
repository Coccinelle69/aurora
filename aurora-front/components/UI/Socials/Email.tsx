"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

const Email = ({ className }: { className?: string }) => {
  const { t } = useTranslation();

  return (
    <div>
      <p className={`${className}`}>{t("email")}:</p>
      <Link
        href="mailto:dorotea0105@gmail.com"
        className="mt-1 inline-flex items-center gap-2 hover:underline"
      >
        dorotea0105@gmail.com
      </Link>
    </div>
  );
};

export default Email;
