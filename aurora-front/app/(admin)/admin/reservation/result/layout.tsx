import "@/app/globals.css";
import { Metadata } from "next";
import { Princess_Sofia, Quintessential, Roboto } from "next/font/google";

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

const sofia = Princess_Sofia({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const quintessential = Quintessential({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`h-full bg-babyBlue ${sofia.variable} ${roboto.variable} ${quintessential.variable}`}
      >
        <div className="min-h-full flex items-center justify-center px-6">
          {children}
        </div>
      </body>
    </html>
  );
}
