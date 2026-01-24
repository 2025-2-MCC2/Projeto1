import { SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { navigationContent } from "@/lib/content";

interface Properties {
  menuOpen: Boolean;
  setMenuOpen: (arg: SetStateAction<boolean>) => void;
}

export default function MenuDesktopAdmin({
  menuOpen,
  setMenuOpen,
}: Properties) {
  const params = useParams();
  const [IdMentor, setIdMentor] = useState<string | null>(null);

  useEffect(() => {
    if (params?.IdMentor) {
      setIdMentor(params.IdMentor as string);
    }
  }, [params]);

  if (!IdMentor) {
    return (
      <aside className={`side-menu ${menuOpen ? "open" : ""}`}>
        <button className="close-menu" onClick={() => setMenuOpen(false)}>
          {navigationContent.menu.closeLabel}
        </button>
        <nav>
          <p>{navigationContent.menu.desktop.loading}</p>
        </nav>
      </aside>
    );
  }

  return (
    <aside className={`side-menu ${menuOpen ? "open" : ""}`}>
      <button className="close-menu" onClick={() => setMenuOpen(false)}>
        {navigationContent.menu.closeLabel}
      </button>
      <nav>
        <Link href="/">
          <button className="p-2 m-2 text-left rounded-xl bg-background hover:bg-secondary/20 border border-secondary/40 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer text-primary text-base w-55">
            {navigationContent.menu.desktop.backToDashboard}
          </button>
        </Link>

        <Link href={`/admin/${IdMentor}/admin-profile`}>
          <button className="p-2 m-2 text-left rounded-xl bg-background hover:bg-secondary/20 border border-secondary/40 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer text-primary text-base w-55">
            {navigationContent.menu.admin.profile}
          </button>
        </Link>

        <Link href={`/admin/${IdMentor}/admin-history`}>
          <button className="p-2 m-2 text-left rounded-xl bg-background hover:bg-secondary/20 border border-secondary/40 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer text-primary text-base w-55">
            {navigationContent.menu.admin.history}
          </button>
        </Link>
      </nav>
    </aside>
  );
}
