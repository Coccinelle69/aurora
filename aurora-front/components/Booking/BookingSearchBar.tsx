/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import {
  useState,
  useRef,
  useEffect,
  FormEvent,
  SetStateAction,
  useMemo,
} from "react";
import { DateInput, GuestInputs, MagnifyingGlass } from "@/components";
import { useAppSelector } from "@/store/hooks";
import { useCurrency, useResponse } from "@/utils/hooks";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/utils/format";
import { useDispatch } from "react-redux";
import { finalPriceCalc } from "@/reducers/price";

interface BookingSearchBarProps {
  setAvailable: React.Dispatch<SetStateAction<boolean>>;
  setDone: React.Dispatch<SetStateAction<boolean>>;
  setNotificationDisappeared: React.Dispatch<SetStateAction<boolean>>;
  setStayDurationError: React.Dispatch<SetStateAction<boolean>>;
  setError: React.Dispatch<SetStateAction<boolean>>;
  setPrice: React.Dispatch<
    SetStateAction<{ price: null | number | string; sign: string }>
  >;
}

export default function BookingSearchBar({
  setAvailable,
  setNotificationDisappeared,
  setStayDurationError,
  setDone,
  setError,
  setPrice,
}: BookingSearchBarProps) {
  const dispatch = useDispatch();
  const {
    adults: adultNo,
    children: childrenNo,
    teens: teenNo,
    arrival,
    departure,
  } = useAppSelector((state) => state.search);
  const { value } = useAppSelector((state) => state.currency);
  const { priceData, sign } = useCurrency({
    from: arrival,
    to: departure,
  });
  const [startDate, setStartDate] = useState(arrival);
  const [endDate, setEndDate] = useState(departure);
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
  console.log(priceData);

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
    () => `/api/reservation?arrival=${startDate}&departure=${endDate}`,
    [startDate, endDate]
  );

  const { success, done, errorMessage } = useResponse({
    url,
    method: "GET",
    trigger,
  });

  const { nights } = formatDate({ from: startDate, to: endDate });

  useEffect(() => {
    if (!done) return;

    const timer = setTimeout(() => {
      setSubmitting(false);
      setTrigger(false);
      setDone(true);
      errorMessage && setError(true);
      if (success) setAvailable(true);

      if (nights < 7) setStayDurationError(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, [done]);

  const price = priceData?.price ?? 0;

  useEffect(() => {
    if (price !== null) {
      setPrice((prev) => ({ ...prev, price, sign }));
      dispatch(finalPriceCalc({ amount: price, sign, nights }));
    }
  }, [value, price]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotificationDisappeared(false);
    setStayDurationError(false);

    setDone(false);
    setSubmitting(true);
    setTrigger(true);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="relative w-full max-w-5xl mx-auto top-20 bg-white/20 p-5 rounded-2xl shadow-md flex flex-wrap items-center gap-4"
      >
        <div className="input">
          <DateInput
            dateType="arrival"
            setDate={setStartDate}
            setAvailable={setAvailable}
          />
        </div>

        <div className="input">
          <DateInput
            dateType="departure"
            setDate={setEndDate}
            setAvailable={setAvailable}
          />
        </div>

        <div className="relative input" ref={ref}>
          <button
            className="border rounded-lg px-4 py-3 flex items-center gap-2 w-full"
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

        <button
          type="submit"
          onClick={() => setOpen(false)}
          className="px-6 py-3 bg-defaultBg text-white rounded-lg w-full sm:w-auto hover:bg-[#0E7DB5]"
        >
          {t("search")}
        </button>
      </form>
      {submitting && (
        <div className="flex flex-col sm:flex-row items-center justify-center relative top-[10rem]">
          <p className="font-bold animate-pulse text-[1.75rem] tracking-[0.1rem] text-center">
            {t("checkingAvailability")}
          </p>
          <MagnifyingGlass visible={submitting} />
        </div>
      )}
    </>
  );
}
