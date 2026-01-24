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
      <footer className="py-8 bg-secondary/20 text-black">
        <div className="text-center text-xs opacity-70">
          <div className="flex gap-4 w-full justify-center pb-5">
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
          <Link href={navigationContent.footer.repoUrl}>
            {navigationContent.footer.copyright}
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
