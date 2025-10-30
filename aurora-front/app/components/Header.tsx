"use client";

import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "../icons";
import Logo from "./Logo";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuClosed, setMenuClosed] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 w-full  transition-colors duration-500 backdrop-blur-sm 
    ${scrolled ? "bg-[#1A3C5B]" : "bg-[#1A3C5B] lg:bg-transparent"}`}
    >
      <nav>
        <ul className="flex flex-row items-center justify-between px-[10%] ">
          <li>
            <Logo size={150} />
          </li>

          <li onClick={() => setMenuClosed(!menuClosed)}>
            {menuClosed ? (
              <MenuIcon style={{ fontSize: "48px" }} />
            ) : (
              <CloseIcon size={35} color="white" />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
