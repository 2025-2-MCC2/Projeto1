"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Clipboard, Eye } from "lucide-react";
import formatBRL from "../formatBRL";
import { tablesContent } from "@/lib/content";

export type Contribution = {
  IdContribuicao: number;
  RaUsuario: number;
  TipoDoacao: string;
  Quantidade: number;
  Meta?: number;
  Gastos?: number;
  Fonte?: string;
  comprovante?: {
    IdComprovante: number;
    Imagem: string;
  };
  DataContribuicao: string;
  NomeAlimento?: string;
  PontuacaoAlimento?: number;
  NomeTime: string;
  PesoUnidade: number;
  PesoTotal?: number,
  PontuacaoTotal?: number,
  uuid: string;
};

export type ContributionActions = {
  onView?: (c: Contribution) => void;
  onCopied?: (id: number) => void;
};

export const makeContributionColumns = (
  actions: ContributionActions = {}
): ColumnDef<Contribution>[] => [
  {
    accessorKey: "Fonte",
    header: ({ column }) => {
      return (
        <Button
          variant="prettyHeader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {tablesContent.columns.source}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="font-medium w-[220px] block truncate">
        {row.original.Fonte ?? "-"}
      </span>
    ),
  },
  {
    accessorKey: "DataContribuicao",
    header: ({ column }) => {
      return (
        <Button
          variant="prettyHeader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {tablesContent.columns.date}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const d = row.original.DataContribuicao;
      const date = d ? new Date(d) : null;
      return <span>{date ? date.toLocaleDateString("pt-BR") : "-"}</span>;
    },
  },
  {
    accessorKey: "TipoDoacao",
    header: ({ column }) => {
      return (
        <Button
          variant="prettyHeader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {tablesContent.columns.type}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Quantidade",
    header: ({ column }) => {
      return (
        <Button
          variant="prettyHeader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {tablesContent.columns.amount}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const q = row.original.Quantidade;
      return (
        <span className="w-[80px] block truncate">
          {Number.isFinite(q) ? new Intl.NumberFormat("pt-BR").format(q) : "-"}
        </span>
      );
    },
  },
  {
    id: "PesoTotal",
    accessorFn: (row) => {
      if (row.TipoDoacao !== "Alimenticia") return null;
      const q = Number(row.Quantidade);
      const pu = Number(row.PesoUnidade);
      const PesoTotal = q * pu;
      return Number.isFinite(PesoTotal) ? PesoTotal : null;
    },
    header: ({ column }) => (
      <Button
        variant="prettyHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {tablesContent.columns.totalWeight}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue, row }) => {
      const v = getValue<number | null>();
      return row.original.TipoDoacao === "Alimenticia" && v != null ? (
        <span className="w-[80px] block truncate">
          {new Intl.NumberFormat("pt-BR").format(v)} kg
        </span>
      ) : (
        <span> - </span>
      );
    },
  },

  {
    id: "PontuacaoTotal",
    header: ({ column }) => (
      <Button
        variant="prettyHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {tablesContent.columns.totalScore}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const v = row.original.PontuacaoTotal;
      return row.original.TipoDoacao === "Alimenticia" && Number.isFinite(v) ?
        <span className="w-[60px] block truncate">
          {new Intl.NumberFormat("pt-BR").format(v!)} 
        </span>
       : (
        <span> - </span>
      );
    },
  },
  {
    accessorKey: "Gastos",
    header: ({ column }) => {
      return (
        <Button
          variant="prettyHeader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {tablesContent.columns.expenses}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <span>{formatBRL(row.original.Gastos)}</span>,
  },
  {
    accessorKey: "Meta",
    header: ({ column }) => {
      return (
        <Button
          variant="prettyHeader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {tablesContent.columns.goal}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const meta = row.original.Meta;
      return (
        <span>
          {typeof meta === "number" && Number.isFinite(meta)
            ? new Intl.NumberFormat("pt-BR").format(meta)
            : "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "comprovante",
    header: tablesContent.columns.receipt,
    cell: ({ row }) => {
      const url = row.original.comprovante?.Imagem;
      return url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          {tablesContent.actions.openReceipt}
        </a>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const c = row.original;
      const hasReceipt = !!c.comprovante?.IdComprovante;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">{tablesContent.actions.openMenu}</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{tablesContent.actions.actions}</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={async () => {
                await navigator.clipboard.writeText(
                  c.IdContribuicao.toString()
                );
                actions.onCopied?.(c.IdContribuicao);
              }}
            >
              <Clipboard className="mr-2 h-4 w-4" />{" "}
              {tablesContent.actions.copyId}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => actions.onView?.(c)}>
              <Eye className="mr-2 h-4 w-4" />{" "}
              {tablesContent.actions.viewDetails}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
``;
