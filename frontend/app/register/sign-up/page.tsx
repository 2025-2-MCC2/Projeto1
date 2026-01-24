"use client";

import React, { useState } from "react";
import BackHome from "@/components/back-home";
import SigninTabs from "@/components/tabs-sign";
import TeamTabs from "@/components/tabs-team";
import { authContent, images } from "@/lib/content";

export default function Cadastro() {
  const [isLogged, setIsLogged] = useState(false);
  const [raUsuario, setRaUsuario] = useState(0);

  return (
    <div className="w-full">
      <div className="absolute left-0 top-0">
        <BackHome />
      </div>

      {isLogged ? (
        <section className="w-screen overflow-x-clip">
          <TeamTabs raUsuario={raUsuario} />
        </section>
      ) : (
        <div className="min-h-screen flex justify-center items-center p-6">
          <div className="flex flex-col md:flex-row w-full max-w-3xl">
            <section className="bg-primary h-120 m-1 flex flex-col rounded-lg items-center justify-center md:w-1/2 p-6 text-white">
              <h1 className="flex text-center font-bold text-[#fff] text-[22px] mb-1">
                {authContent.signup.header.split("\n")[0]}
                <br />
                {authContent.signup.header.split("\n")[1]}
              </h1>
              <img
                src={images.external.liderancasLogo}
                alt={authContent.loginPage.logoAlt}
                className="mb-6 w-28 md:w-36"
              />
            </section>

            <section className="border border-[#b4b4b4] rounded-lg m-1 flex flex-col items-center justify-center md:w-1/2">
              <SigninTabs
                setIsLogged={setIsLogged}
                setRaUsuario={setRaUsuario}
              />
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
