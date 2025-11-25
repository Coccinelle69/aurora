"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface NotificationProps {
  available: boolean;
  trigger: boolean;
}

export default function Notification({
  available,
  trigger,
}: NotificationProps) {
  const [show, setShow] = useState(available);

  useEffect(() => {
    if (trigger) {
      Promise.resolve().then(() => setShow(true));
      const timer = setTimeout(() => setShow(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);
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
      className="w-full flex justify-center mt-20 pointer-events-none"
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
        {available
          ? "Great news — Aurora is available for the dates you selected."
          : "Selected dates are not available. Please choose again."}
      </motion.div>
    </motion.div>
  );

  return <AnimatePresence>{trigger && content}</AnimatePresence>;
}
