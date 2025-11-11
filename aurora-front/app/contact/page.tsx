import { Contact, MapWithMarker } from "@/components";

const page = () => {
  return (
    <div>
      <Contact />
      <MapWithMarker lat={44.254022} lng={15.211451} zoom={14} />
    </div>
  );
};

export default page;
