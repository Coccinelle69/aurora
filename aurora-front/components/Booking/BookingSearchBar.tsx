"use client";

import { useState, useRef, useEffect } from "react";

export default function BookingSearchBar() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [teens, setTeens] = useState(0);

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const totalGuests = adults + children + teens;

  // close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/20 p-5 rounded-2xl shadow-md flex items-center gap-4">
      {/* START DATE */}
      <div className="flex-1 border rounded-lg px-4 py-3">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full outline-none"
        />
      </div>

      <span className="text-gray-500">-</span>

      {/* END DATE */}
      <div className="flex-1 border rounded-lg px-4 py-3">
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full outline-none"
        />
      </div>

      {/* GUEST DROPDOWN */}
      <div className="relative" ref={ref}>
        <button
          className="border rounded-lg px-4 py-3 flex items-center gap-2"
          onClick={() => setOpen(!open)}
        >
          {totalGuests} Guests
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl border rounded-xl p-4 z-50">
            {/* ADULTS */}
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">Adults</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => adults > 1 && setAdults(adults - 1)}
                  className="h-7 w-7 rounded border flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-4 text-center">{adults}</span>
                <button
                  onClick={() => setAdults(adults + 1)}
                  className="h-7 w-7 rounded border flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* CHILDREN 0–12 */}
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">Children (0–12)</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => children > 0 && setChildren(children - 1)}
                  className="h-7 w-7 rounded border flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-4 text-center">{children}</span>
                <button
                  onClick={() => setChildren(children + 1)}
                  className="h-7 w-7 rounded border flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* TEENS 13–18 */}
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">Teens (13–18)</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => teens > 0 && setTeens(teens - 1)}
                  className="h-7 w-7 rounded border flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-4 text-center">{teens}</span>
                <button
                  onClick={() => setTeens(teens + 1)}
                  className="h-7 w-7 rounded border flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* DONE BUTTON */}
            <div className="pt-3 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-1 bg-blue-600 text-white rounded-md"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SEARCH BUTTON */}
      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
        Search
      </button>
    </div>
  );
}
