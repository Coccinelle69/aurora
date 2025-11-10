// app/components/MapWithMarker.tsx
"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

type Props = {
  lat: number;
  lng: number;
  zoom?: number;
  markerTitle?: string;
};

export default function MapWithMarker({
  lat,
  lng,
  zoom = 14,
  markerTitle = "Zukve,Croatia",
}: Props) {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let map: google.maps.Map | undefined;

    const init = async () => {
      if (!window.google || !divRef.current) return;

      // Load libraries via the functional API
      const { Map } = (await google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;

      map = new Map(divRef.current, {
        center: { lat, lng },
        zoom,
        gestureHandling: "greedy",
        disableDefaultUI: false,
      });

      try {
        // Prefer the new AdvancedMarker
        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          "marker"
        )) as google.maps.MarkerLibrary;

        new AdvancedMarkerElement({
          map,
          position: { lat, lng },
          title: markerTitle,
        });
      } catch {
        // Fallback to classic Marker if marker library isn’t available
        new google.maps.Marker({
          map,
          position: { lat, lng },
          title: markerTitle,
        });
      }
    };

    init();
    return () => {
      // Cleanup is minimal; Maps handles most on GC
    };
  }, [lat, lng, zoom, markerTitle]);

  return (
    <>
      <Script
        id="gmaps"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GMAPS_KEY}&v=weekly`}
        strategy="afterInteractive"
      />
      <div ref={divRef} style={{ width: "100%", height: 420 }} />
    </>
  );
}
