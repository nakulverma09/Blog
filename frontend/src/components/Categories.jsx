import React from "react";
import Card from "./Card";
import Button from "./Button";
import advertising from "../assets/advertising.avif";
import design from "../assets/design.avif";
import film from "../assets/film.avif";
import photography from "../assets/photography.avif";

const Categories = () => {
  return (
    <div className="h-auto w-full flex flex-col justify-center items-center gap-6 p-6 sm:p-10">
      <h1 className="font-extrabold text-3xl sm:text-5xl text-center">Popular Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl place-items-center">
        <Card src={design} title="Design" />
        <Card src={advertising} title="Advertising" />
        <Card src={film} title="Film" />
        <Card src={photography} title="Photography" />
      </div>
      <Button Title="Explore" className="mt-6 sm:mt-10" />
    </div>
  );
};

export default Categories;
