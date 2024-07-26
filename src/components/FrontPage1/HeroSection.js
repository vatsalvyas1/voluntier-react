import React from "react";
import bg1 from "../../assests/images/bg.png";

function HeroSection() {
  return (
    <div
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="text-center h-auto pt-36 flex "
    >
      <div className="h-screen py-20 w-2/5">
        <h1 className="text-8xl md:text-8xl font-bold text-left ml-12 ">
          Volun<span className="text-purple-800">Tier</span>
        </h1>
        <h3 className="text-3xl mt-4 md:text-3xl font-semibold ml-12 text-left">
          We bridge <span className="text-slate-600"> people </span>and
          <span className="text-slate-600"> NGOs</span> for a better tomorrow
        </h3>

        <div className="dive flex">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-violet-800 to-fuchsia-800 hover:scale-110 font-medium rounded-full text-xl px-5 py-2.5 mt-6 ml-12 transition-all duration-1000 ease-in-out"
          >
            Dive in Now!
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
