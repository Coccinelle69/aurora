"use client";

import dynamic from "next/dynamic";
const MapWithMarker = dynamic(
  () => import("@/components").then((mod) => mod.MapWithMarker),
  { ssr: false, loading: () => <div style={{ height: "100%" }} /> }
);

export default function Location() {
  return (
    <main style={{ padding: 24 }} className="h-[100vh]">
      <MapWithMarker
        lat={44.2524}
        lng={15.211}
        zoom={14}
        markerTitle="Zukve, Croatia"
      />
    </main>
  );
}
