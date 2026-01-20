import type { Metadata } from "next";
import "../globals.css";

import ClientProviders from "@/ClientProviders";
import { Footer, GooeyFilter, Header } from "@/components";
import ClientWrapper from "@/app/ClientWrapper";
import localFont from "next/font/local";

const sofia = localFont({
  src: "../fonts/PrincessSofia-Regular.woff2",
  variable: "--font-logo",
  display: "swap",
});

const roboto = localFont({
  src: [
    { path: "../fonts/Roboto-Regular.woff2", weight: "400" },
    { path: "../fonts/Roboto-Medium.woff2", weight: "500" },
  ],
  variable: "--font-body",
  display: "swap",
});

const quintessential = localFont({
  src: "../fonts/Quintessential-Regular.woff2",
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurora Apartment - 70m from the sea",
  description:
    "Aurora Apartment is a newly renovated 75m² seaside rental in Zukve, Vrsi near Zadar. Perfect for families • 3 min walk to the beach • Modern amenities • Free parking.",
  keywords: [
    "Aurora Apartment Vrsi",
    "apartment Vrsi Zadar",
    "Zukve rental",
    "holiday apartment Croatia",
    "seaside apartment Zadar",
    "Zadar rental",
    "Aurora",
  ],
};

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link
          rel="preconnect"
          href="https://maps.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
      </head>
      <body
        suppressHydrationWarning
        className={`${roboto.variable} ${quintessential.variable} ${sofia.variable} antialiased`}
      >
        <ClientProviders>
          <ClientWrapper>
            <Header />

            {children}
            <Footer />
          </ClientWrapper>
        </ClientProviders>
        <GooeyFilter />
      </body>
    </html>
  );
}
