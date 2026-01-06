"use client";
import { searchUIProps } from "@/utils/interfaces";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Notification({ searchUI, setSearchUI }: searchUIProps) {
  const [show, setShow] = useState(searchUI.available);
  const { t } = useTranslation();

  console.log(searchUI);

  useEffect(() => {
    if (searchUI.searchDone) {
      Promise.resolve().then(() => setShow(true));
      const hideNotificationTimer = setTimeout(() => {
        setShow(false);
      }, 4000);
      const showBokingCardTimer = setTimeout(() => {
        setSearchUI((prev) => {
          return { ...prev, notificationDisappeared: true };
        });
      }, 6000);
      return () => {
        clearTimeout(hideNotificationTimer);
        clearTimeout(showBokingCardTimer);
      };
    }
  }, [searchUI.searchDone]);
  const content = (
    <motion.div
      initial={{ y: -15, opacity: 0 }}
      animate={{
        y: [-50, 0, -25, 0, -15, 0],
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        y: -20,
        transition: { duration: 1.8 },
      }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-[80%] sm:w-full flex items-center mx-auto justify-center mt-40 pointer-events-none"
    >
      <motion.div
        className="
             
                text-default font-semibold
                backdrop-blur-md bg-white/30 
                px-5 py-3 rounded-2xl shadow-lg 
                border border-white/20
                max-w-max
              "
        animate={{ x: [0, -6, 6, -4, 4, 0] }}
        transition={{ duration: 0.45, ease: "easeInOut", delay: 2 }}
      >
        {searchUI.stayDurationError &&
          !searchUI.outOfSeason &&
          t("minimumStay")}
        {searchUI.available &&
          !searchUI.stayDurationError &&
          !searchUI.error &&
          !searchUI.outOfSeason &&
          t("available")}
        {searchUI.error &&
          !searchUI.stayDurationError &&
          !searchUI.available &&
          !searchUI.outOfSeason &&
          t("something-went-wrong")}
        {!searchUI.available &&
          !searchUI.outOfSeason &&
          !searchUI.stayDurationError &&
          !searchUI.error &&
          t("notAvailable")}
        {searchUI.outOfSeason && t("outOfSeasonMessage")}
      </motion.div>
    </motion.div>
  );

  return <AnimatePresence>{show && content}</AnimatePresence>;
}
