"use client";

import Image from "next/image";

export default function LogoAurora({ size = 180 }: { size?: number }) {
  return (
    <Image
      src="/logo.png"
      alt="Aurora logo"
      width={size}
      height={size}
      priority
    />
  );
}
