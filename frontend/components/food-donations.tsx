"use client";

import Image, { StaticImageData } from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { donationsContent, images } from "@/lib/content";

type Img = StaticImageData | string;

interface Properties {
  quantidade: number;
  setQuantidade: (value: number) => void;
  pesoUnidade: number;
  setPesoUnidade: (value: number) => void;
  comprovante: File | null;
  setComprovante: (value: File | null) => void;
  fonte: string;
  setFonte: (value: string) => void;
  meta: number;
  setMeta: (value: number) => void;
  idAlimento: number;
  setIdAlimento: (value: number) => void;
  gastos: number;
  setGastos: (value: number) => void;
  onTotaisChange?: (totais: {
    pontos: number;
    kgTotal: number;
    gastos: number;
  }) => void;
  onAlimentoChange?: (alimentoAtual: {
    id: number;
    quantidade: number;
    pesoUnidade: number;
  }) => void;
}

export default function FoodDonations({
  fonte,
  setFonte,
  meta,
  setMeta,
  gastos,
  setGastos,
  quantidade,
  setQuantidade,
  pesoUnidade,
  setPesoUnidade,
  idAlimento,
  setIdAlimento,
  comprovante,
  setComprovante,
  onTotaisChange,
  onAlimentoChange,
}: Properties) {
  const [loading, setLoading] = useState(false);
  const [picking, setPicking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const ALIMENTOS = donationsContent.foodOptions;
  const PONTOS_POR_KG = donationsContent.foodPointsPerKg;

  useEffect(() => {
    if (!Number.isInteger(idAlimento)) setIdAlimento(0);
    if (!Number.isInteger(quantidade ?? 0)) setQuantidade(0);
    if (!Number.isInteger(pesoUnidade ?? 0)) setPesoUnidade(0);
    if (!Number.isFinite(gastos)) setGastos(0);
  }, []);

  useEffect(() => {
    if (onAlimentoChange) {
      onAlimentoChange({
        id: idAlimento,
        quantidade: quantidade ?? 0,
        pesoUnidade: pesoUnidade ?? 0,
      });
    }
  }, [idAlimento, quantidade, pesoUnidade]);

  const totais = useMemo(() => {
    const nome = ALIMENTOS.find((a) => a.id === (idAlimento ?? 0))?.nome ?? "";
    const q = Math.floor(quantidade ?? 0);
    const p = Math.floor(pesoUnidade ?? 0);
    const kgTotal = q * p;
    const pontos = kgTotal * (PONTOS_POR_KG[nome] ?? 0);
    return { kgTotal, pontos };
  }, [idAlimento, quantidade, pesoUnidade]);

  useEffect(() => {
    onTotaisChange?.({
      pontos: totais.pontos,
      kgTotal: totais.kgTotal,
      gastos: gastos ?? 0,
    });
  }, [totais, gastos]);

  const stopGif = () => {
    setPicking(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handlePickClick = () => {
    if (loading) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0] ?? null;
    if (!file) {
      setComprovante(null);
      stopGif();
      return;
    }

    const validTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/pdf",
    ];
    const isValidType = validTypes.includes(file.type);
    const isValidSize = file.size <= 5 * 1024 * 1024;

    if (!isValidType) {
      alert(donationsContent.errors.invalidFileType);
      stopGif();
      return;
    }

    if (!isValidSize) {
      alert(donationsContent.errors.invalidFileSize);
      stopGif();
      return;
    }

    setPicking(true);
    setComprovante(file);
    e.target.value = "";

    // Para o GIF depois de 1s
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => stopGif(), 1000);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <label>{donationsContent.foodForm.eventLabel}</label>
      <input
        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-black"
        type="text"
        placeholder={donationsContent.foodForm.eventPlaceholder}
        value={fonte}
        onChange={(e) => setFonte(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <div>
          <label>{donationsContent.foodForm.goalLabel}</label>
          <input
            className="h-10 w-full bg-white border border-gray-300 rounded-lg px-3"
            type="number"
            placeholder={donationsContent.foodForm.goalPlaceholder}
            value={meta === 0 ? "" : meta}
            onChange={(e) => {
              const v = e.target.value;
              setMeta(v === "" ? 0 : Math.floor(Number(v)));
            }}
          />
        </div>

        <div>
          <label>{donationsContent.foodForm.expensesLabel}</label>
          <input
            className="h-10 w-full bg-white border border-gray-300 rounded-lg px-3"
            type="number"
            placeholder={donationsContent.foodForm.expensesPlaceholder}
            value={gastos === 0 ? "" : gastos}
            onChange={(e) => {
              const v = e.target.value;
              setGastos(v === "" ? 0 : Math.floor(Number(v)));
            }}
          />
        </div>

        <div>
          <label>{donationsContent.foodForm.totalKgLabel}</label>
          <input
            type="text"
            readOnly
            value={totais.kgTotal.toLocaleString("pt-BR")}
            className="h-10 w-full bg-white border border-gray-300 rounded-lg px-3 text-center"
          />
        </div>
      </div>

      <div className="flex gap-4 font-bold mt-2">
        <div className="w-[40%] text-center">
          {donationsContent.foodForm.columns.food}
        </div>
        <div className="w-[25%] text-center">
          {donationsContent.foodForm.columns.units}
        </div>
        <div className="w-[25%] text-center">
          {donationsContent.foodForm.columns.kgPerUnit}
        </div>
      </div>

      <div className="flex gap-4 mt-2">
        <select
          className="w-[40%] bg-white border border-gray-300 rounded-lg px-3 py-2"
          value={idAlimento}
          onChange={(e) => setIdAlimento(parseInt(e.target.value))}
        >
          <option value={0} disabled>
            {donationsContent.foodForm.selectPlaceholder}
          </option>
          {ALIMENTOS.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nome}
            </option>
          ))}
        </select>

        <input
          className="w-[25%] bg-white border border-gray-300 rounded-lg px-3 py-2 text-center"
          type="number"
          placeholder={donationsContent.foodForm.quantityPlaceholder}
          value={quantidade === 0 ? "" : quantidade}
          onChange={(e) => {
            const v = e.target.value;
            setQuantidade(v === "" ? 0 : Math.floor(Number(v)));
          }}
        />

        <input
          className="w-[25%] bg-white border border-gray-300 rounded-lg px-3 py-2 text-center"
          type="number"
          step="1"
          placeholder={donationsContent.foodForm.kgPlaceholder}
          value={pesoUnidade === 0 ? "" : pesoUnidade}
          onChange={(e) => {
            const v = e.target.value;
            setPesoUnidade(v === "" ? 0 : Math.floor(Number(v)));
          }}
        />
      </div>

      <label className="block mt-9">
        {donationsContent.foodForm.receiptLabel}
      </label>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex items-center">
        <button
          type="button"
          onClick={handlePickClick}
          className="inline-flex items-center justify-center h-14 w-18 rounded-lg bg-white transition"
          disabled={loading}
        >
          <Image
            src={
              picking
                ? (images.upload.animated as Img)
                : (images.upload.static as Img)
            }
            alt={donationsContent.foodForm.receiptAlt}
            width={35}
            height={35}
            draggable={false}
          />
        </button>
        <span className="ml-3 text-sm text-gray-700">
          {comprovante instanceof File
            ? `${donationsContent.foodForm.receiptSelectedPrefix} ${comprovante.name}`
            : donationsContent.foodForm.receiptEmpty}
        </span>
      </div>
    </div>
  );
}
