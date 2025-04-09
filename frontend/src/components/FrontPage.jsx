import React from "react";
import groupImg from "../assets/groupImg.jpg";
import { Link } from "react-router-dom";
import Button from "./Button";

const FrontPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-white relative overflow-hidden">
      {/* Main Content */}
      <div className="h-4/5 w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-14 relative z-10">
        {/* Left Side - Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-evenly items-start gap-4 text-center md:text-left relative z-20">
          <span className="text-xl font-semibold">Help and support the creative community</span>
          <div className="flex flex-col">
            <span className="text-[40px] md:text-[60px] font-bold leading-tight">We are</span>
            <span className="text-[40px] md:text-[60px] font-bold">Creative86</span>
          </div>
          <p className="text-gray-600 text-base md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur provident
            vero repudiandae, nulla dolorum deleniti est eos sapiente.
          </p>
          <div className="flex justify-center md:justify-start w-full">
            <Link to="/create-blog" className="w-full md:w-1/2">
            <Button Title="Create Blog"/>
            </Link>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0 relative z-10">
          <img
            src={groupImg}
            alt="Front Page"
            className="h-[300px] md:h-[500px] w-[300px] md:w-[500px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
