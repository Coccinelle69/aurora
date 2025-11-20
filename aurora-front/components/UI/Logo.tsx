"use client";

import Image from "next/image";

export default function LogoAurora({
  size = 180,
  className,
  fullscreen,
}: {
  size?: number;
  className?: string;
  fullscreen: boolean;
}) {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center ">
        <Image
          src="/header/image.png"
          alt="Aurora logo"
          width={size}
          height={size}
          priority
          className={`${className} ${
            fullscreen
              ? "h-full w-full lg:max-w-none  h-[600px] lg:w-[600px]" // <-- add lg: to w
              : ""
          }`}
        />
        <p
          className={`
          font-logo
          absolute flex items-center justify-center text-white tracking-[0.25rem]
          z-10 pointer-events-none transition-all duration-500 ease-out
          ${
            fullscreen
              ? // ✅ Fullscreen — center it completely and enlarge it
                "text-[3.5rem] left-1/2 -translate-x-1/2 bottom-[10rem] lg:text-[7rem] top-1/2 left-1/2 -translate-x-1/2 translate-y-20"
              : // ✅ Default — responsive per breakpoint
                "text-[2rem] left-[2.5rem] top-[7rem] lg:left-[2rem] lg:top-[7.75rem] lg:text-[3.25rem]"
          }
        `}
        >
          Aurora
        </p>
      </div>
    </>
  );
}
