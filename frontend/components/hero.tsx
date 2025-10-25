import Image from "next/image";
import React from "react";

import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative h-screen z-auto overflow-x-clip w-screen bg-primary">
      <div className="relative pt-10 z-300 bg-transparent h-full mx-auto flex flex-col justify-between items-center">
        <div className="pointer-events-none select-none h-full flex flex-col justify-center gap-2 items-center">
          <h1 className="changa-one-bold text-responsive text-5xl md:text-7xl text-white max-w-4xl text-center mx-auto">
            LIDERANÇAS
            <br />
            EMPÁTICAS
          </h1>
          <p className="changa-one-regular text-2xl mt-0 text-white">
            + ARKANA
          </p>
        </div>
        <Link href="#public-graph"><p className="text-3xl z-300 text-white pb-10 animate-bounce">↓</p></Link>
      </div>
    </section>
  );
};

export default Hero;
