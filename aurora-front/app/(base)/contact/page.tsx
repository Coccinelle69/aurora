import { Contact, MapWithMarker, ShareButton } from "@/components";

const ContactPage = () => {
  return (
    <main>
      <Contact />
      <MapWithMarker
        lat={Number(process.env.NEXT_PUBLIC_LAT)}
        lng={Number(process.env.NEXT_PUBLIC_LNG)}
        zoom={14}
      />
      <ShareButton />
    </main>
  );
};

export default ContactPage;
