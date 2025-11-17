import Image from "next/image";

interface IconProps {
  src: string;
  alt: string;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon = ({ src, alt, size = 50, color = "white" }: IconProps) => (
  <>
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="hover:scale-125 transition-transform duration-300 ease-out"
      style={{
        filter:
          color === "#4a6ca3"
            ? "invert(38%) sepia(18%) saturate(734%) hue-rotate(178deg) brightness(94%) contrast(89%)"
            : color === "white"
            ? "invert(1) brightness(100%)"
            : "none",
      }}
    />
  </>
);
