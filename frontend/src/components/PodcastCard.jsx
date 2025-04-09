import React from "react";
import Lady from "../assets/lady.avif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const PodcastCard = ({podcast}) => {
  return (
    <>
      <div className="h-96 w-80 bg-gray-200 rounded-2xl flex flex-col justify-between items-center relative">
        <div className="h-[50%] w-full flex flex-row overflow-hidden rounded-t-lg relative">
          <div className="w-[50%] h-full pl-3 flex flex-col justify-evenly items-start">
            <h1 className="font-extrabold text-2xl text-blue-600">{podcast.title}</h1>
            <span className="font-extralight">Episode {podcast.episode}</span>
          </div>
          <div className="w-[50%] h-full relative">
            {/* Image positioned absolutely in top-right */}
            <div className="w-[150px] h-[150px] rounded-full overflow-hidden absolute top-[-25px] right-[-25px] hover:scale-110 transition">
              <img src={Lady} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <div className="h-[50%] w-full px-4 flex flex-col justify-evenly items-start overflow-hidden rounded-b-lg">
          <h3 className="font-bold text-base">
            {podcast.description}
          </h3>
          <button className="bg-blue-400 h-[60px] w-[60px] rounded-full text-xl flex justify-center items-center text-black font-bold hover:bg-blue-200 transition">
            <FontAwesomeIcon icon={faPlay} />
          </button>
        </div>
      </div>
    </>
  );
};

export default PodcastCard;
