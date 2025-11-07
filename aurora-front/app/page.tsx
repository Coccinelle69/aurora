"use client";

import { Provider } from "react-redux";

import Header from "./components/Header/Header";
import EmblaCarousel from "./components/Sections/Carousel";
import Introduction from "./components/Sections/Introduction";
import ExploreApartment from "./components/Sections/ExploreApartment";
import Features from "./components/Sections/Features";
import { store } from "@/store";

export default function Home() {
  return (
    <Provider store={store}>
      <Header />
      <EmblaCarousel />
      <div className="w-full ">
        <Introduction />
        <ExploreApartment />
        <Features />
      </div>
    </Provider>
  );
}
