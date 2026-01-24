"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MenuMobile from "@/components/menu-mobile";
import MenuDesktop from "@/components/menu-desktop";
import RenderContributionCard from "@/components/grid-contribution";
import { fetchData } from "@/hooks/fetch-user-profile";
import RecordsModal from "@/components/records-modal";
import SwitchViewButton from "@/components/toggle-button";
import RenderContributionTable from "@/components/table-contribution";
import { historyContent } from "@/lib/content";

export default function TeamHistory() {
  const params = useParams();
  const RaUsuario = Number(params.RaUsuario);
  const [menuOpen, setMenuOpen] = useState(false);
  const [team, setTeam] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [buttonSelected, setButtonSelected] = React.useState(false);
  const [selectedContribution, setSelectedContribution] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchTeamData = async () => {
      const data = await fetchData(RaUsuario);
      setUser(data?.user);
      setTeam(data?.team);
    };
    fetchTeamData();
  }, [RaUsuario]);

  return (
    <div className="min-h-dvh w-full overflow-y-hidden overflow-x-hidden flex flex-col bg-background">
      <div className="flex flex-col left-0 top-0">
        <header className="py-4 mt-6 relative flex justify-center items-center">
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

      <div className="w-full flex justify-center md:pt-10 transition-all duration-300 ease-in-out">
        <MenuDesktop
          menuOpen={menuOpen}
          setMenuOpen={(arg: SetStateAction<boolean>) => setMenuOpen(arg)}
        />

        <MenuMobile />

        <main className="w-full max-w-[1300px] p-1.5 md:mt-0 ">
          {selectedContribution && (
            <RecordsModal
              data={selectedContribution}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onDeleted={() => {
                setIsOpen(false);
                setSelectedContribution(null);
                setRefreshKey((k) => k + 1);
              }}
            />
          )}
          <div className="flex flex-col mx-3 text-center">
            <h3 className="text-2xl uppercase font-semibold text-black">
              {team?.NomeTime
                ? team?.NomeTime
                : historyContent.placeholders.teamName}
            </h3>
            <h4 className="mb-3 text-xl text-black/80">
              {historyContent.labels.classPrefix}{" "}
              {user?.TurmaUsuario
                ? user?.TurmaUsuario
                : historyContent.placeholders.classFallback}
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
                refreshKey={refreshKey}
                onSelect={(contribution: any) => {
                  setSelectedContribution(contribution);
                  setIsOpen(true);
                }}
              />
            ) : (
              <RenderContributionCard
                refreshKey={refreshKey}
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
