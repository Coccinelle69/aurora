"use client";

import { DistanceSection } from "@/components";
import dynamic from "next/dynamic";
const MapWithMarker = dynamic(
  () => import("@/components").then((mod) => mod.MapWithMarker),
  { ssr: false, loading: () => <div style={{ height: "100%" }} /> }
);

export default function LocationPage() {
  return (
    <main>
      <MapWithMarker
        lat={Number(process.env.NEXT_PUBLIC_LAT)}
        lng={Number(process.env.NEXT_PUBLIC_LNG)}
        zoom={14}
      />
      <DistanceSection />
    </main>
  );
}
