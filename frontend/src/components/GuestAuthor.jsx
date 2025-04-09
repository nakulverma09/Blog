import React from "react";
import Button from "./Button";

const GuestAuthor = () => {
  return (
    <div className="h-[500px] w-full flex justify-center items-center px-6 sm:px-10 lg:px-20">
      <div className="flex flex-col items-center justify-evenly h-[60%] w-[70%] px-10 sm:px-20 gap-6">
        <span className="font-bold text-4xl text-center">BECOME A GUEST AUTHOR</span>
        <p className="text-center text-base sm:text-lg leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo repellat
          aperiam beatae, nihil dolore natus animi voluptatem. Asperiores
          fugiat, at earum quod, iusto unde voluptas dolore sunt accusantium
          laudantium quisquam?
        </p>
        <Button Title="Join Today" />
      </div>
    </div>
  );
};

export default GuestAuthor;
