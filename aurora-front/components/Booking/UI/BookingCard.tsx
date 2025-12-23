"use client";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatPriceUniversal } from "@/utils/format";
import i18next from "i18next";

interface BookingCardProps {
  finalPrice: {
    price: null | number | string;
    sign: string;
  };
}

const BookingCard = ({ finalPrice }: BookingCardProps) => {
  const {
    adults: adultNo,
    children: childrenNo,
    teens: teenNo,
    arrival,
    departure,
  } = useAppSelector((state) => state.search);
  const [guests, setGuests] = useState({
    adults: Number(adultNo),
    children: Number(childrenNo),
    teens: Number(teenNo),
  });
  const totalGuests = +adultNo + +childrenNo + +teenNo;

  const { t } = useTranslation();

  console.log(finalPrice);

  const formattedFinalPrice = formatPriceUniversal(
    +finalPrice.price!,
    i18next.language
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full px-4 mt-40 sm:mt-0 md:mt-40 mb-60 flex justify-center sm:mb-0"
    >
      <div
        className="
          max-w-4xl w-full
          rounded-2xl shadow-lg border
          p-4 bg-white
          flex flex-col sm:flex-row gap-6
        "
      >
        {/* IMAGE */}
        <div className="w-full sm:w-56 h-56 relative flex-shrink-0">
          <Image
            src="/bookingcard.jpg"
            alt="Apartment"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              {t("title")}
            </h2>

            <div className="flex items-center text-gray-500 gap-1 mt-1">
              <span>📍</span>
              <span>{t("zukve")}</span>
            </div>

            <p className="text-gray-600 mt-2 text-sm font-semibold">
              {`• ${t("arrival")}: ${arrival} ${t("departure")}: ${departure}`}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-gray-600 text-sm mt-3">
              <span>• {t("apartment")}</span>
              <span>• {t("bedrooms")}</span>
              <span>• {t("bathroom")}</span>
              {Number(totalGuests) > 1 ? (
                <span>
                  • {totalGuests} {t("moreGuests")}
                </span>
              ) : (
                <span>
                  • {totalGuests} {t("oneGuest")}
                </span>
              )}
            </div>
          </div>

          {/* PRICE + BUTTON */}
          <div className="flex justify-between items-end mt-4">
            <div>
              <div className="text-sm text-gray-500">{t("from")}</div>
              <div className="text-2xl text-gray-700 font-semibold">
                {finalPrice.sign} {formattedFinalPrice}
              </div>
              <div className="text-xs text-gray-500">{t("perNight")}</div>
              <div className="text-xs text-gray-400 mt-1">
                {t("additionalCharges")}
              </div>
            </div>

            <Link href="/book/details">
              <button className="bg-sky-500 text-white px-5 py-2 rounded-lg hover:bg-sky-600 transition">
                {t("book")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;
