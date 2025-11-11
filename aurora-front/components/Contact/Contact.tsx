// app/components/ComfortSection.tsx
"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Quintessential, Roboto } from "next/font/google";
import ContactForm from "./ContactForm";
const quintessential = Quintessential({ subsets: ["latin"], weight: "400" });
const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default function ComfortSection() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* FULL-BLEED RIGHT PANEL (goes to the screen edge, taller than the photo) */}
      <div className="absolute right-0 top-28 h-[720px] w-[62vw] bg-[#D3DAE0]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* CONTENT LAYER (sits above the panel) */}
        <div className="relative z-10 flex items-center justify-between">
          {/* LEFT PHOTO (shorter than panel) */}
          <div className="hidden lg:block">
            <div className="h-[450px] w-[400px] bg-[#234361] overflow-hidden shadow-[0_35px_35px_rgba(0,0,0,0.20)]">
              <h2>Aurora Apartment</h2>
              <div>
                <p>Phone:</p>
                <p>+385 92138 5595</p>
              </div>
              <div>
                <p>Email: </p>
                <p>dorotea0105@gmail.com</p>
              </div>
            </div>
          </div>

          {/* RIGHT COPY AREA (centered inside the gray panel) */}
          <div className="ml-auto flex w-full justify-center lg:w-[47%]">
            <ContactForm />
          </div>
        </div>

        {/* MOBILE: stacked layout */}
      </div>
    </section>
  );
}
