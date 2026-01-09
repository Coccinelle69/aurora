"use client";

import Link from "next/link";

const Copyrights = () => {
  return (
    <div className="bg-footer-bg ">
      <div className="mx-auto w-full max-w-6xl px-6 py-6">
        <p className=" text-marineBlue md:block text-center text-sm ">
          Copyrights @ 2026 | auroraapartment.hr |{" "}
          <span aria-hidden="true">|</span>{" "}
          <Link href="#" className="underline">
            Privacy Policy
          </Link>{" "}
          <span aria-hidden="true">|</span>{" "}
          <Link href="#" className="underline">
            Terms & Conditions
          </Link>
        </p>
      </div>

      {/* Added role and aria-label to the existing div */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-40"
        aria-label="Why book directly"
      >
        <div className="bg-[#17364e]/95 backdrop-blur px-4 py-3 shadow-2xl">
          <div className="flex items-center justify-between gap-3">
            <button
              aria-haspopup="dialog"
              className="flex-1 text-center rounded-xl px-4 py-3 text-sm font-medium bg-white text-[#17364e] hover:opacity-90"
            >
              Why book directly?
            </button>
          </div>
        </div>
      </div>

      <div className="h-16 md:hidden" aria-hidden="true" />
    </div>
  );
};

export default Copyrights;
