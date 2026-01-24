import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "@/styles/globals.css";
import { metaContent } from "@/lib/content";

export const metadata: Metadata = {
  title: metaContent.siteName,
  description: metaContent.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={metaContent.htmlLang}>
      <head>
        <style>{`html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
            @import url('https://fonts.googleapis.com/css2?family=Changa+One:ital@0;1&display=swap');
          }`}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
