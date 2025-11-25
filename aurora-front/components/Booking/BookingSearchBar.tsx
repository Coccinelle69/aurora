"use client";

import { useState, useRef, useEffect, FormEvent, SetStateAction } from "react";
import { DateInput, GuestInputs, MagnifyingGlass } from "@/components";
import { useAppSelector } from "@/store/hooks";
import { useResponse } from "@/utils/hooks";
import { useTranslation } from "react-i18next";

interface BookingSearchBarProps {
  setAvailable: React.Dispatch<SetStateAction<boolean>>;
  setTrigger: React.Dispatch<SetStateAction<boolean>>;
  trigger: boolean;
}

export default function BookingSearchBar({
  setAvailable,
  setTrigger,
  trigger,
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
  // const [trigger, setTrigger] = useState(false);
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

  const { data, success, done, errorMessage } = useResponse({
    url: `/api/reservation?arrival=${startDate}&departure=${endDate}`,
    method: "GET",
    trigger,
  });

  useEffect(() => {
    if (!done) return;

    Promise.resolve().then(() => {
      setSubmitting(false);
      setTrigger(false);
      if (success) setAvailable(true);
    });
  }, [done]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTrigger(true);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="relative w-full max-w-5xl mx-auto top-5 bg-white/20 p-5 rounded-2xl shadow-md flex flex-wrap items-center gap-4"
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
          >
            {totalGuests} Guests
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
          className="px-6 py-3 bg-blue-600 text-white rounded-lg w-full sm:w-auto"
        >
          Search
        </button>
      </form>
      {submitting && (
        <div className="flex items-center justify-center relative top-[10rem]">
          <p className="font-bold animate-pulse text-[1.75rem] tracking-[0.1rem]">
            Checking for availability...
          </p>
          <MagnifyingGlass visible={submitting} />
        </div>
      )}
    </>
  );
}
