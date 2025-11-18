"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
  src: StaticImageData;
  alt: string;
}

export default function LazyImage({ src, alt }: LazyImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-300px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-1000 ease-out
    ${
      visible
        ? "opacity-100 scale-100 pointer-events-auto"
        : "opacity-0 scale-50 pointer-events-none"
    }
      `}
      style={{ minHeight: "200px" }}
    >
      {visible && (
        <Image
          src={src}
          alt={alt}
          width={src.width}
          height={src.height}
          className="w-full h-auto rounded-xl object-cover"
          loading="lazy"
        />
      )}
    </div>
  );
}
