import React from "react";
import Header from "./Header";
import PodcastCard from "./PodcastCard";

const RoomPodcasts = () => {
  return (
    <div className="h-auto border-t border-gray-600 pb-6 w-full px-4 sm:px-6">
      <Header title="The Creative 86 Room Podcasts" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 place-items-center">
        {[
          { title: "Jennifer Oliver", episode: 50 },
          { title: "Karine Bramer", episode: 51 },
          { title: "Lisa Angel", episode: 52 },
          { title: "Jennifer Bramer", episode: 53 },
        ].map((podcast, index) => (
          <PodcastCard key={index} podcast={{ ...podcast, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita magnam" }} />
        ))}
      </div>
    </div>
  );
};

export default RoomPodcasts;
