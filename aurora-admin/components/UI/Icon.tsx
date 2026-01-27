import { IconProps } from "@/utils/interfaces";
import Image from "next/image";

export const Icon = ({
  src,
  size = 50,
  color = "white",
  className,
  hover = false,
}: IconProps) => (
  <>
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      unoptimized
      aria-hidden="true"
      className={`${hover && "hover:scale-125 transition-transform duration-300 ease-out"} ${className}`}
      style={{
        filter:
          color === "#4a6ca3" ||
          color === "#9AD5FF" ||
          color === "#1a3c5b" ||
          color == "#11344b"
            ? "invert(38%) sepia(18%) saturate(734%) hue-rotate(178deg) brightness(94%) contrast(89%)"
            : color === "white"
              ? "invert(1) brightness(100%)"
              : "none",
      }}
    />
  </>
);
