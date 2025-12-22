/* eslint-disable @typescript-eslint/no-explicit-any */
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
    console.log("MAP COORDS", lat, lng, typeof lat, typeof lng);

    const init = async () => {
      if (inited.current) return;
      const el = elRef.current;
      if (!el || !("google" in window) || !google.maps) return;

      let map: google.maps.Map;

      // ----- maps library (modern vs legacy) -----
      if (typeof (google.maps as any).importLibrary === "function") {
        const { Map } = (await (google.maps as any).importLibrary(
          "maps"
        )) as google.maps.MapsLibrary;
        map = new Map(el, {
          center: { lat, lng },
          zoom,
          gestureHandling: "greedy",
          mapId: process.env.NEXT_PUBLIC_GMAPS_MAP_ID,
        });
      } else {
        // Legacy build: constructors are on the global
        map = new google.maps.Map(el, {
          center: { lat, lng },
          zoom,
          gestureHandling: "greedy",
        });
      }

      // ----- marker (advanced vs classic) -----
      try {
        if (typeof (google.maps as any).importLibrary === "function") {
          const { AdvancedMarkerElement } = (await (
            google.maps as any
          ).importLibrary("marker")) as google.maps.MarkerLibrary;
          new AdvancedMarkerElement({ map, position: { lat, lng }, title });
        } else if (google.maps.marker?.AdvancedMarkerElement) {
          new google.maps.marker.AdvancedMarkerElement({
            map,
            position: { lat, lng },
            title,
          });
        } else {
          new google.maps.Marker({ map, position: { lat, lng }, title });
        }
      } catch {
        new google.maps.Marker({ map, position: { lat, lng }, title });
      }

      inited.current = true;
    };

    init();
  }, [lat, lng, zoom, title]);

  return (
    <>
      <div
        ref={elRef}
        className={className}
        style={!detailsMap ? { width: "100%", height: 700 } : { height: 450 }}
      />
    </>
  );
}
