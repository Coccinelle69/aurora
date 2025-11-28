"use client";
import "@/app/globals.css";

import ClientProviders from "@/ClientProviders";
import { AnimCursor } from "@/components";

export default function DetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isCoarse =
    typeof window !== "undefined" &&
    (window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches);
  return (
    <ClientProviders>
      {!isCoarse && <AnimCursor />}
      {children}
    </ClientProviders>
  );
}
