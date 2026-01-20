import "../../../../globals.css";
import { Metadata } from "next";
import localFont from "next/font/local";

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

const sofia = localFont({
  src: "../../../../fonts/PrincessSofia-Regular.woff2",
  variable: "--font-logo",
  display: "swap",
});

const roboto = localFont({
  src: [
    { path: "../../../../fonts/Roboto-Regular.woff2", weight: "400" },
    { path: "../../../../fonts/Roboto-Medium.woff2", weight: "500" },
  ],
  variable: "--font-body",
  display: "swap",
});

const quintessential = localFont({
  src: "../../../../fonts/Quintessential-Regular.woff2",
  variable: "--font-heading",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        suppressHydrationWarning
        className={`h-full bg-babyBlue ${sofia.variable} ${roboto.variable} ${quintessential.variable}`}
      >
        <div className="min-h-full flex items-center justify-center px-6">
          {children}
        </div>
      </body>
    </html>
  );
}
