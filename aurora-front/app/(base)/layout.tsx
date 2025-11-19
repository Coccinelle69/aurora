import type { Metadata } from "next";
import "../globals.css";

import { Roboto, Princess_Sofia, Quintessential } from "next/font/google";
import ClientProviders from "../../ClientProviders";
import { Footer, Header } from "@/components";
import { AnimCursor } from "../../components/index";

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
  description: "Cozy family apartment 70m from the sea",
};

export default function BaseLayout({
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

          <Header />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
