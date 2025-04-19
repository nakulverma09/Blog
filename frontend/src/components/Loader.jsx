import React from "react";
import "../index.css"

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h2>Loading...</h2>
    </div>
  );
};

export default Loader;
