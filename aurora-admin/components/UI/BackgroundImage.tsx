import Image from "next/image";

const BackgroundImage = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="fixed inset-0 -z-10">
      <Image
        src="/admin/bg.webp"
        alt="Aurora beach view"
        className="object-cover object-center"
        style={{ imageRendering: "-webkit-optimize-contrast" }} // Forces sharpness        sizes="100vw"
        fill
        quality={100}
        priority
        unoptimized={true}
        fetchPriority="high"
        placeholder="empty"
      />
    </div>
    {children}
  </>
);

export default BackgroundImage;
