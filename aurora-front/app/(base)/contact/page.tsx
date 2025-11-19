import { Contact, MapWithMarker } from "@/components";

const ContactPage = () => {
  return (
    <div>
      <Contact />
      <MapWithMarker
        lat={Number(process.env.NEXT_PUBLIC_LAT)}
        lng={Number(process.env.NEXT_PUBLIC_LNG)}
        zoom={14}
      />
    </div>
  );
};

export default ContactPage;
