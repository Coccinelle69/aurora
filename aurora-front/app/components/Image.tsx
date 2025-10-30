import Image from "next/image";

type AppImageProps = {
  src: string;
  alt: string;
  size?: number;
  color?: string;
};

export const AppImage = ({
  src,
  alt,
  size = 48,
  color = "white",
}: AppImageProps) => (
  <Image
    src={src}
    alt={alt}
    width={size}
    height={size}
    style={{
      filter:
        color === "white"
          ? "invert(1) brightness(100%)"
          : "invert(0) brightness(1)",
    }}
  />
);
