"use client";
import {
  CheckoutCard,
  CheckoutForm,
  Description,
  DetailsFooter,
  DetailsGallery,
  MapWithMarker,
} from "@/components";
import * as houseImages from "@/assets/carousel";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useRef, useState } from "react";
const DetailsPage = () => {
  const internalNavigationRef = useRef(false);
  const slides = Object.values(houseImages);
  const router = useRouter();
  const [checkoutUI, setCheckoutUI] = useState({
    checkoutCardRemove: false,
    checkoutFormRemove: true,
    changeUI: false,
  });

  const { departure } = useAppSelector((state) => state.search);

  useEffect(() => {
    if (!departure) {
      router.replace("/book");
    }
  }, [departure, router]);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/book/details/checkout") {
      if (!internalNavigationRef.current) {
        router.replace("/book/details");
      }
      internalNavigationRef.current = false;
    }
  }, [pathname, router]);

  if (!departure) return null;

  return (
    <main>
      <div className="bg-[#dce4eb] w-[96%] mx-auto pb-3">
        <DetailsGallery slides={slides} />
        <div className="mt-0 sm:mt-6 mx-4 sm:mx-12  flex flex-col lg:flex-row gap-40 items-start">
          <Description />

          {!checkoutUI.checkoutCardRemove && (
            <CheckoutCard
              checkoutUI={checkoutUI}
              setCheckoutUI={setCheckoutUI}
              internalNavigationRef={internalNavigationRef}
            />
          )}

          {!checkoutUI.checkoutFormRemove && (
            <CheckoutForm
              checkoutUI={checkoutUI}
              setCheckoutUI={setCheckoutUI}
            />
          )}
        </div>
        <MapWithMarker
          lat={Number(process.env.NEXT_PUBLIC_LAT)}
          lng={Number(process.env.NEXT_PUBLIC_LNG)}
          zoom={25}
          detailsMap={true}
          className="mx-auto 2xl:mx-20 my-12 lg:mt-35  rounded-2xl overflow-hidden w-[90%] 2xl:w-[50%]"
        />
      </div>
      <div className="bg-[#f1f1f1] h-0.5 w-[50%] mx-auto my-16"></div>
      <DetailsFooter />
    </main>
  );
};

export default DetailsPage;
