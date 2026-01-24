import { SetStateAction, useState, useEffect } from "react";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";
import { navigationContent } from "@/lib/content";

interface Properties {
  menuOpen: Boolean;
  setMenuOpen: (arg: SetStateAction<boolean>) => void;
}

export default function MenuDesktop({ menuOpen, setMenuOpen }: Properties) {
  const params = useParams();
  const [RaUsuario, setRaUsuario] = useState<number | null>(null);

  useEffect(() => {
    if (params?.RaUsuario) {
      setRaUsuario(Number(params?.RaUsuario));
    }
  }, [params]);
  return (
    <aside className={`side-menu ${menuOpen ? "open" : ""}`}>
      <button className="close-menu" onClick={() => setMenuOpen(false)}>
        {navigationContent.menu.closeLabel}
      </button>
      <nav>
        <Link href="/">
          <button className="p-2 m-2 rounded-xl text-left bg-background hover:bg-secondary/20 border border-secondary/40 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer text-primary text-base w-55">
            {navigationContent.menu.desktop.backToDashboard}
          </button>
        </Link>

        <Link href={`/user/${RaUsuario}/user-profile`}>
          <button className="p-2 m-2 rounded-xl text-left bg-background hover:bg-secondary/20 border border-secondary/40 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer text-primary text-base w-55">
            {navigationContent.menu.desktop.profile}
          </button>
        </Link>

        <Link href={`/user/${RaUsuario}/new-contribution`}>
          <button className="p-2 m-2 rounded-xl text-left bg-background hover:bg-secondary/20 border border-secondary/40 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer text-primary text-base w-55">
            {navigationContent.menu.desktop.newContribution}
          </button>
        </Link>

        <Link href={`/user/${RaUsuario}/team-history`}>
          <button className="p-2 m-2 rounded-xl text-left bg-background hover:bg-secondary/20 border border-secondary/40 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer text-primary text-base w-55">
            {navigationContent.menu.desktop.history}
          </button>
        </Link>
      </nav>
    </aside>
  );
}
