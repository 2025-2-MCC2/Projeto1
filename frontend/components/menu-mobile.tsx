"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useParams } from "next/navigation";

import { images, navigationContent } from "@/lib/content";

export default function MenuMobile() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [RaUsuario, setRaUsuario] = useState<number | null>(null);

  const homeHref = `/user/${RaUsuario}/user-profile`;
  const createHref = `/user/${RaUsuario}/new-contribution`;
  const historyHref = `/user/${RaUsuario}/team-history`;

  const isActive = (href: string) => pathname?.startsWith(href);

  useEffect(() => {
    if (params?.RaUsuario) {
      setRaUsuario(Number(params.RaUsuario));
    }
  }, [params]);

  const onCreateClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (isActive(createHref)) {
      e.preventDefault();
      router.refresh();
    }
  };

  // ---------- Estilos base ----------
  const basePill =
    "relative flex items-center justify-center h-10 w-16 rounded-[10px] transition-all duration-300 ease-out";
  const neutralPill = "bg-transparent hover:bg-primary/20";
  const activePill = "bg-[#3B5D3D] text-white border border-[#3B5D3D]";

  // ---------- Ícones ----------
  const icons = useMemo(
    () => ({
      home: images.menu.home,
      add: images.menu.add,
      history: {
        ...images.menu.history,
      },
    }),
    []
  );

  // ---------- Efeito "pop" ----------
  const [pressed, setPressed] = useState<{ [key: string]: boolean }>({});
  const timersRef = useRef<{ [key: string]: number }>({});

  const triggerPress = (key: string) => {
    if (timersRef.current[key]) window.clearTimeout(timersRef.current[key]);
    setPressed((p) => ({ ...p, [key]: true }));
    timersRef.current[key] = window.setTimeout(() => {
      setPressed((p) => ({ ...p, [key]: false }));
    }, 150);
  };

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const getIconSrc = (
    set: { default: any; active: any; pressed?: any },
    isTabActive: boolean,
    isPressed: boolean
  ) => {
    if (isPressed && set.pressed) return set.pressed;
    if (isTabActive) return set.active;
    return set.default;
  };

  return (
    <nav
      role="navigation"
      aria-label={navigationContent.menu.mobile.ariaLabel}
      className="md:hidden fixed inset-x-0 bottom-0 z-50"
    >
      <style jsx global>{`
        @keyframes pop {
          0% {
            transform: scale(1);
          }
          40% {
            transform: scale(1.12);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-pop {
          animation: pop 150ms ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-pop {
            animation: none !important;
          }
          .transition-all {
            transition: none !important;
          }
        }
      `}</style>

      <div className="mx-auto w-[300px] px-4 sm:px-6 rounded-2xl">
        <div className="flex items-center justify-center gap-8 sm:gap-12 py-2 bg-primary rounded-[30px]">
          {/* Aba 1: Home */}
          <Link
            href={homeHref}
            aria-label={navigationContent.menu.mobile.tabs.home.ariaLabel}
            className={`${basePill} ${
              isActive(homeHref) ? activePill : neutralPill
            } ${pressed.home ? "animate-pop" : ""}`}
            onMouseDown={() => triggerPress("home")}
            onTouchStart={() => triggerPress("home")}
          >
            <Image
              src={getIconSrc(icons.home, isActive(homeHref), !!pressed.home)}
              alt={navigationContent.menu.mobile.tabs.home.alt}
              width={24}
              height={24}
              className="pointer-events-none select-none"
              draggable={false}
              priority
            />
          </Link>

          {/* Aba 2: Cadastrar */}
          <Link
            href={createHref}
            aria-label={navigationContent.menu.mobile.tabs.create.ariaLabel}
            onClick={onCreateClick}
            className={`${basePill} ${
              isActive(createHref) ? activePill : neutralPill
            } ${pressed.add ? "animate-pop" : ""}`}
            onMouseDown={() => triggerPress("add")}
            onTouchStart={() => triggerPress("add")}
          >
            <Image
              src={getIconSrc(icons.add, isActive(createHref), !!pressed.add)}
              alt={navigationContent.menu.mobile.tabs.create.alt}
              width={24}
              height={24}
              className="pointer-events-none select-none"
              draggable={false}
              priority
            />
          </Link>

          {/* Aba 3: Histórico */}
          <Link
            href={historyHref}
            aria-label={navigationContent.menu.mobile.tabs.history.ariaLabel}
            className={`${basePill} ${
              isActive(historyHref) ? activePill : neutralPill
            } ${pressed.history ? "animate-pop" : ""}`}
            onMouseDown={() => triggerPress("history")}
            onTouchStart={() => triggerPress("history")}
          >
            <Image
              src={getIconSrc(
                icons.history,
                isActive(historyHref),
                !!pressed.history
              )}
              alt={navigationContent.menu.mobile.tabs.history.alt}
              width={24}
              height={24}
              className="pointer-events-none select-none"
              draggable={false}
              priority
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
