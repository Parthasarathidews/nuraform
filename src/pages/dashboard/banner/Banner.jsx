import React from "react";
import NuraformHero from "./NuraformHero";

const Banner = () => {
  return (
    <>
      <div className=" w-screen h-[100dvh] overflow-hidden max-[577px]:w-full max-[577px]:h-[100dvh]">
        <NuraformHero />
      </div>
    </>
  );
};

export default Banner;
