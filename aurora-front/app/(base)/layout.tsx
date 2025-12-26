import type { Metadata } from "next";
import "@/globals.css";

import { Roboto, Princess_Sofia, Quintessential } from "next/font/google";
import ClientProviders from "@/ClientProviders";
import { Footer, Header } from "@/components";
import ClientWrapper from "@/app/ClientWrapper";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const sofia = Princess_Sofia({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
  display: "swap",
});

const quintessential = Quintessential({
  subsets: ["latin"],
  weight: "400",
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
      <body
        suppressHydrationWarning
        className={`${roboto.variable} ${quintessential.variable} ${sofia.variable} antialiased`}
      >
        {" "}
        <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
          <filter id="gooey" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 20 -10
              "
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </svg>
        <ClientProviders>
          <ClientWrapper>
            <Header />
            {children}
            <Footer />
          </ClientWrapper>
        </ClientProviders>
      </body>
    </html>
  );
}
