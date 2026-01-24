"use client";

import React, { useState } from "react";
import { Contribution } from "./contribution-table-admin/columns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tablesContent } from "@/lib/content";

// interface Contribution {
//   IdContribuicao: number;
//   RaUsuario: number;
//   TipoDoacao: string;
//   Quantidade: number;
//   Meta?: number;
//   Gastos?: number;
//   Fonte?: string;
//   comprovante?: {
//     IdComprovante: number;
//     Imagem: string;
//   };
//   DataContribuicao: string;
// }

export default function RenderContribution() {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  return (
    <Table>
      <TableCaption>{tablesContent.simpleTable.caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>{tablesContent.simpleTable.headers.source}</TableHead>
          <TableHead>{tablesContent.simpleTable.headers.type}</TableHead>
          <TableHead>{tablesContent.simpleTable.headers.amount}</TableHead>
          <TableHead className="text-right">
            {tablesContent.simpleTable.headers.date}
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {contributions.map((c) => (
          <TableRow key={c.IdContribuicao}>
            <TableCell className="font-medium">{c.Fonte}</TableCell>
            <TableCell>{c.TipoDoacao}</TableCell>
            <TableCell>{c.Quantidade}</TableCell>
            <TableCell className="text-right">
              {new Date(c.DataContribuicao).toLocaleDateString()}
            </TableCell>
            <TableCell>{c.comprovante?.Imagem}</TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>
            {tablesContent.simpleTable.headers.total}
          </TableCell>
          <TableCell colSpan={2} className="text-right">
            {contributions.reduce((sum, c) => sum + c.Quantidade, 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
