"use client";

import { FacebookIcon, InstagramIcon } from "../../icons";
import {
  LogoAurora as Logo,
  BookButton,
  CurrencyDropdown,
  LanguageDropdown,
} from "..";

const BookHeader = () => {
  return (
    <>
      <header className="bg-babyBlue">
        <nav className="lg:h-[200px]">
          <ul className="h-full flex flex-row px-[8%] justify-between">
            <li className="hidden lg:flex flex-row items-center">
              <div className="hidden lg:flex flex-row items-center gap-3 ">
                <div className="flex flex-row items-center gap-5 border-r border-white p-4">
                  <FacebookIcon size={24} />
                  <InstagramIcon size={24} />
                </div>
                <p className="font-bold">+385 92138 5595</p>
              </div>
            </li>
            <li>
              <Logo size={200} />
            </li>

            <li className="flex flex-row justify-center items-center">
              <div>
                <CurrencyDropdown />
              </div>
              <div>
                <LanguageDropdown />
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default BookHeader;
