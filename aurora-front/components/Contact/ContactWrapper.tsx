"use client";
import { CircleSpinner, Contact, ShareButton } from "@/components";
import dynamic from "next/dynamic";

const MapPlaceholder = () => (
  <div
    style={{
      width: "100%",
      height: "700px",
      backgroundColor: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div className="animate-pulse">
      <CircleSpinner visible />
    </div>
  </div>
);

const Map = dynamic(() => import("@/components/Location/Map"), {
  ssr: false,
  loading: () => <MapPlaceholder />,
});

const ContactPage = () => {
  return (
    <>
      <Contact />
      <div style={{ width: "100%", height: "700px", overflow: "hidden" }}>
        <Map detailsMap={false} />
      </div>
      <ShareButton />
    </>
  );
};

export default ContactPage;
