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
  type MockContribution,
} from "@/lib/mock-data";

export default function UserProfile() {
  const params = useParams();
  const RaUsuario = Number(params.RaUsuario);

  const [menuOpen, setMenuOpen] = React.useState(false);

  const [contributions, setContributions] = React.useState<MockContribution[]>(
    [],
  );
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
    <div className="w-screen h-screen overflow-x-clip bg-background">
      <div className="absolute justify-between left-0 top-0">
        <header>
          <button
            type="button"
            className={`open-menu hover:text-primary/60 ${
              menuOpen ? "menu-icon hidden" : "menu-icon"
            }`}
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        </header>
      </div>

      <div className="w-full h-full md:pt-10 flex justify-center transition-all duration-300 ease-in-out">
        <MenuDesktop
          menuOpen={menuOpen}
          setMenuOpen={(arg: SetStateAction<boolean>) => setMenuOpen(arg)}
        />

        <MenuMobile />

        <section className="w-full md:max-w-[1300px] md:mt-0 flex flex-col h-150 my-5 mb-10 p-6 gap-2">
          <div className="flex flex-col mx-3 text-center">
            <h3 className="text-2xl uppercase font-semibold text-black">
              {team?.NomeTime ? team?.NomeTime : profilesContent.user.heroTitle}
            </h3>
            <h4 className="mb-3 text-xl text-black/80">
              {profilesContent.user.classPrefix}{" "}
              {user?.TurmaUsuario
                ? user?.TurmaUsuario
                : profilesContent.user.classPrefix}
            </h4>
          </div>

          <div className="flex flex-col gap-3 p-5 border rounded-xl border-secondary/40 bg-background shadow-sm">
            <div>
              <p className="font-semibold text-primary/90 mb-1">
                {profilesContent.user.emailMentorLabel}
              </p>
              <div className="block min-h-9 bg-background w-full text-primary placeholder-primary/60 text-base focus:outline-none overflow-hidden">
                {team?.IdMentor ? (
                  <p className="break-words break-all">{emailMentor}</p>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex justify-between"
                  >
                    <input
                      type="text"
                      onChange={(e) => setEmailMentor(e.target.value)}
                      value={emailMentor || ""}
                      placeholder={profilesContent.user.emailMentorPlaceholder}
                      className="w-[85%] h-full bg-transparent text-primary placeholder-primary/60 focus:outline-none underline underline-offset-2"
                    />
                    <button
                      type="submit"
                      className="underline text-primary/80 hover:text-primary h-full"
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
            </div>

            <div>
              <p className="font-semibold text-primary/90 mb-1">
                {profilesContent.user.studentMentorLabel}
              </p>
              <p className="block w-full min-h-9 bg-background text-primary placeholder-primary/60 text-base focus:outline-none overflow-hidden break-words break-all">
                {user?.RaUsuario
                  ? user?.NomeUsuario
                  : profilesContent.user.studentMentorFallback}
              </p>
            </div>

            <div>
              <p className="font-semibold text-primary/90 mb-1">
                {profilesContent.user.membersLabel}
              </p>
              <div className="text-primary">
                {team?.RaAlunos?.length > 0
                  ? team.RaAlunos.map((RA: number, index: number) => (
                      <p key={index} className="mb-1">
                        {RA}
                      </p>
                    ))
                  : profilesContent.user.membersFallback}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
