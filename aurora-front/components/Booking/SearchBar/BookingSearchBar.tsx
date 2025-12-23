/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useState, useRef, useEffect, FormEvent, useMemo } from "react";
import {
  GuestInputs,
  MagnifyingGlass,
  PriceAvailabilityActions,
  DateInputs,
} from "@/components";
import { useAppSelector } from "@/store/hooks";
import { useCurrency, useResponse } from "@/utils/hooks";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/utils/format";
import { useDispatch } from "react-redux";
import { finalPriceCalc } from "@/reducers/price";
import { searchUI, searchUIProps } from "@/utils/interfaces";

export default function BookingSearchBar({
  setSearchUI,
  searchUI,
}: searchUIProps) {
  const dispatch = useDispatch();
  const {
    adults: adultNo,
    children: childrenNo,
    teens: teenNo,
    arrival,
    departure,
  } = useAppSelector((state) => state.search);
  const { value } = useAppSelector((state) => state.currency);
  const [startDate, setStartDate] = useState(arrival);
  const [endDate, setEndDate] = useState(departure);
  const { priceData, sign } = useCurrency({
    from: startDate,
    to: endDate,
  });

  const [trigger, setTrigger] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { t } = useTranslation();

  const [guests, setGuests] = useState({
    adults: +adultNo,
    children: +childrenNo,
    teens: +teenNo,
  });

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const totalGuests = +adultNo + +childrenNo + +teenNo;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const url = useMemo(
    () =>
      `/api/reservation/availability?arrival=${startDate}&departure=${endDate}`,
    [startDate, endDate]
  );

  const { done, errorMessage, data, success } = useResponse({
    url,
    method: "GET",
    trigger,
  });

  const { nights } = formatDate({ from: startDate, to: endDate });

  const updateSearchUI = (patch: Partial<searchUI>) => {
    setSearchUI((prev) => ({ ...prev, ...patch }));
  };

  useEffect(() => {
    if (!done) return;

    const timer = setTimeout(() => {
      setSubmitting(false);
      setTrigger(false);
      updateSearchUI({ searchDone: true });
      errorMessage && updateSearchUI({ error: true });
      if (data.available && priceData!.error !== "hors-season")
        updateSearchUI({ available: true });

      if (nights < 7) updateSearchUI({ stayDurationError: true });
      priceData!.error === "hors-season" &&
        updateSearchUI({ outOfSeason: true });
    }, 4000);

    return () => clearTimeout(timer);
  }, [done]);

  const price = priceData?.price ?? 0;

  useEffect(() => {
    if (price !== null) {
      updateSearchUI({ price, sign });
      dispatch(finalPriceCalc({ amount: price, sign, nights }));
    }
  }, [value, price]);

  console.log(searchUI);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSearchUI({
      notificationDisappeared: false,
      stayDurationError: false,
      searchDone: false,
      outOfSeason: false,
    });

    setSubmitting(true);
    setTrigger(true);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="relative w-full max-w-5xl mx-auto top-20 sm:-top-16 md:top-20 bg-white/20 p-5 rounded-2xl shadow-md flex flex-wrap items-center gap-4"
      >
        <DateInputs
          setAvailable={(val: boolean) => updateSearchUI({ available: val })}
          setDates={{
            setStartDate,
            setEndDate,
          }}
        />

        <div className="relative input" ref={ref}>
          <button
            className="border rounded-lg px-4 py-3 flex items-center gap-2 w-full text-white"
            onClick={() => setOpen((prevOpen) => !prevOpen)}
            type="button"
          >
            {totalGuests === 1
              ? totalGuests + " " + t("oneGuest")
              : totalGuests + " " + t("moreGuests")}
          </button>

          {open && (
            <GuestInputs
              guests={guests}
              setGuests={setGuests}
              setOpen={setOpen}
            />
          )}
        </div>
        <PriceAvailabilityActions />

        <button
          type="submit"
          onClick={() => setOpen(false)}
          className="px-6 py-3 bg-defaultBg text-white rounded-lg
             w-full sm:w-auto
             mx-auto
             hover:bg-[#0E7DB5]"
        >
          {t("search")}
        </button>
      </form>
      {submitting && (
        <div className="flex flex-col sm:flex-row items-center justify-center relative top-[10rem]">
          <p className="font-bold animate-pulse text-[1.75rem] tracking-[0.1rem] text-center text-white">
            {t("checkingAvailability")}
          </p>
          <MagnifyingGlass visible={submitting} />
        </div>
      )}
    </>
  );
}
