"use client";

import { BookingCard, BookingSearchBar, Notification } from "@/components";
import { useState, memo } from "react";

export interface searchUIPayload {
  available: boolean;
  searchDone: boolean;
  error: boolean;
  notificationDisappeared: boolean;
  stayDurationError: boolean;
  price: {
    price: null | string | number;
    sign: string;
  };
}

function SearchBooking() {
  const [available, setAvailable] = useState(false);
  const [searchDone, setSerchDone] = useState(false);
  const [error, setError] = useState(false);
  const [notificationDisappeared, setNotificationDisappeared] = useState(false);
  const [stayDurationError, setStayDurationError] = useState(false);
  const [price, setPrice] = useState<{
    price: null | number | string;
    sign: string;
  }>({
    price: null,
    sign: "",
  });

  const [searchUI, setSearchUI] = useState<searchUIPayload>({
    available: false,
    searchDone: false,
    error: false,
    notificationDisappeared: false,
    stayDurationError: false,
    price: {
      price: null,
      sign: "",
    },
  });

  return (
    <div>
      <BookingSearchBar
        setError={setError}
        setAvailable={setAvailable}
        setSerchDone={setSerchDone}
        setNotificationDisappeared={setNotificationDisappeared}
        setStayDurationError={setStayDurationError}
        setPrice={setPrice}
        setSearchUI={setSearchUI}
      />

      {searchDone && (
        <Notification
          error={error}
          available={available}
          done={searchDone}
          setSerchDone={setSerchDone}
          stayDurationError={stayDurationError}
          setNotificationDisappeared={setNotificationDisappeared}
          setSearchUI={setSearchUI}
          searchUI={searchUI}
        />
      )}

      {notificationDisappeared && available && !stayDurationError && !error && (
        <BookingCard finalPrice={price} />
      )}
    </div>
  );
}

export default memo(SearchBooking);
