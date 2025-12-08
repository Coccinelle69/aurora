"use client";
import { motion, AnimatePresence } from "framer-motion";
import { SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { searchUIPayload } from "@/components/Booking/SearchBooking";

interface NotificationProps {
  setSearchUI: React.Dispatch<SetStateAction<searchUIPayload>>;
  searchUI: searchUIPayload;
  available: boolean;
  done: boolean;
  stayDurationError: boolean;
  setSerchDone: React.Dispatch<SetStateAction<boolean>>;
  setNotificationDisappeared: React.Dispatch<SetStateAction<boolean>>;
  error: boolean;
}

export default function Notification({
  available,
  done,
  error,
  stayDurationError,
  setNotificationDisappeared,
}: NotificationProps) {
  const [show, setShow] = useState(available);
  const { t } = useTranslation();

  useEffect(() => {
    if (done) {
      Promise.resolve().then(() => setShow(true));
      const hideNotificationTimer = setTimeout(() => {
        setShow(false);
      }, 4000);
      const showBokingCardTimer = setTimeout(() => {
        setNotificationDisappeared(true);
      }, 6000);
      return () => {
        clearTimeout(hideNotificationTimer);
        clearTimeout(showBokingCardTimer);
      };
    }
  }, [done]);
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
        {stayDurationError && t("minimumStay")}
        {available && !stayDurationError && !error && t("available")}
        {!available && !stayDurationError && t("notAvailable")}
        {error && !stayDurationError && t("something-went-wrong")}
      </motion.div>
    </motion.div>
  );

  return <AnimatePresence>{show && content}</AnimatePresence>;
}
