"use client";
import {
  CheckoutCard,
  CheckoutForm,
  CircleSpinner,
  Description,
  DetailsFooter,
  DetailsGallery,
} from "@/components";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const DetailsWrapper = () => {
  const internalNavigationRef = useRef(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  const [checkoutUI, setCheckoutUI] = useState({
    checkoutCardRemove: false,
    checkoutFormRemove: true,
    changeUI: false,
  });
  const [shouldLoadMap, setShouldLoadMap] = useState(false);

  const { departure } = useAppSelector((state) => state.search);

  useEffect(() => {
    if (!departure) {
      router.replace("/book");
    }
    if (pathname === "/book/details/checkout") {
      if (!internalNavigationRef.current) {
        router.replace("/book/details");
      }
      internalNavigationRef.current = false;
    }
  }, [departure, router, pathname]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.01,
      }
    );

    observer.observe(mapContainerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!departure) return null;

  const MapPlaceholder = () => (
    <div
      style={{
        width: "100%",
        height: "700px",
        backgroundColor: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="animate-pulse">
        <CircleSpinner visible />
      </div>
    </div>
  );

  const Map = dynamic(() => import("@/components/Location/Map"), {
    ssr: false,
    loading: () => <MapPlaceholder />,
  });

  return (
    <div>
      <div className="bg-[#dce4eb] w-[96%] mx-auto pb-3">
        <DetailsGallery />
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
        <div
          style={{ height: "450px" }}
          className="mx-auto 2xl:mx-20 my-1 lg:mt-35 w-[90%] 2xl:w-[50%]  mb-7 mt-5"
        >
          {shouldLoadMap ? (
            <Map zoom={18} detailsMap={true} className="rounded-3xl" />
          ) : (
            <MapPlaceholder />
          )}
        </div>
      </div>
      <div className="bg-[#f1f1f1] h-0.5 w-[50%] mx-auto my-16"></div>
      <DetailsFooter />
    </div>
  );
};

export default DetailsWrapper;
