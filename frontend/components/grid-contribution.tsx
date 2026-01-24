"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { HandHeart } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import formatBRL from "./formatBRL";
import { v4 as uuidv4 } from "uuid";
import { Contribution } from "./contribution-table/columns";
import Loading from "./loading";
import { commonContent, historyContent } from "@/lib/content";
import { getMockContributionsByRa } from "@/lib/mock-data";

interface RenderContributionProps {
  raUsuario?: number;
  onSelect?: (contribution: ContributionAdmin) => void;
  refreshKey?: number;
}

type ContributionAdmin = Contribution & {
  PesoTotal?: number;
  PontuacaoTotal?: number;
  alimentos?: {
    NomeAlimento: string;
    Pontuacao?: number | string;
  }[];
};

export default function RenderContributionCard({
  raUsuario,
  onSelect,
  refreshKey = 0,
}: RenderContributionProps) {
  const [contributions, setContributions] = useState<ContributionAdmin[]>([]);
  const params = useParams();
  const raFromParams = params?.RaUsuario ? Number(params.RaUsuario) : undefined;
  const RaUsuario =
    typeof raUsuario === "number" && Number.isFinite(raUsuario)
      ? raUsuario
      : typeof raFromParams === "number" && Number.isFinite(raFromParams)
      ? raFromParams
      : undefined;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchContributions() {
      try {
        setLoading(true);
        setError(null);

        const raw = RaUsuario
          ? await getMockContributionsByRa(RaUsuario)
          : [];
        if (!active) return;

        const data: ContributionAdmin[] = Array.isArray(raw)
          ? raw.map((r: any) => {
              const quantidade = Number(
                String(r.Quantidade).replace(/\./g, "").replace(",", ".")
              );

              const pesoUnidade =
                r.PesoUnidade != null
                  ? Number(
                      String(r.PesoUnidade).replace(/\./g, "").replace(",", ".")
                    )
                  : 0;

              const pesoTotal =
                Number.isFinite(quantidade) && Number.isFinite(pesoUnidade)
                  ? quantidade * pesoUnidade
                  : undefined;

              const pontTotal = Array.isArray(r.alimentos)
                ? r.alimentos.reduce((sum: number, a: any) => {
                    const pontuacao = Number(a.Pontuacao ?? 0);
                    return sum + pontuacao * quantidade;
                  }, 0)
                : 0;

              const IdContribuicao = Number(
                r.IdContribuicao ??
                  r.IdContribuicaoFinanceira ??
                  r.IdContribuicaoAlimenticia
              );

              const idComp =
                r?.comprovante?.IdComprovante ?? r?.IdComprovante ?? null;

              const rawImg =
                r?.Comprovante ??
                r?.comprovante?.Imagem ??
                r?.Comprovante?.Imagem ??
                r?.Imagem ??
                r?.comprovantes?.[0]?.Imagem ??
                r?.UrlComprovante ??
                null;

              let comprovante:
                | { IdComprovante: number; Imagem: string }
                | undefined;

              if (rawImg && String(rawImg).trim() !== "") {
                const s = String(rawImg).trim();
                const isAbsolute = /^https?:\/\//i.test(s);
                const base = (
                  process.env.NEXT_PUBLIC_BACKEND_URL || ""
                ).replace(/\/$/, "");
                const finalUrl = isAbsolute
                  ? s
                  : `${base}/uploads/${s.replace(/^\/+/, "")}`;

                comprovante = {
                  IdComprovante: idComp != null ? Number(idComp) : 0,
                  Imagem: finalUrl,
                };
              }
              return {
                RaUsuario: Number(r.RaUsuario),
                TipoDoacao: String(r.TipoDoacao ?? ""),
                Quantidade: quantidade,
                Meta:
                  r.Meta != null
                    ? Number(
                        String(r.Meta).replace(/\./g, "").replace(",", ".")
                      )
                    : undefined,
                Gastos:
                  r.Gastos != null
                    ? Number(
                        String(r.Gastos).replace(/\./g, "").replace(",", ".")
                      )
                    : undefined,
                Fonte: r.Fonte ?? "",
                comprovante,
                IdContribuicao,
                DataContribuicao: String(r.DataContribuicao ?? ""),
                NomeAlimento: r.NomeAlimento ?? undefined,
                NomeTime: r.NomeTime ?? undefined,
                PesoTotal: pesoTotal ?? 0,
                PontuacaoTotal: pontTotal ?? 0,
                PesoUnidade: pesoUnidade,
                uuid: r.uuid ?? uuidv4(),

                alimentos: Array.isArray(r.alimentos)
                  ? r.alimentos.map((a: any) => ({
                      NomeAlimento: a.NomeAlimento ?? "",
                      Pontuacao: Number(a.Pontuacao ?? 0),
                    }))
                  : [],
              } satisfies ContributionAdmin;
            })
          : [];
        setContributions(data);
      } catch (err: any) {
        setError(err?.message ?? commonContent.errors.unexpected);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchContributions();

    return () => {
      active = false;
      // no-op for mock data
    };
  }, [RaUsuario, refreshKey]);

  if (contributions.length === 0) {
    return (
      <div className="col-start-2 border rounded-xl border-secondary/40 bg-background shadow-sm w-auto max-w-100 mx-auto">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <HandHeart size={44} strokeWidth={1.2} />
            </EmptyMedia>
            <EmptyTitle>{historyContent.emptyStates.noneYetTitle}</EmptyTitle>
            <EmptyDescription>
              {historyContent.emptyStates.noneYetDescription}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <div className="mb-15 grid grid-cols-1 md:grid-cols-3 gap-4.5 rounded-sm p-2.5">
      {loading && (
        <div className="w-screen h-full text-center text-gray-600">
          <Loading />
        </div>
      )}

      {!loading &&
        !error &&
        contributions.map((c) => (
          <div
            key={c.uuid}
            className="p-3 rounded-xl bg-background hover:bg-secondary/10 hover:text-secondary border border-secondary/40 shadow-sm transition-shadow duration-300 cursor-pointer"
            onClick={() => onSelect?.(c)}
          >
            <p className="font-semibold text-lg mb-2">{c.Fonte}</p>
            <p className="text-sm text-primary/90">
              {historyContent.cards.date}
              {new Date(c.DataContribuicao).toLocaleDateString("pt-BR")}
            </p>
            <p className="text-sm text-primary/80">
              {historyContent.cards.type} {c.TipoDoacao}
            </p>
            <p className="text-sm text-primary/80">
              {historyContent.cards.amount}
              {Intl.NumberFormat("pt-BR").format(c.Quantidade)}
            </p>
            <p className="text-sm text-primary/80">
              {historyContent.cards.expenses} {formatBRL(c.Gastos)}
            </p>
          </div>
        ))}
    </div>
  );
}
