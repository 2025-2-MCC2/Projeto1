"use client";

import React, { useState } from "react";
import { donationsContent } from "@/lib/content";
import { createContributionMock } from "@/lib/mock-data";

interface Properties {
  nomeEvento: string;
  setNomeEvento: React.Dispatch<React.SetStateAction<string>>;
}

export default function AllDonations({
  nomeEvento,
  setNomeEvento,
}: Properties) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createContributionMock({
        RaUsuario: 20231234,
        TipoDoacao: "Financeira",
        Quantidade: 150,
        Meta: 0,
        Gastos: 0,
        Fonte: String(nomeEvento),
      });
      alert(donationsContent.allDonations.createSuccess);
      //setMetaEnvento(0);
    } catch (error) {
      console.error("Erro ao enviar contribuição:", error);
      alert(donationsContent.allDonations.connectionError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="w-[80%] bg-white border border-[#b4b4b4] rounded-lg text-black placeholder-gray-400 px-3 py-1.5 text-base focus:outline-none"
        type="text"
        placeholder={donationsContent.allDonations.eventPlaceholder}
        value={nomeEvento}
        onChange={(e) => setNomeEvento(e.target.value)}
      />
    </form>
  );
}
