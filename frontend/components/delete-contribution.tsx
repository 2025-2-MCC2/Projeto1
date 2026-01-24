"use client";

import React from "react";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { historyContent } from "@/lib/content";
import { deleteContributionMock } from "@/lib/mock-data";

type DeleteContributionProps = {
  IdContribuicao: number;
  TipoDoacao: string;
  onDeleted?: () => void;
};
export default function DeleteContribution({
  IdContribuicao,
  TipoDoacao,
  onDeleted,
}: DeleteContributionProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleConfirm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await deleteContributionMock({ TipoDoacao, IdContribuicao });

      setOpen(false);
      onDeleted?.();
    } catch (e: any) {
      setError(e?.message ?? historyContent.deleteDialog.errorFallback);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-end mt-6">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <button
            type="button"
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2
                    ${
                      loading
                        ? "bg-[#b41333]/60 cursor-not-allowed"
                        : "bg-[#b41333] hover:bg-[#d54646]"
                    }
                    text-white font-medium transition-colors duration-200 cursor-pointer
                    shadow-[0_6px_20px_rgba(247,201,212,0.5)] hover:shadow-[0_10px_28px_rgba(247,201,212,0.6)]`}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
            </svg>
            {historyContent.deleteDialog.trigger}
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{historyContent.deleteDialog.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {historyContent.deleteDialog.description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* mudar mensagem de erro depois*/}
          {error && <p className="ml-3 text-sm text-red-600"> {error} </p>}

          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>
              {historyContent.deleteDialog.cancel}
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleConfirm}
              disabled={loading}
              className="bg-[#b41333] text-white hover:bg-[#d54646] focus:ring-0 cursor-pointer"
            >
              {loading
                ? historyContent.deleteDialog.deleting
                : historyContent.deleteDialog.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
