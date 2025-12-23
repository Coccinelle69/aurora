"use client";

import { AnimCursor } from "@/components";
import { useMouse } from "@/utils/hooks";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMouse = useMouse();

  return (
    <>
      {isMouse && <AnimCursor />}
      {children}
    </>
  );
}
