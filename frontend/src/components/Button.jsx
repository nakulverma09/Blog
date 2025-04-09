import React from "react";

const Button = ({ Title, onClick, className = "" }) => {
  return (
    <button
      className={`bg-red-500 px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-white font-bold text-sm sm:text-base 
      hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 ${className}`}
      onClick={onClick}
    >
      {Title}
    </button>
  );
};

export default Button;
