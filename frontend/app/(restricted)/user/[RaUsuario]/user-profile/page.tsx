"use client";

import React, { SetStateAction, useEffect } from "react";
import { useParams } from "next/navigation";
import MenuMobile from "@/components/menu-mobile";
import MenuDesktop from "@/components/menu-desktop";
import { fetchData } from "@/hooks/fetch-user-profile";
import { Contribution } from "@/components/contribution-table/columns";
import { commonContent, images, profilesContent } from "@/lib/content";
import {
  getMockContributionsByRa,
  getMockMentor,
  createMentorMock,
} from "@/lib/mock-data";

export default function UserProfile() {
  const params = useParams();
  const RaUsuario = Number(params.RaUsuario);

  const [menuOpen, setMenuOpen] = React.useState(false);

  const [contributions, setContributions] = React.useState<Contribution[]>([]);
  const [emailMentor, setEmailMentor] = React.useState<string>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const [team, setTeam] = React.useState<any>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      const data = await fetchData(RaUsuario);
      setUser(data?.user);
      setTeam(data?.team);
    };
    fetchTeamData();

    const fetchContributions = async () => {
      try {
        const contributions = await getMockContributionsByRa(RaUsuario);
        setContributions(contributions);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContributions();
  }, [RaUsuario]);

  useEffect(() => {
    const fetchEmailMentor = async () => {
      if (!team?.IdMentor) return;
      try {
        const mentor = await getMockMentor(team.IdMentor);
        if (mentor) setEmailMentor(mentor.EmailMentor);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmailMentor();
  }, [team?.IdMentor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailMentor?.trim()) {
      alert(profilesContent.user.invalidEmail);
      return;
    }
    setIsSubmitting(true);

    try {
      const MentorData = await createMentorMock({
        EmailMentor: emailMentor,
        RaUsuario: RaUsuario,
      });
      setTeam((prevTeam: any) => ({
        ...prevTeam,
        IdMentor: MentorData.IdMentor,
      }));
      alert(profilesContent.user.addMentorSuccess);
    } catch (error) {
      console.error(error);
      alert(profilesContent.user.addMentorError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-screen h-screen overflow-x-clip">
      <div className="absolute justify-between left-0 top-0">
        <header>
          <button
            type="button"
            className={`open-menu hover:text-primay/60 ${
              menuOpen ? "menu-icon hidden" : "menu-icon"
            }`}
            onClick={() => setMenuOpen(true)}
          >
            {" "}
            ☰{" "}
          </button>
        </header>
      </div>

      <div
        className={`${
          menuOpen ? "ml-[270px]" : ""
        } w-full h-full flex justify-center md:items-center transition-all duration-300 ease-in-out`}
      >
        <MenuDesktop
          menuOpen={menuOpen}
          setMenuOpen={(arg: SetStateAction<boolean>) => setMenuOpen(arg)}
        />

        <MenuMobile />

        <section className="w-[90%] md:max-w-[1300px] md:mt-0 grid grid-cols-1 md:grid-cols-2 h-150  my-5 mb-10 gap-2">
          <div className="flex flex-col gap-3 p-5 border rounded-xl border-gray-200 shadow-xl">
            <h3 className="text-3xl pt-5 uppercase font-semibold text-primary">
              {team?.NomeTime
                ? team?.NomeTime
                : profilesContent.user.teamNameFallback}
            </h3>
            <h4 className="mb-3 text-xl text-black">
              {profilesContent.user.classPrefix}{" "}
              {user?.TurmaUsuario
                ? user?.TurmaUsuario
                : profilesContent.user.classFallback}
            </h4>

            <p className="font-semibold">
              {profilesContent.user.emailMentorLabel}
            </p>
            <div className="block min-h-9 border rounded-md border-gray-400 px-2 w-full text-black placeholder-gray-400 pt-1 text-base focus:outline-none overflow-hidden">
              {team?.IdMentor ? (
                <p className="break-words break-all">{emailMentor}</p>
              ) : (
                <form onSubmit={handleSubmit} className="flex justify-between">
                  <input
                    type="text"
                    onChange={(e) => setEmailMentor(e.target.value)}
                    value={emailMentor || ""}
                    placeholder={profilesContent.user.emailMentorPlaceholder}
                    className="w-[85%] h-full focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="underline text-blue-700 h-full"
                  >
                    <img
                      className="text-primary w-6 opacity-60 rotate-180 hover:opacity-70"
                      src={images.external.backIcon}
                      alt={profilesContent.user.emailMentorSubmitAlt}
                    />
                  </button>
                </form>
              )}
            </div>

            <p className="font-semibold">
              {profilesContent.user.studentMentorLabel}
            </p>
            <p className="block w-full min-h-9 border rounded-md border-gray-400 px-2 text-black placeholder-gray-400 py-1 text-base focus:outline-none overflow-hidden break-words break-all">
              {user?.RaUsuario
                ? user?.NomeUsuario
                : profilesContent.user.studentMentorFallback}
            </p>
            <p className="font-semibold">
              {profilesContent.user.membersLabel}
            </p>
            <div className="border border-gray-400 rounded-md h-full py-1 px-2 max-w-50">
              {team?.RaAlunos?.length > 0
                ? team.RaAlunos.map((RA: number, index: number) => (
                    <p key={index} className=" mb-1 font-medium">
                      {RA}
                    </p>
                  ))
                : profilesContent.user.membersFallback}
            </div>
          </div>

          <div
            className="bg-secondary/40 rounded-xl border border-gray-200 shadow-xl p-10
                flex flex-col items-center justify-center text-center gap-4 overflow-hidden min-h-[280px] md:min-h-[360px]"
          >
            <p className="text-white font-extrabold text-3xl md:text-4xl leading-tight break-words">
              {profilesContent.user.heroTitle.split("\n")[0]}
              <br />
              {profilesContent.user.heroTitle.split("\n")[1]}
            </p>

            <img
              src={images.arkanaLogo.src}
              alt={profilesContent.user.heroTitle.replace("\n", " ")}
              className="max-w-full h-auto w-[290px] md:w-[400px] object-contain"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
