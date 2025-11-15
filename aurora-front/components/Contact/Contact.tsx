"use client";
import { ContactForm, DirectionsButton, Email, Phone, Socials } from "../index";

export default function Contact() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="absolute right-0 top-28 h-[950px] lg:h-[900px] w-[62vw] bg-[#D3DAE0]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
          <div className="order-2 lg:order-1 flex justify-center lg:block mt-9 lg:mt-0">
            <div className="h-[600px] w-[300px] lg:h-[650px] w-[400px] font-body bg-[#234361] overflow-hidden p-[3rem] shadow-[0_35px_35px_rgba(0,0,0,0.20)] ">
              <h2 className="font-heading mb-[1rem] text-[3rem]">
                Aurora Apartment
              </h2>
              <div className="mb-[1rem]">
                <Phone />
              </div>
              <div className="mb-[1rem]">
                <Email />
              </div>
              <div className="mb-[1rem]">
                <DirectionsButton />
              </div>
              <div className="mb-[1rem]">
                <Socials />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 ml-auto flex w-full  justify-center mt-30 lg:mt-0 lg:w-[52%]">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
