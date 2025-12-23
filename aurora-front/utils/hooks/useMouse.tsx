"use client";

import { useEffect, useState } from "react";

export default function useMouse() {
  const [isMouse, setIsMouse] = useState(false);

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      setIsMouse(e.pointerType === "mouse");
    };

    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return isMouse;
}
