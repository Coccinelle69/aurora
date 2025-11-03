"use client";

import Image from "next/image";
import { Princess_Sofia } from "next/font/google";
const sofia = Princess_Sofia({ subsets: ["latin"], weight: "400" });

export default function LogoAurora({
  size = 180,
  className,
  fullscreen,
}: {
  size?: number;
  className: string;
  fullscreen: boolean;
}) {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center">
        <Image
          src="/header/image.png"
          alt="Aurora logo"
          width={size}
          height={size}
          priority
          className={`h-auto w-auto max-w-none ${className} ${
            fullscreen ? "h-[150px] w-[150px]" : ""
          }`} // allow growth
        />
        <p
          className={`
          ${sofia.className}
          absolute flex items-center justify-center text-white tracking-[0.25rem]
          z-10 pointer-events-none transition-all duration-500 ease-out
          ${
            fullscreen
              ? // ✅ Fullscreen — center it completely and enlarge it
                "text-[3rem] left-1/2 -translate-x-1/2 bottom-[10rem] lg:text-[6rem] top-1/2 left-1/2 -translate-x-1/2 translate-y-20"
              : // ✅ Default — responsive per breakpoint
                "text-[2.5rem] left-[4.5rem] top-[10.5rem] lg:left-[4rem] lg:top-[10.5rem] lg:text-[3.25rem]"
          }
        `}
        >
          Aurora
        </p>
      </div>
    </>
  );
}
