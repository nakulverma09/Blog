import React from "react";
import PodcastCard from "./PodcastCard";

const podcasts = [
  {
    title: "Jennifer Oliver",
    episode: 50,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita magnam",
  },
  {
    title: "Michael Johnson",
    episode: 30,
    description: "Exploring the world of technology and innovation.",
  },
  {
    title: "Emily Carter",
    episode: 25,
    description: "A deep dive into modern business strategies.",
  },
  {
    title: "David Smith",
    episode: 40,
    description: "Understanding mental health and wellness.",
  },
  {
    title: "Sophia Williams",
    episode: 15,
    description: "Creative arts and the journey of self-expression.",
  },
  {
    title: "Daniel Brown",
    episode: 35,
    description: "AI, machine learning, and the future of tech.",
  },
  {
    title: "Olivia Martinez",
    episode: 20,
    description: "The best travel destinations and experiences.",
  },
  {
    title: "Liam Anderson",
    episode: 45,
    description: "How to build better habits for success.",
  },
  {
    title: "Ethan Wilson",
    episode: 28,
    description: "Music, culture, and industry insights.",
  },
];

const PodcastLayout = () => {
  return (
    <div className="bg-white w-full flex flex-col py-10 px-6 sm:px-10 lg:px-20">
      
      {/* Title Section */}
      <div className="w-full h-auto flex justify-start border-b-2 border-black pb-6 items-center">
        <h1 className="font-extralight text-4xl sm:text-5xl md:text-7xl">Podcasts</h1>
      </div>

      {/* Podcast Grid Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {podcasts.map((podcast, index) => (
          <PodcastCard key={index} podcast={podcast} />
        ))}
      </div>
      
    </div>
  );
};

export default PodcastLayout;
