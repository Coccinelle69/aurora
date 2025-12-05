"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const CancellationPolicy = () => {
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
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="text-sm text-gray-700 cursor-pointer flex items-center justify-between border-b pb-3"
          >
            {t("cancellationPolicyText")}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CancellationPolicy;
