"use client";

import { useCurrency } from "@/utils/hooks";
import { useEffect, useState } from "react";

const BookingPage = () => {
  //   const [price, setPrice] = useState(null);
  const { price } = useCurrency();

  //   useEffect(() => {
  //     // get query params from URL
  //     const params = new URLSearchParams(window.location.search);
  //     const from = "2025-05-20";
  //     const to = "2025-05-25";

  //     async function runTest() {
  //       console.log("Testing with: ", { from, to });

  //       try {
  //         const res = await fetch(`/api/currency?from=${from}&to=${to}`);
  //         const data = await res.json();
  //         // setPrice(data.amount);
  //         console.log("API Response:", data);
  //       } catch (e) {
  //         console.error("Request failed:", e);
  //       }
  //     }

  //     runTest();
  //   }, []);
  return <div className="bg-red">{price}</div>;
};

export default BookingPage;
