import React, { useEffect } from "react";
import DesignCard from "./DesignCard";

const DesignLayout = ({heading, blogs}) => {
  return (
    <div className="bg-white w-full flex flex-col py-10 px-6 sm:px-10 lg:px-20">
      {/* Title Section */}
      <div className="w-full h-auto flex justify-start border-b-2 border-black pb-6 items-center">
        <h1 className="font-extralight text-2xl sm:text-2xl md:text-4xl">{heading}</h1>
      </div>

      {/* Design Cards */}
      <div className="max-w-6xl mx-auto flex flex-col gap-10 mt-6">
        {
          blogs.map((blog, index) => {
            return (
              <DesignCard key={index} blog={blog} /> // Pass the blog object to DesignCard
            );
          })
        }
      </div>
    </div>
  );
};

export default DesignLayout;
