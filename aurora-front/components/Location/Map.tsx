"use client";

import { useState, useEffect, useRef, memo, useMemo } from "react";
import { MapProps } from "@/utils/interfaces";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const MAP_OPTIONS = {
  gestureHandling: "greedy",
  disableDefaultUI: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
};

const MAP_CONTAINER_STYLE = {
  height: "100%",
};

const Map = memo(function Map({ zoom = 14, className, detailsMap }: MapProps) {
  const [hasIntersected, setHasIntersected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const lat = Number(process.env.NEXT_PUBLIC_LAT);
  const lng = Number(process.env.NEXT_PUBLIC_LNG);
  const apiKey = process.env.NEXT_PUBLIC_GMAPS_KEY!;

  const center = useMemo(() => ({ lat, lng }), [lat, lng]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    preventGoogleFontsLoading: true,
    version: "weekly",
  });

  const height = detailsMap ? "450px" : "700px";

  return (
    <div
      ref={containerRef}
      style={
        !detailsMap
          ? { width: "100%", height, position: "relative" }
          : {
              position: "relative",
              height,
            }
      }
    >
      {hasIntersected && isLoaded && (
        <GoogleMap
          center={center}
          mapContainerStyle={MAP_CONTAINER_STYLE}
          mapContainerClassName={className}
          zoom={zoom}
          options={MAP_OPTIONS}
        />
      )}
    </div>
  );
});

export default Map;
