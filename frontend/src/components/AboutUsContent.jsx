import React from "react";
import TeamMember from "./TeamMember";
import { Link } from "react-router-dom";

const users = [
  {
    name: "John Doe",
    position: "Software Engineer",
    username: "johndoe",
    emailId: "johndoe@example.com",
  },
  {
    name: "Jane Smith",
    position: "Product Manager",
    username: "janesmith",
    emailId: "janesmith@example.com",
  },
  {
    name: "Michael Johnson",
    position: "UI/UX Designer",
    username: "michaelj",
    emailId: "michaelj@example.com",
  },
  {
    name: "Emily Davis",
    position: "Marketing Specialist",
    username: "emilyd",
    emailId: "emilyd@example.com",
  },
  {
    name: "Daniel Brown",
    position: "Data Analyst",
    username: "danbrown",
    emailId: "danbrown@example.com",
  },
  {
    name: "Sophia Wilson",
    position: "HR Manager",
    username: "sophiaw",
    emailId: "sophiaw@example.com",
  },
];

const AboutUsContent = () => {
  return (
    <>
      {/* About Us Section */}
      <div className="w-full h-auto bg-gray-100 flex flex-col lg:flex-row px-12 sm:px-16 lg:px-24 py-16 items-center gap-12">
        <div className="w-full lg:w-3/5 flex flex-col items-start justify-evenly text-center lg:text-left gap-6">
          <span className="font-extralight text-xl">ABOUT US</span>
          <h1 className="font-extrabold text-4xl sm:text-5xl">
            We inform, help and support the creative community
          </h1>
          <h6 className="font-bold text-lg">
            The Creative80 Room is the U.K. based Creative Blog website,
            launched in 2016, Lorem ipsum dolor sit amet, consectetur
            adipisicing elit.
          </h6>
          <p className="font-light text-lg leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
        </div>
        <div className="w-full lg:w-2/5 flex items-center justify-center mt-10 lg:mt-0">
          <Link to="#">
            <img
              src={logoIpsum}
              alt="logoIpsum"
              className="object-cover w-full sm:w-4/5 lg:w-[80%] rounded-lg"
            />
          </Link>
        </div>
      </div>

      {/* Inspiring Work Section */}
      <div className="w-full h-auto bg-gray-100 py-16 px-12 sm:px-16 lg:px-24">
        <div className="w-full lg:w-3/5">
          <h3 className="font-bold text-3xl">Inspiring creative work</h3>
          <p className="mt-8 text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis in
            odit, expedita, magni perspiciatis magnam explicabo ratione unde
            nisi aliquid perferendis laudantium dignissimos laborum pariatur
            repudiandae quis minima corporis.
          </p>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="w-full h-auto flex flex-col items-center justify-center p-16 border-b-2 border-black">
        <h1 className="font-thin text-4xl sm:text-6xl">Our Team</h1>
      </div>

      {/* Team Members Grid */}
      <div className="w-full h-auto flex justify-center items-center bg-gray-100 py-16 px-12 border-b-2 border-black">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-12">
          {users.map((user, index) => (
            <TeamMember key={index} user={user} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutUsContent;
