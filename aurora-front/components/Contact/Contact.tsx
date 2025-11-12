"use client";
import { useTranslation } from "react-i18next";
import ContactForm from "./ContactForm";
import { useDirections } from "@/utils/hooks/useDirections";

export default function Contact() {
  const { t } = useTranslation();
  const { getDirections } = useDirections({
    lat: Number(process.env.NEXT_PUBLIC_LAT),
    lon: Number(process.env.NEXT_PUBLIC_LON),
  });

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
              <div>
                <p>Google Maps: </p>
                <button
                  onClick={getDirections}
                  className="rounded-xl px-4 py-3 bg-white text-[#17364e] hover:opacity-90"
                >
                  Get directions
                </button>
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
