"use client";

import { FacebookIcon, InstagramIcon } from "@/icons";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Socials = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  return (
    <div>
      <p className={`${className}`}>{t("followUs")} </p>
      <p className="text-md opacity-90 mb-4">{t("onSocial")}</p>
      <div className="flex items-center justify-center md:justify-start gap-4">
        <Link
          aria-label="Facebook"
          href="#"
          className="h-10 w-10 grid place-items-center rounded-full text-[#17364e] hover:opacity-90"
        >
          <FacebookIcon size={25} />
        </Link>
        <Link
          aria-label="Instagram"
          href="#"
          className="h-10 w-10 grid place-items-center rounded-full text-[#17364e] hover:opacity-90"
        >
          <InstagramIcon size={25} />
        </Link>
      </div>
    </div>
  );
};

export default Socials;
