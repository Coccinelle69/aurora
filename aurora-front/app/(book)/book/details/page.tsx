"use client";
import {
  CheckoutCard,
  Description,
  DetailsFooter,
  DetailsGallery,
  DetailsMap,
} from "@/components";
import * as houseImages from "@/assets/carousel";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { useLayoutEffect } from "react";
const DetailsPage = () => {
  const slides = Object.values(houseImages);
  const router = useRouter();

  const { departure } = useAppSelector((state) => state.search);

  useLayoutEffect(() => {
    if (!departure) {
      router.replace("/book");
    }
  }, [departure, router]);

  if (!departure) return null;

  return (
    <div>
      <div className="bg-[#dce4eb] w-[96%] mx-auto pb-[0.75rem]">
        <DetailsGallery slides={slides} />
        <div className="mt-0 sm:mt-[1.5rem] mx-[1rem] sm:mx-[3rem] sm:mx-[5rem] flex flex-col sm:flex-row gap-[5rem] items-start">
          <Description />
          <CheckoutCard />
        </div>
        <DetailsMap
          lat={Number(process.env.NEXT_PUBLIC_LAT)}
          lng={Number(process.env.NEXT_PUBLIC_LNG)}
          zoom={25}
        />
      </div>
      <div className="bg-[#f1f1f1] h-[2px] w-[50%] mx-auto my-[4rem]"></div>
      <DetailsFooter />
    </div>
  );
};

export default DetailsPage;
