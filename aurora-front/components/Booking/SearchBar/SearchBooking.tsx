"use client";

import { BookingCard, BookingSearchBar, Notification } from "@/components";
import { searchUI } from "@/utils/interfaces";
import { useState, memo } from "react";

function SearchBooking() {
  const [searchUI, setSearchUI] = useState<searchUI>({
    available: false,
    searchDone: false,
    error: false,
    notificationDisappeared: false,
    stayDurationError: false,
    outOfSeason: false,
    price: null,
    sign: "",
  });

  return (
    <div>
      <BookingSearchBar setSearchUI={setSearchUI} searchUI={searchUI} />

      {searchUI.searchDone && (
        <Notification setSearchUI={setSearchUI} searchUI={searchUI} />
      )}

      {searchUI.notificationDisappeared &&
        searchUI.available &&
        !searchUI.stayDurationError &&
        !searchUI.error &&
        !searchUI.outOfSeason && (
          <BookingCard
            finalPrice={{
              price: searchUI.price,
              sign: searchUI.sign,
            }}
          />
        )}
    </div>
  );
}

export default memo(SearchBooking);
