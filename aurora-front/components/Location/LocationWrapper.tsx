"use client";

import { ShareButton, DistanceSection, CircleSpinner } from "@/components";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Location/Map"), {
  ssr: false,
  loading: () => <CircleSpinner visible={true} />,
});

export default function LocationWrapper() {
  return (
    <>
      <Map detailsMap={false} />
      <DistanceSection />
      <ShareButton />
    </>
  );
}
