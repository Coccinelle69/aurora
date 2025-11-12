"use client";

import Link from "next/link";
import { FacebookIcon, InstagramIcon } from "@/icons";
import Copyrights from "./Copyrights";
import BookButton from "../UI/BookButton";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function Footer() {
  const { t } = useTranslation();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      try {
        const res = await fetch("/api/weather", { cache: "no-store" });
        if (!res.ok) {
          const msg = await res.text(); // don't call res.json() on failures
          if (!cancelled)
            setError(`Weather error ${res.status}: ${msg || "no body"}`);
          return;
        }
        const data = await res.json();
        if (!cancelled) setWeather(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Network error");
      }
    }

    loadWeather();
    console.log(weather);
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <footer className="bg-babyBlue text-white">
      {/* Top content */}
      <div
        className="
          mx-auto w-full max-w-6xl px-6 py-16
          grid grid-cols-1 gap-12 md:grid-cols-4
          text-center md:text-left
          md:items-start     /* align items to start on md+ */
        "
      >
        {/* Weather & Time */}
        <div className="w-full flex flex-col items-center md:items-start">
          <h3 className="font-heading text-2xl font-semibold tracking-wide mb-6">
            Weather & Time
          </h3>
          <div className="space-y-2">
            <p className="text-sm font-semibold">Time:</p>
            <div className="h-10 w-10 rounded bg-white/10 flex items-center justify-center mx-auto md:mx-0">
              <span className="text-xs opacity-70">img</span>
            </div>
          </div>
        </div>

        {/* Find us */}
        <div className="w-full flex flex-col items-center md:items-start">
          <h3 className="font-heading text-2xl font-semibold tracking-wide mb-6">
            Find us
          </h3>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold">Phone:</p>
              <Link
                href="tel:+385921385595"
                className="mt-1 inline-flex items-center gap-2 hover:underline"
              >
                +385 92138 5595
              </Link>
            </div>

            <div>
              <p className="text-sm font-semibold">Email:</p>
              <Link
                href="mailto:dorotea0105@gmail.com"
                className="mt-1 inline-flex items-center gap-2 hover:underline"
              >
                dorotea0105@gmail.com
              </Link>
            </div>
          </div>
        </div>

        {/* Contact / Social */}
        <div className="w-full flex flex-col items-center md:items-start">
          <h3 className="font-heading text-2xl font-semibold tracking-wide mb-6">
            Contact
          </h3>
          <p className="text-sm font-semibold">Follow us</p>
          <p className="text-sm opacity-90 mb-4">on Social media</p>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <Link
              aria-label="Facebook"
              href="#"
              className="h-10 w-10 grid place-items-center rounded-full text-[#17364e] hover:opacity-90"
            >
              <FacebookIcon size={25} />
            </Link>
            <Link
              aria-label="Instagram"
              href="#"
              className="h-10 w-10 grid place-items-center rounded-full text-[#17364e] hover:opacity-90"
            >
              <InstagramIcon size={25} />
            </Link>
          </div>
        </div>

        {/* Location / CTA */}
        {/* If you want this visible from md and up, use hidden md:flex. 
           Your previous sm:hidden lg:flex hides it on md (768–1023px) which can create odd gaps. */}
        <div className="hidden md:flex w-full flex-col items-center md:items-start">
          <h3 className="font-heading text-2xl font-semibold tracking-wide mb-6">
            Location
          </h3>
          <p className="text-sm font-semibold mb-3">Book now</p>
          <BookButton />
        </div>
      </div>

      {/* Divider */}
      <div className="h-[2px] w-full bg-white/10" />

      <Copyrights />
    </footer>
  );
}
