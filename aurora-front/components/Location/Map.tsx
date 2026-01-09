"use client";

import { MapProps } from "@/utils/interfaces";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { CircleSpinner } from "../UI";

export default function Map({ zoom = 14, className, detailsMap }: MapProps) {
  const lat = Number(process.env.NEXT_PUBLIC_LAT);
  const lng = Number(process.env.NEXT_PUBLIC_LNG);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_KEY!,
  });
  const height = detailsMap ? "450px" : "700px";

  return (
    <div style={{ width: "100%", height }}>
      {isLoaded ? (
        <GoogleMap
          center={{ lat, lng }}
          zoom={zoom}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          mapContainerClassName={className}
        />
      ) : (
        <CircleSpinner visible />
      )}
    </div>
  );
}
