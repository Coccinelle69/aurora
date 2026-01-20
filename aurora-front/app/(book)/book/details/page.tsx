import { DetailsWrapper } from "@/components";

const DetailsPage = () => {
  return (
    <>
      <link rel="preconnect" href="https://maps.googleapis.com" />
      <link
        rel="preconnect"
        href="https://maps.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="https://maps.googleapis.com" />
      <main>
        <DetailsWrapper />
      </main>
    </>
  );
};

export default DetailsPage;
