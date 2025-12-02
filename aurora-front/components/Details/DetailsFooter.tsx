"use client";

import { memo } from "react";

const DetailsFooter = () => {
  return (
    <footer className="w-full bg-[#f1f1f1] py-10">
      <div className="flex flex-col items-center text-center gap-2 px-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Aurora Apartment
        </h2>

        <p className="text-gray-600">37.ulica 6, Zukve-Vrsi, Nin</p>

        <a
          href="mailto:dorotea0105@gmail.com"
          className="text-gray-700 hover:underline"
        >
          dorotea0105@gmail.com
        </a>

        <a href="tel:+385921385595" className="text-blue-600 hover:underline">
          +385921385595
        </a>
      </div>
    </footer>
  );
};

export default memo(DetailsFooter);
