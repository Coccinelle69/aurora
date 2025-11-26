"use client";

import { BookingCard, BookingSearchBar, Notification } from "@/components";
import { useState } from "react";

export default function SearchBooking() {
  const [available, setAvailable] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [notificationDisappeared, setNotificationDisappeared] = useState(false);

  return (
    <div>
      <BookingSearchBar
        setError={setError}
        setAvailable={setAvailable}
        setDone={setDone}
        setNotificationDisappeared={setNotificationDisappeared}
      />

      {done && (
        <Notification
          error={error}
          available={available}
          done={done}
          setDone={setDone}
          setNotificationDisappeared={setNotificationDisappeared}
        />
      )}

      {notificationDisappeared && available && <BookingCard />}
    </div>
  );
}
