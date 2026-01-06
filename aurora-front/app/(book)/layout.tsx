import "@/app/globals.css";

import { Roboto, Princess_Sofia, Quintessential } from "next/font/google";
import ClientProviders from "@/ClientProviders";
import { BookHeader } from "@/components";
import Script from "next/script";
import ClientWrapper from "@/app/ClientWrapper";
import { Metadata } from "next";

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
      <head>
        <link
          rel="preload"
          as="image"
          href="/beach2.jpg"
          imageSrcSet="/beach2.jpg"
        />
        <Script
          id="gmaps"
          strategy="beforeInteractive"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GMAPS_KEY}&v=weekly&libraries=marker&loading=async`}
        />
      </head>
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
