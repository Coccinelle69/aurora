"use client";

import { FacebookIcon, InstagramIcon } from "@/icons";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Socials = () => {
  const { t } = useTranslation();
  return (
    <div
      className="flex flex-col items-center justify-center lg:block"
      role="group"
      aria-labelledby="socials-title"
    >
      <p className="text-md font-semibold text-white" id="socials-title">
        {t("followUs")}
      </p>
      <p className="text-md opacity-90 mb-4">{t("onSocial")}</p>
      <div className="flex items-center justify-center md:justify-start gap-4">
        <Link
          aria-label="Facebook"
          href="#"
          className="h-10 w-10 grid place-items-center rounded-full text-[#17364e] hover:opacity-90"
        >
          <FacebookIcon size={25} aria-hidden="true" />
        </Link>
        <Link
          aria-label="Instagram"
          href="#"
          className="h-10 w-10 grid place-items-center rounded-full text-[#17364e] hover:opacity-90"
        >
          <InstagramIcon size={25} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};

export default Socials;
