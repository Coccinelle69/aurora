"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
  src: StaticImageData;
  alt: string;
  openBackdrop: React.Dispatch<React.SetStateAction<number | null>>;
  index: number;
}

export default function LazyImage({
  src,
  alt,
  openBackdrop,
  index,
}: LazyImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true); // reveal ONLY when visible
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
      mx-4 lg:mx-0 transition-all duration-1000 ease-out h-auto block
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
          className="w-full h-auto rounded-xl object-cover "
          loading="lazy"
        />
      )}
      <div
        onClick={() => openBackdrop(index)}
        className="absolute inset-0 rounded-xl bg-black opacity-0 hover:opacity-60 transition-opacity duration-300 cursor-pointer"
      />
    </div>
  );
}
