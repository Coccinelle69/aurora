import Image from "next/image";

interface IconProps {
  src: string;
  alt: string;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon = ({
  src,
  alt,
  size = 48,
  color = "white",
  className = "",
}: IconProps) => (
  <div className="">
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="hover:scale-125 transition-transform duration-300 ease-out"
      style={{
        filter:
          color === "white"
            ? "invert(1) brightness(100%)"
            : "invert(0) brightness(1)",
      }}
    />
  </div>
);
