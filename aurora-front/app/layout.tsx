import type { Metadata } from "next";
import "./globals.css";

import { Cinzel_Decorative, Roboto } from "next/font/google";
import ClientProviders from "../ClientProviders";

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Aurora Apartment - 70m from the sea",
  description: "Cozy family apartment 70m from the sea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${cinzel.variable}  antialiased`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
