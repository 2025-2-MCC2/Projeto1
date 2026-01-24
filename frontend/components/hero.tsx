import Image from "next/image";
import React from "react";

import Link from "next/link";
import { images, metaContent } from "@/lib/content";

const Hero = () => {
  return (
    <section className="relative h-[600px] z-auto overflow-x-clip w-screen bg-primary">
      <div className="relative pt-10 z-300 bg-transparent h-full mx-auto flex flex-col justify-between items-center">
        <div className="pointer-events-none select-none h-full flex flex-col justify-center gap-2 items-center">
          <h1 className="changa-one-bold text-responsive text-5xl md:text-7xl text-white max-w-4xl text-center mx-auto">
            {metaContent.hero.titleLines[0]}
            <br />
            {metaContent.hero.titleLines[1]}
          </h1>
          <p className="changa-one-regular text-2xl mt-0 text-white">
            {metaContent.hero.subtitle}
          </p>
        </div>
        <Link href="#public-graph">
          <p className="text-3xl z-300 text-white pb-10 animate-bounce">
            {metaContent.hero.scrollHint}
          </p>
        </Link>
      </div>

      <div className="absolute w-full h-full top-0 right-0 opacity-55">
        <Image
          src={images.heroBackground}
          alt={metaContent.hero.backgroundAlt}
          fill
        />
      </div>
    </section>
  );
};

export default Hero;
