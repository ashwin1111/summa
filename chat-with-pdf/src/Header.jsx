import React from "react";
import logo from "./assets/logo.svg";

const Header = () => {
  return (
    <div className="min-h-[4rem] min-w-[100vw] flex justify-center md:items-center pb-4">
      <div className="-mt-4">
        <div className="flex items-baseline justify-center">
          <p
            className="text-[3rem] md:text-[4rem]"
            style={{
              fontFamily: "Tilt Warp",
              fontWeight: "100",
              fontStyle: "normal",
              backgroundImage: "linear-gradient(to right, #39E5B6, #0fa958)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Chat
          </p>
          <div className="">
            <p
              className="text-[2rem] md:text-[3rem] ml-3 h-full"
              style={{
                fontFamily: "Tilt Warp",
                fontWeight: "50",
                fontStyle: "normal",
              }}
            >
              with pdf
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
