import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faLinkedin,
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import EmailInput from "./EmailInput";
import { AppContext } from "../context/context";
import { useState, useContext } from "react";

const Footer = () => {
  // const value = useContext(AppContext);

  const menuItems = [
    "Technology",
    "Education & Learning",
    "Lifestyle",
    "Finance",
    "Entertainment",
    "News & Current Affairs",
    "Inspiration & Personal Development",
    "Culture & History",
    "Coding & Projects",
    "Miscellaneous",
  ];

  return (
    <>
      {/* Top Footer */}
      <footer className="w-full flex flex-col md:flex-row md:h-28 items-center gap-6 md:gap-20 justify-evenly border-t px-6 md:px-10 lg:px-16 xl:px-24 border-b border-gray-200 bg-gray-100 py-6 md:py-0">
        {/* Menu - visible only on large screens */}
        <div className="hidden lg:flex flex-wrap max-w-[1100px] w-full gap-x-6 gap-y-3 justify-center text-sm">
          {menuItems.map((link) => (
            <Link
            key={link}
            to={`/${link.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
            className={`hover:text-blue-700 transition font-bold text-black`}
          >
            {link}
          </Link>  
          ))}
        </div>

        {/* Social Icons - visible on all screen sizes, responsive layout */}
        <div className="w-full md:w-[50%] flex justify-center md:justify-between items-center text-2xl gap-6 md:gap-0">
          <FontAwesomeIcon
            icon={faXTwitter}
            className="hover:text-gray-600 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faLinkedin}
            className="hover:text-gray-600 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faInstagram}
            className="hover:text-gray-600 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faYoutube}
            className="hover:text-gray-600 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faFacebook}
            className="hover:text-gray-600 cursor-pointer"
          />
        </div>
      </footer>

      {/* Newsletter Section */}
      <footer className="p-4 w-full h-auto border-t py-10 border-t-gray-700 bg-gray-100 flex flex-col justify-evenly items-center text-center">
        <h1 className="font-extrabold text-xl max-w-[90%] md:max-w-full">
          Sign up to receive email updates, fresh news and more!
        </h1>
        <EmailInput />
      </footer>

      {/* Bottom Footer */}
      <footer className="w-full h-auto py-5 bg-gray-100 flex items-center justify-center border-t border-t-gray-700 text-center">
        <p className="text-sm text-gray-600 px-4">
          Copyright © 2025 Creative Blog | Powered by Creative Blog
        </p>
      </footer>
    </>
  );
};

export default Footer;
