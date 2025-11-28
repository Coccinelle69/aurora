import { DetailsGallery, DetailsMap } from "@/components";
import * as houseImages from "@/assets/carousel";
const DetailsPage = () => {
  const slides = Object.values(houseImages);

  return (
    <div className="bg-[#dce4eb] w-[96%] mx-auto">
      <DetailsGallery slides={slides} />
      <DetailsMap
        lat={Number(process.env.NEXT_PUBLIC_LAT)}
        lng={Number(process.env.NEXT_PUBLIC_LNG)}
        zoom={28}
      />
    </div>
  );
};

export default DetailsPage;
