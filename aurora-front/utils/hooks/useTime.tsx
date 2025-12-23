"use client";

import { useEffect, useState } from "react";

export default function useTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };

    updateTime(); // initial value

    // ms until next minute starts
    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000;

    // sync to next minute boundary
    const timeout = setTimeout(() => {
      updateTime();

      // update every full minute after that
      const interval = setInterval(updateTime, 60_000);

      // cleanup
      return () => clearInterval(interval);
    }, msUntilNextMinute);

    // cleanup on unmount
    return () => clearTimeout(timeout);
  }, []);

  return { time };
}
