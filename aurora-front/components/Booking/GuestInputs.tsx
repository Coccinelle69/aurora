"use client";

import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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
        guestString={t("adults")}
      />
      <GuestInput
        guestType="children"
        guests={children}
        setGuest={(v) => update("children", v)}
        guestString={t("children")}
      />
      <GuestInput
        guestType="teens"
        guests={teens}
        setGuest={(v) => update("teens", v)}
        guestString={t("teens")}
      />
      <div className="pt-3 flex justify-end">
        <button
          onClick={() => setOpen((prevOpen) => !prevOpen)}
          className="px-4 py-1 bg-blue-600 text-white rounded-md"
        >
          {t("done")}
        </button>
      </div>
    </div>
  );
};

export default GuestInputs;
