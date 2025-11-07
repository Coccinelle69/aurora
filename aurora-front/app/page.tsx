import Header from "./components/Header/Header";

import EmblaCarousel from "./components/Sections/Carousel";
import Introduction from "./components/Sections/Introduction";
import ExploreApartment from "./components/Sections/ExploreApartment";
import Features from "./components/Sections/Features";

export default function Home() {
  return (
    <>
      <Header />
      <EmblaCarousel />
      <div className="w-full ">
        <Introduction />
        <ExploreApartment />
        <Features />
      </div>
    </>
  );
}
