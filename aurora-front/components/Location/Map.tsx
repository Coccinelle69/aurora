// app/components/MapWithMarker.tsx
"use client";

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
    let ro: ResizeObserver | null = null;

    const tryInit = async () => {
      if (inited.current) return;
      const el = elRef.current;
      if (!el) return;

      const { width, height } = el.getBoundingClientRect();
      if (width < 20 || height < 20) return; // wait until visible size
      if (!("google" in window) || !google.maps) return; // wait for script

      inited.current = true;

      // Ensure core maps lib is ready (noop on older builds)
      try {
        await (google.maps as any).importLibrary?.("maps");
      } catch {
        /* ignore; global constructor is fine */
      }

      // ✅ Use the global constructor (always constructible)
      const map = new google.maps.Map(el, {
        center: { lat, lng },
        zoom,
        gestureHandling: "greedy",
        mapId: process.env.NEXT_PUBLIC_GMAPS_MAP_ID, // optional; needed for AdvancedMarker
      });

      // Try Advanced Marker; fall back to classic Marker
      let AdvancedMarkerElement:
        | typeof google.maps.marker.AdvancedMarkerElement
        | undefined;

      try {
        const mlib = await (google.maps as any).importLibrary?.("marker");
        AdvancedMarkerElement = (mlib as google.maps.MarkerLibrary)
          ?.AdvancedMarkerElement;
      } catch {
        /* ignore */
      }

      if (!AdvancedMarkerElement && google.maps.marker?.AdvancedMarkerElement) {
        AdvancedMarkerElement = google.maps.marker.AdvancedMarkerElement;
      }

      if (AdvancedMarkerElement) {
        new AdvancedMarkerElement({ map, position: { lat, lng }, title });
      } else {
        new google.maps.Marker({ map, position: { lat, lng }, title });
      }
    };

    if (typeof window !== "undefined") {
      ro = new ResizeObserver(() => {
        void tryInit();
      });
      if (elRef.current) ro.observe(elRef.current);
      void tryInit();
    }
    return () => ro?.disconnect();
  }, [lat, lng, zoom, title]);

  return (
    <>
      {/* Load once per page (remove if already loaded globally) */}
      <Script
        id="gmaps"
        strategy="afterInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GMAPS_KEY}&v=weekly&loading=async&libraries=marker`}
      />
      <div
        ref={elRef}
        className={className}
        style={{
          width: "100%",
          height: "600px",
          position: "relative",
          background: "#f2f2f2",
          border: "1px solid #e5e5e5",
          zIndex: 0,
        }}
      />
    </>
  );
}
