"use client";
import {
  ContactForm,
  DirectionsButton,
  Email,
  Phone,
  Socials,
} from "@/components";

export default function Contact() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="absolute right-0 top-28 h-[1100px] md:h-[1000px] xl:h-[950px]  w-[60vw] md:w-[62vw] bg-[#D3DAE0]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
          <div className="order-2 lg:order-1 flex justify-center lg:block mt-9 lg:mt-0">
            <div className="relative lg:left-25  h-[600px] lg:h-[650px] w-[400px] font-body bg-[#234361] overflow-hidden p-12 shadow-[0_35px_35px_rgba(0,0,0,0.20)] ">
              <h2 className="font-heading mb-4 text-[3rem] text-center lg:text-left">
                Aurora Apartment
              </h2>
              <div className="mb-4">
                <Phone />
              </div>
              <div className="mb-4">
                <Email />
              </div>
              <div className="mb-4">
                <DirectionsButton />
              </div>
              <div className="mb-4">
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
