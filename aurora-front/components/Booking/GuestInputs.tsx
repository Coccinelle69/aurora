"use client";

import GuestInput from "./GuestInput";

interface GuestsState {
  adults: number;
  children: number;
  teens: number;
}

interface GuestInputsProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  guests: GuestsState;
  setGuests: React.Dispatch<React.SetStateAction<GuestsState>>;
}

const GuestInputs = ({ setOpen, guests, setGuests }: GuestInputsProps) => {
  const { adults, children, teens } = guests;

  const update = (
    key: keyof GuestsState,
    value: number | ((prev: number) => number)
  ) => {
    setGuests((prev) => ({
      ...prev,
      [key]: typeof value === "function" ? value(prev[key]) : value,
    }));
  };

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white/60 shadow-xl border rounded-xl p-4 z-50">
      <GuestInput
        guestType="adults"
        guests={adults}
        setGuest={(v) => update("adults", v)}
        guestString="Adults"
      />
      <GuestInput
        guestType="children"
        guests={children}
        setGuest={(v) => update("children", v)}
        guestString="Children (0–12)"
      />
      <GuestInput
        guestType="teens"
        guests={teens}
        setGuest={(v) => update("teens", v)}
        guestString="Teens (13–18)"
      />
      <div className="pt-3 flex justify-end">
        <button
          onClick={() => setOpen((prevOpen) => !prevOpen)}
          className="px-4 py-1 bg-blue-600 text-white rounded-md"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default GuestInputs;
