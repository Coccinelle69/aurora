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
import { useResponse } from "@/utils/hooks";
import { useTranslation } from "react-i18next";

interface BookingSearchBarProps {
  setAvailable: React.Dispatch<SetStateAction<boolean>>;
  setDone: React.Dispatch<SetStateAction<boolean>>;
  setNotificationDisappeared: React.Dispatch<SetStateAction<boolean>>;
  setError: React.Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const paramsEqual = (a: any, b: any) => {
  return (
    a.arrival === b.arrival &&
    a.departure === b.departure &&
    a.adults === b.adults &&
    a.children === b.children &&
    a.teens === b.teens
  );
};

export default function BookingSearchBar({
  setAvailable,
  setNotificationDisappeared,
  setDone,
  setError,
}: BookingSearchBarProps) {
  const {
    adults: adultNo,
    children: childrenNo,
    teens: teenNo,
    arrival,
    departure,
  } = useAppSelector((state) => state.search);
  const [startDate, setStartDate] = useState(arrival);
  const [endDate, setEndDate] = useState(departure);
  const [trigger, setTrigger] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { t } = useTranslation();

  const [guests, setGuests] = useState({
    adults: Number(adultNo),
    children: Number(childrenNo),
    teens: Number(teenNo),
  });

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const totalGuests = +adultNo + +childrenNo + +teenNo;

  const initialParamsRef = useRef({
    arrival,
    departure,
    adults: Number(adultNo),
    children: Number(childrenNo),
    teens: Number(teenNo),
  });

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

  useEffect(() => {
    if (!done) return;

    const timer = setTimeout(() => {
      setSubmitting(false);
      setTrigger(false);
      setDone(true);
      errorMessage && setError(true);
      if (success) setAvailable(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, [done]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotificationDisappeared(false);
    const initial = initialParamsRef.current;
    const current = {
      arrival: startDate,
      departure: endDate,
      adults: guests.adults,
      children: guests.children,
      teens: guests.teens,
    };

    // BLOCK duplicate searches
    if (paramsEqual(initial, current)) {
      console.log("No search: parameters unchanged.");
      return;
    }

    // UPDATE baseline AFTER a valid search
    initialParamsRef.current = { ...current };

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
        <div className="flex-1 min-w-[140px]">
          <DateInput
            dateType="arrival"
            setDate={setStartDate}
            setAvailable={setAvailable}
          />
        </div>

        <div className="flex-1 min-w-[140px]">
          <DateInput
            dateType="departure"
            setDate={setEndDate}
            setAvailable={setAvailable}
          />
        </div>

        <div className="relative flex-1 min-w-[140px]" ref={ref}>
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
