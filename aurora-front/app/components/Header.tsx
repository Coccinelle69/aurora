"use client";

import { useEffect, useState } from "react";
import { CloseIcon, FacebookIcon, InstagramIcon, MenuIcon } from "../icons";
import Logo from "./Logo";
import BookButton from "./BookButton";
import FullScreenMenu from "./FullScreenMenu";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuBtnClosed, setMenuBtnClosed] = useState(true);
  const [fullScreenMenuOpen, setFullScreenMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <header
        className={`${
          !scrolled && "lg:h-[125px]"
        }  fixed top-0 left-0 w-full  transition-colors duration-500 ${
          scrolled ? "bg-[#1A3C5B]" : "bg-[#1A3C5B] lg:bg-transparent"
        }
     `}
        // className={`h-50 fixed top-0 left-0 w-full  transition-colors duration-500 backdrop-blur-sm
        // ${scrolled ? "bg-[#1A3C5B]" : "bg-[#1A3C5B] lg:bg-transparent"}`}
      >
        <nav className={`${!scrolled && "lg:h-[125px]"}`}>
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
            <li className="block lg:hidden">
              <Logo size={150} className="" fullscreen={fullScreenMenuOpen} />
            </li>

            {scrolled && (
              <li className="hidden lg:block">
                <Logo size={200} className="" fullscreen={fullScreenMenuOpen} />
              </li>
            )}

            <li className="flex flex-row justify-center items-center">
              <div
                className="cursor-pointer pr-6 hover:scale-110 transition-transform duration-300 ease-out"
                onClick={() => {
                  setMenuBtnClosed(!menuBtnClosed);
                  setFullScreenMenuOpen(true);
                }}
              >
                {menuBtnClosed || !fullScreenMenuOpen ? (
                  <MenuIcon size={45} color="white" />
                ) : (
                  <CloseIcon size={35} color="white" />
                )}
              </div>
              <div>
                <BookButton />
              </div>
            </li>
          </ul>
        </nav>
      </header>
      <FullScreenMenu
        open={fullScreenMenuOpen}
        onClose={() => setFullScreenMenuOpen(false)}
      />
    </>
  );
};

export default Header;
