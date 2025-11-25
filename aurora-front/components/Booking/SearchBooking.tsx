"use client";

import { BookingCard, BookingSearchBar, Notification } from "@/components";
import { useState } from "react";

export default function SearchBooking() {
  const [available, setAvailable] = useState(false);
  const [trigger, setTrigger] = useState(false);

  console.log(available);

  return (
    <div>
      <BookingSearchBar
        setAvailable={setAvailable}
        setTrigger={setTrigger}
        trigger={trigger}
      />

      <Notification available={available} trigger={trigger} />

      {/* <BookingCard />  */}
    </div>
  );
}
