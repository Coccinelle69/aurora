"use client";

import DistanceSection from "@/components/Location/DistanceSection";
import dynamic from "next/dynamic";
const MapWithMarker = dynamic(
  () => import("@/components").then((mod) => mod.MapWithMarker),
  { ssr: false, loading: () => <div style={{ height: "100%" }} /> }
);

export default function Location() {
  console.log(
    "[GMAPS] key?",
    process.env.NEXT_PUBLIC_GMAPS_KEY?.slice(0, 6) + "…"
  );
  console.log("[GMAPS] mapId?", process.env.NEXT_PUBLIC_GMAPS_MAP_ID);

  return (
    <main>
      <MapWithMarker
        lat={44.2524}
        lng={15.211}
        zoom={14}
        // markerTitle="Zukve, Croatia"
      />
      <DistanceSection />
    </main>
  );
}
