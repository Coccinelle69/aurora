import "../globals.css";

import ClientProviders from "@/ClientProviders";
import { BookHeader } from "@/components";
import ClientWrapper from "@/app/ClientWrapper";
import { Metadata } from "next";
import localFont from "next/font/local";

const sofia = localFont({
  src: "../fonts/PrincessSofia-Regular.ttf",
  variable: "--font-logo",
  display: "swap",
});

const roboto = localFont({
  src: [
    { path: "../fonts/Roboto-Regular.ttf", weight: "400" },
    { path: "../fonts/Roboto-Medium.ttf", weight: "500" },
  ],
  variable: "--font-body",
  display: "swap",
});

const quintessential = localFont({
  src: "../fonts/Quintessential-Regular.ttf",
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

export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${roboto.variable} ${quintessential.variable} ${sofia.variable} antialiased`}
      >
        <ClientProviders>
          <ClientWrapper>
            <BookHeader />

            {children}
          </ClientWrapper>
        </ClientProviders>
      </body>
    </html>
  );
}
