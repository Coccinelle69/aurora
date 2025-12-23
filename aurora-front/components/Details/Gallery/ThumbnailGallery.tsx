import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import * as houseImages from "@/assets/carousel";

const ThumbnailGallery = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    slidesToScroll: "auto",
    align: "start",
    loop: true,
    skipSnaps: false,
  });

  const slides = Object.values(houseImages);

  return (
    <div ref={emblaRef} className="hidden lg:flex flex-col flex-1 gap-4">
      {slides.map((src, i) => (
        <button
          key={i}
          className={`relative flex-1 w-full overflow-hidden transition-all duration-300 ${
            i === 0 ? "rounded-tr-3xl" : ""
          } ${i === slides.length - 1 ? "rounded-br-3xl" : ""}`}
        >
          <Image
            src={src}
            fill
            alt={`Thumbnail ${i + 1}`}
            className="object-cover"
          />
        </button>
      ))}
    </div>
  );
};

export default ThumbnailGallery;
