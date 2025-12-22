"use client";
import "@/app/globals.css";

import { Roboto, Princess_Sofia, Quintessential } from "next/font/google";
import ClientProviders from "@/ClientProviders";
import { AnimCursor, BookHeader } from "@/components";
import Script from "next/script";

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
      <head>
        <link
          rel="preload"
          as="image"
          href="/beach2.jpg"
          imageSrcSet="/beach2.jpg"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${roboto.variable} ${quintessential.variable} ${sofia.variable} antialiased`}
      >
        <ClientProviders>
          {!isCoarse && <AnimCursor />}
          <BookHeader />
          <Script
            id="gmaps"
            strategy="afterInteractive"
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GMAPS_KEY}&v=weekly&libraries=marker&loading=async`}
          />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
