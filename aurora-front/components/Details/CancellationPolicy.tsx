"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const CancellationPolicy = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <div>
      <p
        onClick={() => setOpen((p) => !p)}
        className="text-default font-semibold cursor-pointer flex items-center justify-between"
      >
        {t("cancellationPolicyTitle")}
        <span
          className={`text-gray-500 text-lg transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          &#9662;
        </span>
      </p>
      {open && (
        <p className="text-sm text-gray-700 cursor-pointer flex items-center justify-between border-b pb-3">
          {t("cancellationPolicyText")}
        </p>
      )}
    </div>
  );
};
