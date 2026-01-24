"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import BackHome from "@/components/back-home";
import { useParams } from "next/navigation";
import RecordsMentor from "@/components/records-mentor";
import RenderContributionCard from "@/components/grid-contribution";
import SwitchViewButton from "@/components/toggle-button";
import RenderContributionTable from "@/components/table-contribution";
import { historyContent } from "@/lib/content";
import { getMockMentorTeam, getMockUser } from "@/lib/mock-data";

interface TeamData {
  IdTime: number;
  NomeTime: string;
  RaUsuario: number | null;
}
export default function MentorVision() {
  const params = useParams();
  const IdMentor = params?.IdMentor ? Number(params.IdMentor) : null;
  const [team, setTeam] = useState<TeamData | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [buttonSelected, setButtonSelected] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState<any>(null);
  const [loadingTeam, setLoadingTeam] = useState(false);
  const [errorTeam, setErrorTeam] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [errorUser, setErrorUser] = useState<string | null>(null);

  useEffect(() => {
    if (!IdMentor) {
      console.warn("invalido", params);
      return;
    }

    let active = true;

    async function fetchMentorTeam() {
      try {
        setLoadingTeam(true);
        setErrorTeam(null);

        const mentorData = await getMockMentorTeam(IdMentor!);
        const oneTeam: TeamData | null = Array.isArray(mentorData)
          ? mentorData[0] ?? null
          : (mentorData as TeamData | null);

        if (!active) return;

        setTeam(oneTeam);
      } catch (err: any) {
        console.error("Erro ao buscar time do mentor:", err);
        setErrorTeam(err?.message ?? "Erro ao buscar time do mentor");
      } finally {
        if (active) setLoadingTeam(false);
      }
    }
    fetchMentorTeam();

    return () => {
      active = false;
      
    };
  }, [IdMentor]);

  useEffect(() => {
    const ra = team?.RaUsuario;
    if (!ra || !Number.isFinite(ra)) {
      setUser(null);
      return;
    }

    let active = true;

    async function fetchUser() {
      try {
        setLoadingUser(true);
        setErrorUser(null);

        const userData = await getMockUser(raUsuario!);
        if (!active) return;

        setUser(userData);
      } catch (err: any) {
        console.error("Erro ao buscar usuário:", err);
        setErrorUser(err?.message ?? "Erro ao buscar usuário");
      } finally {
        if (active) setLoadingUser(false);
      }
    }

    fetchUser();
    return () => {
      active = false;
      
    };
  }, [team?.RaUsuario]);

  const raUsuario =
    team?.RaUsuario && Number.isFinite(team.RaUsuario)
      ? team.RaUsuario
      : undefined;

  return (
    <div className="min-h-dvh w-full overflow-y-hidden overflow-x-hidden flex flex-col bg-background">
      <div className="flex flex-col left-0 top-0">
        <div className="absolute left-0 top-0">
          <BackHome />
        </div>
      </div>

      <div className="w-full flex justify-center md:pt-10 transition-all duration-300 ease-in-out">
        <main className="w-full self-center max-w-[1300px] p-1.5 md:mt-0">
          {selectedContribution && (
            <RecordsMentor
              data={selectedContribution}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          )}
          <div className="flex flex-col gap-2 mx-3 text-center">
            <h3 className="text-2xl uppercase font-semibold text-primary">
              {loadingTeam
                ? historyContent.emptyStates.loadingTeam
                : team?.NomeTime || historyContent.emptyStates.noTeam}
            </h3>

            <h4 className="mb-3 text-xl text-primary text-center">
              {loadingUser
                ? historyContent.emptyStates.loadingClass
                : `${historyContent.labels.classPrefix} ${
                    user?.TurmaUsuario || historyContent.emptyStates.classFallback
                  }`}
            </h4>

            <div className="self-end">
              <SwitchViewButton
                buttonSelected={buttonSelected}
                setButtonSelected={(arg: SetStateAction<boolean>) =>
                  setButtonSelected(arg)
                }
              />
            </div>
          </div>
          <div className="mt-2">
            {buttonSelected ? (
              <RenderContributionTable
                raUsuario={team?.RaUsuario ?? undefined}
                onSelect={(contribution: any) => {
                  setSelectedContribution(contribution);
                  setIsOpen(true);
                }}
              />
            ) : (
              <RenderContributionCard
                raUsuario={team?.RaUsuario ?? undefined}
                onSelect={(contribution: any) => {
                  setSelectedContribution(contribution);
                  setIsOpen(true);
                }}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
