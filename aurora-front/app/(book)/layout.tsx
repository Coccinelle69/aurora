"use client";
import "@/app/globals.css";

import { Roboto, Princess_Sofia, Quintessential } from "next/font/google";
import ClientProviders from "@/ClientProviders";
import { AnimCursor, BookHeader } from "@/components";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

const sofia = Princess_Sofia({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
});

const quintessential = Quintessential({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isCoarse =
    typeof window !== "undefined" &&
    (window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches);
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${roboto.variable} ${quintessential.variable} ${sofia.variable} antialiased`}
      >
        <ClientProviders>
          {!isCoarse && <AnimCursor />}
          <BookHeader />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
