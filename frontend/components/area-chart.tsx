"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { reportsContent } from "@/lib/content";

interface Contribution {
  month: string;
  desktop: number;
}

const chartConfig = {
  desktop: {
    label: reportsContent.charts.overview.desktopLabel,
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface ChartProps {
  chartData: Contribution[];
}

export function Chart({ chartData }: ChartProps) {
  return (
    <Card className="rounded-md border border-gray-400 shadow-none">
      <CardHeader>
        <CardTitle>{reportsContent.charts.overview.title}</CardTitle>
        <CardDescription>
          <div className="text-muted-foreground flex items-center gap-2 leading-none">
            {reportsContent.charts.overview.totals}
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0 mx-2">
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
