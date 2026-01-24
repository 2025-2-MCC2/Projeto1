"use client";

import React, { useRef, useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { donationsContent, images } from "@/lib/content";

type Img = StaticImageData | string;

interface Properties {
  RaUsuario: number;
  setRaUsuario: React.Dispatch<React.SetStateAction<number>>;
  tipoDoacao: "Financeira" | "Alimenticia";
  setTipoDoacao: React.Dispatch<
    React.SetStateAction<"Financeira" | "Alimenticia">
  >;
  quantidade: number;
  setQuantidade: (value: number) => void;
  fonte: string;
  setFonte: (value: string) => void;
  meta: number;
  setMeta: (value: number) => void;
  gastos: number;
  setGastos: (value: number) => void;
  comprovante: File | null;
  setComprovante: (value: File | null) => void;
}

export default function DonationsForm({
  RaUsuario,
  setRaUsuario,
  tipoDoacao,
  setTipoDoacao,
  quantidade,
  setQuantidade,
  fonte,
  setFonte,
  meta,
  setMeta,
  gastos,
  setGastos,
  comprovante,
  setComprovante,
}: Properties) {
  const [loading, setLoading] = useState(false);
  const [picking, setPicking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<number | null>(null);

  // Estados locais para os inputs
  const [metaInput, setMetaInput] = useState<string>("");
  const [gastosInput, setGastosInput] = useState<string>("");
  const [quantidadeInput, setQuantidadeInput] = useState<string>("");

  const normalize = (s: string) => s.replace(",", ".").trim();
  const toNumberOrNaN = (s: string) => Number(normalize(s));

  // Sincroniza valores numéricos com inputs de texto
  useEffect(() => {
    setMetaInput(meta ? String(meta) : "");
    setGastosInput(gastos ? String(gastos) : "");
    setQuantidadeInput(quantidade ? String(quantidade) : "");
  }, [meta, gastos, quantidade]);

  // Animação de botão
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes pop { 
        0% { transform: scale(1); } 
        40% { transform: scale(1.12); } 
        100% { transform: scale(1); } 
      }
      .animate-pop { animation: pop 150ms ease-out; }
      @media (prefers-reduced-motion: reduce) {
        .animate-pop { animation: none !important; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const stopGif = () => {
    setPicking(false);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handlePickClick = () => {
    if (loading) return;
    setPicking(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => stopGif(), 1000);
    fileInputRef.current?.click();
  };

  // Limpa timer ao desmontar
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0] ?? null;

    if (!file) {
      setComprovante(null);
      stopGif();
      return;
    }

    const okType = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/pdf",
    ].includes(file.type);
    const okSize = file.size <= 5 * 1024 * 1024;

    if (!okType) {
      alert(donationsContent.errors.invalidFileType);
      stopGif();
      return;
    }
    if (!okSize) {
      alert(donationsContent.errors.invalidFileSize);
      stopGif();
      return;
    }

    setComprovante(file);
    stopGif();
  };

  const handleQuantidadeChange = (value: string) => {
    setQuantidadeInput(value);
    const num = parseFloat(value.replace(",", "."));
    setQuantidade(isNaN(num) ? 0 : num);
  };

  const handleMetaChange = (value: string) => {
    setMetaInput(value);
    const num = parseFloat(value.replace(",", "."));
    setMeta(isNaN(num) ? 0 : num);
  };

  const handleGastosChange = (value: string) => {
    setGastosInput(value);
    const num = parseFloat(value.replace(",", "."));
    setGastos(isNaN(num) ? 0 : num);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="rounded-xl">
        <label className="block mb-1">
          {donationsContent.financialForm.eventLabel}
        </label>
        <input
          type="text"
          placeholder={donationsContent.financialForm.eventPlaceholder}
          value={fonte}
          onChange={(e) => setFonte(e.currentTarget.value)}
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5"
        />

        <label className="block mb-1 mt-3">
          {donationsContent.financialForm.goalLabel}
        </label>
        <input
          type="text"
          inputMode="decimal"
          placeholder={donationsContent.financialForm.goalPlaceholder}
          value={metaInput}
          onChange={(e) => handleMetaChange(e.currentTarget.value)}
          className="w-full bg-white border border-gray-300 rounded px-3 py-1.5"
        />

        <label className="block mb-1 mt-3">
          {donationsContent.financialForm.expensesLabel}
        </label>
        <input
          type="number"
          step="0.01"
          placeholder={donationsContent.financialForm.expensesPlaceholder}
          value={gastosInput}
          onChange={(e) => handleGastosChange(e.currentTarget.value)}
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5"
        />

        <label className="block mb-1 mt-3">
          {donationsContent.financialForm.amountLabel}
        </label>
        <input
          type="number"
          step="0.01"
          placeholder={donationsContent.financialForm.amountPlaceholder}
          value={quantidadeInput}
          onChange={(e) => handleQuantidadeChange(e.currentTarget.value)}
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5"
        />

        <label className="block mb-1 mt-8">
          {donationsContent.financialForm.receiptLabel}
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,application/pdf"
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
        />

        <div className="flex items-center">
          <button
            type="button"
            onClick={handlePickClick}
            onMouseDown={(e) => e.currentTarget.classList.add("animate-pop")}
            onAnimationEnd={(e) =>
              e.currentTarget.classList.remove("animate-pop")
            }
            className="inline-flex items-center justify-center h-14 w-18 rounded-lg bg-white transition"
            disabled={loading}
            aria-label={donationsContent.financialForm.receiptButtonAria}
          >
            <Image
              src={
                picking
                  ? (images.upload.animated as Img)
                  : (images.upload.static as Img)
              }
              alt={donationsContent.financialForm.receiptAlt}
              width={35}
              height={35}
              className="pointer-events-none select-none"
              draggable={false}
              priority
            />
          </button>

          <span className="ml-3 text-sm text-gray-700">
            {comprovante
              ? `${comprovante.name}`
              : donationsContent.financialForm.receiptEmpty}
          </span>
        </div>
      </div>
    </div>
  );
}
