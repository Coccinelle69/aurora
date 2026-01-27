import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RefineContext from "@/providers/refine-context";
import { BackgroundImage } from "@/components";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sofia = localFont({
  src: "./fonts/PrincessSofia-Regular.woff2",
  variable: "--font-logo",
  display: "swap",
});

const quintessential = localFont({
  src: "./fonts/Quintessential-Regular.woff2",
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurora Apartment Dashboard",
  description:
    "Internal management system for Aurora Apartments, Zukve. Manage bookings, payments, guest communication and property maintenance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${quintessential.variable} ${sofia.variable} antialiased`}
      >
        <RefineContext>
          <BackgroundImage>{children}</BackgroundImage>
        </RefineContext>
      </body>
    </html>
  );
}
