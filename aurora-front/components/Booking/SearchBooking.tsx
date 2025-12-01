"use client";

import { BookingCard, BookingSearchBar, Notification } from "@/components";
import { useState } from "react";

export default function SearchBooking() {
  const [available, setAvailable] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [notificationDisappeared, setNotificationDisappeared] = useState(false);
  const [stayDurationError, setStayDurationError] = useState(false);
  const [finalPrice, setFinalPrice] = useState<{
    price: null | number | string;
    sign: string;
  }>({
    price: null,
    sign: "",
  });

  return (
    <div>
      <BookingSearchBar
        setError={setError}
        setAvailable={setAvailable}
        setDone={setDone}
        setNotificationDisappeared={setNotificationDisappeared}
        setStayDurationError={setStayDurationError}
        setFinalPrice={setFinalPrice}
      />

      {done && (
        <Notification
          error={error}
          available={available}
          done={done}
          setDone={setDone}
          stayDurationError={stayDurationError}
          setNotificationDisappeared={setNotificationDisappeared}
        />
      )}

      {notificationDisappeared && available && !stayDurationError && (
        <BookingCard finalPrice={finalPrice} />
      )}
    </div>
  );
}
