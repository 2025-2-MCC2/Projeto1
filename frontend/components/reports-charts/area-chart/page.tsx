"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
import { Contribution } from "@/components/contribution-table-admin/columns";
import { v4 as uuidv4 } from "uuid";
import { commonContent, reportsContent } from "@/lib/content";
import { getMockContributions } from "@/lib/mock-data";

export const description =
  reportsContent.charts.financialTimeline.description;

const chartConfig = {
  desktop: {
    label: reportsContent.charts.financialTimeline.legend,
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function FinanContribuitionsChart() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContributions() {
      try {
        setLoading(true);
        setError(null);

        const raw = await getMockContributions();

        const data: Contribution[] = Array.isArray(raw)
          ? raw.map((r: any) => ({
              IdContribuicao:
                r.IdContribuicao ??
                r.IdContribuicaoFinanceira ??
                r.IdContribuicaoAlimenticia,
              RaUsuario: Number(r.RaUsuario),
              TipoDoacao: String(r.TipoDoacao ?? ""),
              Quantidade:
                r.Quantidade != null
                  ? Number(
                      String(r.Quantidade).replace(/\./g, "").replace(",", ".")
                    )
                  : 0,
              DataContribuicao: String(r.DataContribuicao ?? ""),
              NomeTime: r.NomeTime ?? undefined,
              PontuacaoAlimento: r.PontuacaoAlimento ?? undefined,
              PesoUnidade: r.PesoUnidade ?? undefined,
              uuid: uuidv4(),
            }))
          : [];

        setContributions(data);
      } catch (err: any) {
        setError(err?.message ?? commonContent.errors.unexpected);
      } finally {
        setLoading(false);
      }
    }

    fetchContributions();
    return () => {
      
    };
  }, []);

  const chartData =
    contributions.length > 0
      ? Object.values(
          contributions.reduce((acc: any, c: Contribution) => {
            if (c.TipoDoacao !== "Financeira") return acc;
            const date = new Date(c.DataContribuicao);
            if (isNaN(date.getTime())) return acc;

            const month = date.toLocaleString("pt-BR", {
              month: "short",
              year: "numeric",
            });

            if (!acc[month]) acc[month] = { month, desktop: 0 };
            acc[month].desktop += c.Quantidade;
            return acc;
          }, {} as Record<string, { month: string; desktop: number }>)
        )
      : [];

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{reportsContent.charts.financialTimeline.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">
            {reportsContent.charts.financialTimeline.loading}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{reportsContent.charts.financialTimeline.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-destructive">
            {reportsContent.charts.financialTimeline.errorPrefix} {error}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{reportsContent.charts.financialTimeline.title}</CardTitle>
          <CardDescription>
            {reportsContent.charts.financialTimeline.emptyTitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">
            {reportsContent.charts.financialTimeline.emptyDescription}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{reportsContent.charts.financialTimeline.title}</CardTitle>
        <CardDescription>
          {reportsContent.charts.financialTimeline.subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                value.charAt(0).toUpperCase() + value.slice(1)
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-primary)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          {reportsContent.charts.financialTimeline.footer}
        </div>
      </CardFooter>
    </Card>
  );
}
