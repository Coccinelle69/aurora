"use client";

import { useState, useRef, useEffect } from "react";
import { GuestInput, DateInput } from "@/components";
import { useAppSelector } from "@/store/hooks";

export default function BookingSearchBar() {
  const {
    adults: adultNo,
    children: childrenNo,
    teens: teenNo,
  } = useAppSelector((state) => state.search);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [adults, setAdults] = useState(Number(adultNo));
  const [children, setChildren] = useState(Number(childrenNo));
  const [teens, setTeens] = useState(Number(teenNo));

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const totalGuests = +adultNo + +childrenNo + +teenNo;

  // close dropdown on outside click
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

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/20 p-5 rounded-2xl shadow-md flex items-center gap-4">
      {/* START DATE */}
      <DateInput dateType="arrival" setDate={setStartDate} />
      {/* END DATE */}
      <DateInput dateType="departure" setDate={setEndDate} />

      {/* GUEST DROPDOWN */}
      <div className="relative" ref={ref}>
        <button
          className="border rounded-lg px-4 py-3 flex items-center gap-2"
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        >
          {totalGuests} Guests
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-64 bg-white/60 shadow-xl border rounded-xl p-4 z-50">
            {/* ADULTS */}
            <GuestInput
              guestType="adults"
              guests={adults}
              setGuest={setAdults}
              guestString="Adults"
            />
            {/* CHILDREN 0–12 */}
            <GuestInput
              guestType="children"
              guests={children}
              setGuest={setChildren}
              guestString="Children (0–12)"
            />
            {/* TEENS 13–18 */}
            <GuestInput
              guestType="teens"
              guests={teens}
              setGuest={setTeens}
              guestString="Teens (13–18)"
            />

            {/* DONE BUTTON */}
            <div className="pt-3 flex justify-end">
              <button
                onClick={() => setOpen((prevOpen) => !prevOpen)}
                className="px-4 py-1 bg-blue-600 text-white rounded-md"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SEARCH BUTTON */}
      <button
        onClick={() => setOpen(false)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Search
      </button>
    </div>
  );
}
