"use client";

import { useEffect, useRef } from "react";
import { MapProps } from "@/utils/interfaces";

export default function MapWithMarker({
  lat,
  lng,
  zoom = 14,
  title = "Location",
  className,
  detailsMap,
}: MapProps) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    if (!elRef.current) return;

    const init = async () => {
      const { Map } = (await google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;

      const map = new Map(elRef.current!, {
        center: { lat, lng },
        zoom,
        gestureHandling: "greedy",
        mapId: process.env.NEXT_PUBLIC_GMAPS_MAP_ID,
      });

      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      new AdvancedMarkerElement({
        map,
        position: { lat, lng },
        title,
      });

      inited.current = true;
    };

    init().catch(console.error);
  }, [lat, lng, zoom, title]);

  return (
    <div
      ref={elRef}
      className={className}
      style={!detailsMap ? { width: "100%", height: 700 } : { height: 450 }}
    />
  );
}
