/* eslint-disable complexity */
import Link from "next/link";
import React from "react";

import { Instagram, Linkedin, Youtube } from "lucide-react";
import { navigationContent } from "@/lib/content";

const Footer = () => {
  const pages = navigationContent.footer.pages;
  const socialLinks = navigationContent.footer.socialLinks;

  return (
    <>
      <footer className="py-5 md:pt-20 bg-secondary/20 text-black px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
          <div className="flex flex-col gap-2 items-left">
            <p className="font-bold">
              {navigationContent.footer.creatorsTitle}
            </p>
            {navigationContent.footer.creators.map((creator) => (
              <Link
                key={creator.url}
                className="hover:opacity-50"
                href={creator.url}
              >
                <p>{creator.name}</p>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 items-left">
            <p className="font-bold">{navigationContent.footer.navTitle}</p>
            {pages.map((item) => (
              <Link key={item.id} href={item.url} className="hover:opacity-50">
                {item.text}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 items-left">
            <p className="font-bold">{navigationContent.footer.socialTitle}</p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  className="hover:opacity-50"
                  aria-label={link.type}
                >
                  {link.type === "Instagram" ? (
                    <Instagram />
                  ) : link.type === "Linkedin" ? (
                    <Linkedin />
                  ) : (
                    <Youtube />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-xs opacity-70">
          <Link href={navigationContent.footer.repoUrl}>
            {navigationContent.footer.copyright}
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
