"use client";
import "@/app/globals.css";

import { Roboto, Princess_Sofia, Quintessential } from "next/font/google";
import ClientProviders from "@/ClientProviders";
import { BookHeader } from "@/components";
import Script from "next/script";
import ClientWrapper from "@/app/ClientWrapper";

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
          <ClientWrapper>
            <BookHeader />
            <Script
              id="gmaps"
              strategy="afterInteractive"
              src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GMAPS_KEY}&v=weekly&libraries=marker&loading=async`}
            />
            {children}
          </ClientWrapper>
        </ClientProviders>
      </body>
    </html>
  );
}
