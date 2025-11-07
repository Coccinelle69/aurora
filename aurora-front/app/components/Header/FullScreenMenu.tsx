"use client";

import {
  AnimatePresence,
  motion,
  type Variants,
  type Transition,
} from "framer-motion";
import { createPortal } from "react-dom";
import Link from "next/link";
import { CloseIcon } from "../../icons";
import LogoAurora from "../UI/Logo";

type Props = { open: boolean; onClose: () => void };

/* -------------------- Transitions (typed) -------------------- */
const springSlide: Transition = {
  type: "spring",
  stiffness: 170,
  damping: 22,
  mass: 0.9,
};

// overlay slides in a bit (not from -100%), also fades
const overlay: Variants = {
  hidden: { y: "-10%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ...springSlide,
      // start children after overlay is in
      when: "beforeChildren",
    },
  },
  exit: {
    y: "-6%",
    opacity: 0,
    transition: { ...springSlide, damping: 24 },
  },
};

const springIn: Transition = { type: "spring", stiffness: 260, damping: 26 };

/* -------------------- Variants -------------------- */

const listParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

// numbers from LEFT
const numFromLeft: Variants = {
  hidden: { x: -40, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: springIn },
};

// labels from RIGHT
const textFromRight: Variants = {
  hidden: { x: 40, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: springIn },
};

// contact text from LEFT
const textFromLeft: Variants = {
  hidden: { x: -40, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: springIn },
};

/* -------------------- Component -------------------- */
export default function FullScreenMenu({ open, onClose }: Props) {
  // SSR guard for portal
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.aside
          className="fixed inset-0 z-[9999]"
          role="dialog"
          aria-modal="true"
          variants={overlay}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Panel */}
          <div className="relative z-10 h-full w-full bg-[#1A3C5B]/95 backdrop-blur-sm text-white">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 p-2 hover:scale-110 transition-transform"
              aria-label="Close menu"
            >
              <CloseIcon size={32} color="white" />
            </button>

            {/* Layout (give left column a bit more room if you like) */}
            <div className="mx-auto h-full w-full max-w-7xl px-[8%] py-10 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr_1fr] gap-10">
              {/* Left: Logo / CTA / Contacts */}
              <div className="flex flex-col justify-between">
                <div className="w-full h-full">
                  {/* Ensure LogoAurora itself is not width-capped; pass a larger size if needed */}
                  <LogoAurora className="" fullscreen={open} />
                </div>

                <div className="pb-10 space-y-6">
                  <Link
                    href="#booking"
                    onClick={onClose}
                    className="inline-block border border-white px-5 py-2 uppercase text-sm font-bold hover:scale-105 hover:shadow-lg transition-all"
                  >
                    Book now
                  </Link>

                  <motion.div
                    className="space-y-2 text-gray-200"
                    variants={listParent}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.p variants={textFromLeft} className="font-body">
                      <span className="font-semibold">T:</span> +385 92138 5595
                    </motion.p>
                    <motion.p variants={textFromLeft} className="font-body">
                      <span className="font-semibold">E:</span>{" "}
                      info@auroraapartments.gr
                    </motion.p>
                  </motion.div>
                </div>
              </div>

              {/* Middle: Menu — numbers from LEFT with fixed underline, labels from RIGHT */}
              <motion.ul
                className="flex flex-col justify-center gap-8"
                variants={listParent}
                initial="hidden"
                animate="visible"
              >
                {[
                  { n: "01", label: "Homepage", href: "#" },
                  { n: "02", label: "Location", href: "#location" },
                  { n: "03", label: "Apartment", href: "#apartment" },
                  { n: "04", label: "Contact", href: "#contact" },
                ].map((item) => (
                  <li
                    key={item.n}
                    className="grid grid-cols-[4rem_auto] items-center gap-6"
                  >
                    {/* Number cell (fixed width) — underline length is fixed on inner span */}
                    <motion.div
                      variants={numFromLeft}
                      className="w-16 flex items-center justify-end leading-none"
                    >
                      <span
                        className="inline-flex w-12 justify-center tabular-nums font-semibold
                                   tracking-widest opacity-90 leading-none
                                   pb-1 border-b border-white/40"
                      >
                        {item.n}
                      </span>
                    </motion.div>

                    {/* Label */}
                    <motion.div
                      variants={textFromRight}
                      whileHover={{ scale: 0.9 }}
                      className="leading-none"
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="text-4xl lg:text-5xl tracking-wide font-heading hover:opacity-80 transition-opacity"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </motion.ul>

              {/* Right column — optional secondary links; remove if unused */}
              <div className="hidden lg:flex items-center justify-start" />
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>,
    document.body
  );
}
