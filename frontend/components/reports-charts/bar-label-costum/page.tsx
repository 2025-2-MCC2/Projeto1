"use client";

import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { commonContent, reportsContent } from "@/lib/content";
import { getMockContributions } from "@/lib/mock-data";

interface Contribuicao {
  IdContribuicaoAlimenticia?: number;
  IdContribuicaoFinanceira?: number;
  DataContribuicao?: Date;
  RaUsuario: number;
}

interface Team {
  IdTime?: number;
  NomeTime: string;
  IdMentor: number;
  RaUsuario: number | null;
  RaAluno2: number;
  RaAluno3: number;
  RaAluno4: number;
  RaAluno5: number;
  RaAluno6: number;
  RaAluno7: number;
  RaAluno8: number;
  RaAluno9?: number;
  RaAluno10?: number;
  contribuicoes?: Contribuicao[];
}

const chartConfig = {
  pontos: {
    label: reportsContent.charts.teamsRanking.legend,
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function TeamsRankingChart() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    let active = true;

    async function fetchTeamContrib() {
      try {
        setLoading(true);
        setError(null);

        const contribRaw = await getMockContributions();
        if (!active) return;

        const contribPorTime = new Map<number, Contribuicao[]>();

        if (Array.isArray(contribRaw)) {
          contribRaw.forEach((contrib: any) => {
            const RaUsuario = Number(contrib.RaUsuario);
            if (!contribPorTime.has(RaUsuario)) {
              contribPorTime.set(RaUsuario, []);
            }
            contribPorTime.get(RaUsuario)?.push({
              IdContribuicaoAlimenticia: contrib.IdContribuicaoAlimenticia,
              IdContribuicaoFinanceira: contrib.IdContribuicaoFinanceira,
              DataContribuicao: contrib.DataContribuicao,
              RaUsuario: contrib.RaUsuario,
            });
          });
        }

        const data: Team[] = Array.isArray(contribRaw)
          ? contribRaw.map((r: any) => {
              const RaUsuario = Number(r.RaUsuario);
              return {
                IdTime: r.IdTime,
                NomeTime: String(r.NomeTime ?? ""),
                IdMentor: r.IdMentor ?? undefined,
                RaUsuario: RaUsuario,
                RaAluno2: Number(r.RaAluno2),
                RaAluno3: Number(r.RaAluno3),
                RaAluno4: Number(r.RaAluno4),
                RaAluno5: Number(r.RaAluno5),
                RaAluno6: Number(r.RaAluno6),
                RaAluno7: Number(r.RaAluno7),
                RaAluno8: Number(r.RaAluno8),
                RaAluno9: Number(r.RaAluno9 || null),
                RaAluno10: Number(r.RaAluno10 || null),
                contribuicoes: contribPorTime.get(RaUsuario) || [],
              };
            })
          : [];
        setTeams(data);
      } catch (err: any) {
        setError(err?.message ?? commonContent.errors.unexpected);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchTeamContrib();
    return () => {
      active = false;
      
    };
  }, []);

  const chartData = teams
    .map((team) => {
      const totalContribuicoes = team.contribuicoes?.length || 0;
      const alimenticias =
        team.contribuicoes?.filter((c) => c.IdContribuicaoAlimenticia)
          ?.length || 0;
      const financeiras =
        team.contribuicoes?.filter((c) => c.IdContribuicaoFinanceira)?.length ||
        0;

      return {
        nome: team.NomeTime,
        pontos: totalContribuicoes,
        alimenticias,
        financeiras,
      };
    })
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, 5);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{reportsContent.charts.teamsRanking.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">
            {reportsContent.charts.teamsRanking.loading}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{reportsContent.charts.teamsRanking.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-destructive">
            {reportsContent.charts.teamsRanking.errorPrefix} {error}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{reportsContent.charts.teamsRanking.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">
            {reportsContent.charts.teamsRanking.empty}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{reportsContent.charts.teamsRanking.title}</CardTitle>
        <CardDescription>
          {reportsContent.charts.teamsRanking.subtitlePrefix} {chartData.length}{" "}
          {reportsContent.charts.teamsRanking.subtitleSuffix}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ right: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="nome"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="pontos" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="pontos" fill="var(--color-primary)" radius={4}>
              <LabelList
                dataKey="nome"
                position="insideLeft"
                offset={8}
                className="fill-(--color-white)"
                fontSize={12}
              />
              <LabelList
                dataKey="contribuições"
                position="right"
                offset={8}
                className="fill-(--color-secondary)"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          {reportsContent.charts.teamsRanking.footer}
        </div>
      </CardFooter>
    </Card>
  );
}
