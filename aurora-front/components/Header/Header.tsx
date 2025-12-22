"use client";

import { useEffect, useState } from "react";
import { CloseIcon, FacebookIcon, InstagramIcon, MenuIcon } from "@/icons";
import {
  LogoAurora as Logo,
  BookButton,
  FullScreenMenu,
  LanguageDropdown,
} from "@/components";

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
          !scrolled && "lg:h-[100px]"
        }  fixed top-0 left-0 w-full h-[180px] z-1000 transition-colors duration-500 ${
          scrolled ? "bg-defaultBg" : "bg-defaultBg lg:bg-defaultBg/50"
        }
     `}
      >
        <nav className={`${!scrolled && "lg:h-[100px]"}`}>
          <ul className="h-full flex flex-row px-[8%] justify-between">
            <li className="hidden lg:flex flex-row items-center">
              <div className="hidden lg:flex flex-row items-center gap-3 ">
                <div className="flex flex-row items-center gap-5 border-r border-white p-4">
                  <FacebookIcon size={24} />
                  <InstagramIcon size={24} />
                </div>
                <p className="font-bold text-white">+385 92138 5595</p>
              </div>
            </li>
            <li className="block lg:hidden">
              <Logo fullscreen={fullScreenMenuOpen} />
            </li>

            {scrolled && (
              <li className="hidden lg:block">
                <Logo size={200} fullscreen={fullScreenMenuOpen} />
              </li>
            )}

            <li className="flex flex-row items-center justify-center ">
              <button
                className="-translate-y-[10px] sm:px-[25px]"
                onClick={() => {
                  setMenuBtnClosed((prev) => !prev);
                  setFullScreenMenuOpen(true);
                }}
              >
                {menuBtnClosed || !fullScreenMenuOpen ? (
                  <MenuIcon size={40} color="white" />
                ) : (
                  <CloseIcon size={40} color="white" />
                )}
              </button>

              <div>
                <BookButton />
              </div>
              <div className="-translate-y-[9px]">
                <LanguageDropdown />
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
