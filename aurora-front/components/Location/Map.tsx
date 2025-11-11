"use client";

/* global google */

import { useEffect, useRef } from "react";
import Script from "next/script";

type Props = {
  lat: number;
  lng: number;
  zoom?: number;
  title?: string;
  className?: string;
};

export default function MapWithMarker({
  lat,
  lng,
  zoom = 14,
  title = "Location",
  className,
}: Props) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const inited = useRef(false);

  useEffect(() => {
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
      {/* Ensure this script is loaded ONCE per page/app */}
      <Script
        id="gmaps"
        strategy="afterInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GMAPS_KEY}&v=weekly&libraries=marker&loading=async`}
        onLoad={() => {
          // try init again right after the script becomes available
          if (!inited.current) {
            // let the effect run again naturally on next tick
          }
        }}
      />
      <div
        ref={elRef}
        className={className}
        style={{ width: "100%", height: 600 }}
      />
    </>
  );
}
