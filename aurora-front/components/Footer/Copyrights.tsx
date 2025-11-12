"use client";

import Link from "next/link";

const Copyrights = () => {
  return (
    <div className="bg-footer-bg ">
      {/* Bottom bar: copyright (shown md+), mobile sticky quick row (sm only) */}
      <div className="mx-auto w-full max-w-6xl px-6 py-6">
        {/* Visible copyright on md+ */}
        <p className=" text-marineBlue md:block text-center text-sm ">
          Copyrights @ 2026 | auroraapartment.hr |{" "}
          <Link href="#" className="underline">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link href="#" className="underline">
            Terms & Conditions
          </Link>
        </p>
      </div>

      {/* Mobile sticky bottom row (only on small screens). If you have additional
          actions (call, map, book now), add them here; request was to show
          only the "Why to book directly?" row on small screens. */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        <div className="bg-[#17364e]/95 backdrop-blur px-4 py-3 shadow-2xl">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="#why-to-book"
              className="flex-1 text-center rounded-xl px-4 py-3 text-sm font-medium bg-white text-[#17364e] hover:opacity-90"
            >
              Why book directly?
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer so content above doesn't hide behind the sticky row on mobile */}
      <div className="h-16 md:hidden" />
    </div>
  );
};

export default Copyrights;
