"use client";

import React, { useEffect } from "react";
import BackHome from "@/components/back-home";
import { useRouter } from "next/navigation";
import { authContent, images, teamContent } from "@/lib/content";
import { createTeamMock } from "@/lib/mock-data";

interface Props {
  raUsuario: number;
}

export default function TeamTabs({ raUsuario }: Props) {
  const router = useRouter();
  const [NomeTime, setNomeTime] = React.useState("");
  const [RaAluno2, setRaAluno2] = React.useState("");
  const [RaAluno3, setRaAluno3] = React.useState("");
  const [RaAluno4, setRaAluno4] = React.useState("");
  const [RaAluno5, setRaAluno5] = React.useState("");
  const [RaAluno6, setRaAluno6] = React.useState("");
  const [RaAluno7, setRaAluno7] = React.useState("");
  const [RaAluno8, setRaAluno8] = React.useState("");
  const [RaAluno9, setRaAluno9] = React.useState("");
  const [RaAluno10, setRaAluno10] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createTeamMock({
        NomeTime: NomeTime,
        RaUsuario: Number(raUsuario),
        RaAluno2: Number(RaAluno2) || 0,
        RaAluno3: Number(RaAluno3) || 0,
        RaAluno4: Number(RaAluno4) || 0,
        RaAluno5: Number(RaAluno5) || 0,
        RaAluno6: Number(RaAluno6) || 0,
        RaAluno7: Number(RaAluno7) || 0,
        RaAluno8: Number(RaAluno8) || 0,
        RaAluno9: Number(RaAluno9) || null,
        RaAluno10: Number(RaAluno10) || null,
      });

      router.push(`user/${raUsuario}/new-contribution`);
    } catch (error) {
      console.error(authContent.errors.registerTeam, error);

      if (error instanceof TypeError && error.message === "Failed to fetch") {
        alert(authContent.errors.connection);
      } else {
        alert(`${authContent.errors.registerTeam}: ${error}`);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="absolute left-0 top-0">
        <BackHome />
      </div>

      <div className="min-h-screen flex justify-center items-center p-6">
        <div className="flex flex-col md:flex-row w-full max-w-3xl">
          <section className="bg-primary h-120 m-1 flex flex-col rounded-lg items-center justify-center md:w-1/2 p-6 text-white max-w-screen">
            <h1 className="flex text-center font-bold text-[#fff] text-[22px] mb-1">
              {teamContent.header.split(" ")[0]}
              <br />
              {teamContent.header.split(" ")[1]}
            </h1>
            <img
              src={images.external.liderancasLogo}
              alt={authContent.loginPage.logoAlt}
              className="mb-6 w-28 md:w-36"
            />
          </section>

          <section className="border border-gray-300 py-5 rounded-lg m-1 flex flex-col items-start justify-start md:w-[400px] overflow-y-scroll h-[480px] max-w-screen">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="text-base mb-1 mt-1 mr-4 ml-4">
                {teamContent.form.teamName}
                <input
                  type="text"
                  name="NomeTime"
                  placeholder={teamContent.form.teamNamePlaceholder}
                  className="block w-full mr-2 bg-[white] border border-[#b4b4b4] rounded-lg text-black placeholder-gray-400 px-3 py-2 text-base focus:outline-none"
                  value={NomeTime}
                  onChange={(e) => setNomeTime(e.target.value)}
                />
              </div>
              <div className="text-base mb-1 mt-1 mr-4 ml-4">
                {teamContent.form.raLabelPrefix} 2
                <input
                  type="text"
                  name="RaAluno2"
                  placeholder={teamContent.form.raPlaceholder}
                  className="block w-full mr-2 bg-[white] border border-[#b4b4b4] rounded-lg text-black placeholder-gray-400 px-3 py-2 text-base focus:outline-none"
                  value={RaAluno2}
                  onChange={(e) => setRaAluno2(e.target.value)}
                />
              </div>
              <div className="text-base mb-1 mt-1 mr-4 ml-4">
                {teamContent.form.raLabelPrefix} 3
                <input
                  type="text"
                  name="RaAluno3"
                  placeholder={teamContent.form.raPlaceholder}
                  className="block w-full mr-2 bg-[white] border border-[#b4b4b4] rounded-lg text-black placeholder-gray-400 px-3 py-2 text-base focus:outline-none"
                  value={RaAluno3}
                  onChange={(e) => setRaAluno3(e.target.value)}
                />
              </div>
              <div className="text-base mb-1 mt-1 mr-4 ml-4">
                {teamContent.form.raLabelPrefix} 4
                <input
                  type="text"
                  name="RaAluno4"
                  placeholder={teamContent.form.raPlaceholder}
                  className="block w-full  mr-2 bg-[white] border border-[#b4b4b4] rounded-lg text-black placeholder-gray-400 px-3 py-2 text-base focus:outline-none"
                  value={RaAluno4}
                  onChange={(e) => setRaAluno4(e.target.value)}
                />
              </div>
              <div className="text-base mb-1 mt-1 mr-4 ml-4">
                {teamContent.form.raLabelPrefix} 5
                <input
                  type="text"
                  name="RaAluno5"
                  placeholder={teamContent.form.raPlaceholder}
                  className="block w-full mr-2 bg-[white] border border-[#b4b4b4] rounded-lg text-black placeholder-gray-400 px-3 py-2 text-base focus:outline-none"
                  value={RaAluno5}
                  onChange={(e) => setRaAluno5(e.target.value)}
                />
              </div>

              <div className="text-base mb-1 mt-1 mr-4 ml-4">
                {teamContent.form.raLabelPrefix} 6
                <input
                  type="text"
                  name="RaAluno6"
                  placeholder={teamContent.form.raPlaceholder}
                  className="block w-full mr-2 bg-[white] border border-[#b4b4b4] rounded-lg text-black placeholder-gray-400 px-3 py-2 text-base focus:outline-none"
                  value={RaAluno6}
                  onChange={(e) => setRaAluno6(e.target.value)}
                />
              </div>
              <div className="text-base mb-1 mt-1 mr-4 ml-4">
                {teamContent.form.raLabelPrefix} 7
                <input
                  type="text"
                  name="RaAluno7"
                  placeholder={teamContent.form.raPlaceholder}
                  className="block w-full mr-2 bg-[white] border border-[#b4b4b4] rounded-lg text-black placeholder-gray-400 px-3 py-2 text-base focus:outline-none"
                  value={RaAluno7}
                  onChange={(e) => setRaAluno7(e.target.value)}
                />
              </div>
              <div className="text-base mb-1 mt-1 mr-4 ml-4">
                {teamContent.form.raLabelPrefix} 8
                <input
                  type="text"
                  name="RaAluno8"
                  placeholder={teamContent.form.raPlaceholder}
                  className="block w-full mr-2 bg-[white] border border-[#b4b4b4] rounded-lg text-black placeholder-gray-400 px-3 py-2 text-base focus:outline-none"
                  value={RaAluno8}
                  onChange={(e) => setRaAluno8(e.target.value)}
                />
              </div>
              <div className="text-base mb-1 mt-1 mr-4 ml-4">
                {teamContent.form.raLabelPrefix} 9
                <input
                  type="text"
                  name="RaAluno9"
                  placeholder={teamContent.form.raPlaceholder}
                  className="block w-full mr-2 bg-[white] border border-[#b4b4b4] rounded-lg text-black placeholder-gray-400 px-3 py-2 text-base focus:outline-none"
                  value={RaAluno9}
                  onChange={(e) => setRaAluno9(e.target.value)}
                />
              </div>
              <div className="text-base mb-1 mt-1 mr-4 ml-4">
                {teamContent.form.raLabelPrefix} 10
                <input
                  type="text"
                  name="RaAluno10"
                  placeholder={teamContent.form.raPlaceholder}
                  className="block w-full mr-2 bg-[white] border border-[#b4b4b4] rounded-lg text-black placeholder-gray-400 px-3 py-2 text-base focus:outline-none"
                  value={RaAluno10}
                  onChange={(e) => setRaAluno10(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="border-transparent text-white hover:text-white! hover:bg-secondary/80 py-2 px-6 m-4 bg-secondary self-end rounded-lg"
              >
                {teamContent.form.submit}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
