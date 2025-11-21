"use client";

import { DistanceSection } from "@/components";
import dynamic from "next/dynamic";
const MapWithMarker = dynamic(
  () => import("@/components").then((mod) => mod.MapWithMarker),
  { ssr: false, loading: () => <div style={{ height: "100%" }} /> }
);

export default function LocationPage() {
  console.log(
    "[GMAPS] key?",
    process.env.NEXT_PUBLIC_GMAPS_KEY?.slice(0, 6) + "…"
  );
  console.log("[GMAPS] mapId?", process.env.NEXT_PUBLIC_GMAPS_MAP_ID);

  return (
    <main>
      <MapWithMarker
        lat={Number(process.env.NEXT_PUBLIC_LAT)}
        lng={Number(process.env.NEXT_PUBLIC_LON)}
        zoom={14}
      />
      <DistanceSection />
    </main>
  );
}
