"use client";

import { SetStateAction, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "@/styles/globals.css";
import MenuDesktop from "@/components/menu-desktop";
import MenuMobile from "@/components/menu-mobile";
import DonationsForm from "@/components/donations-form";
import FoodDonations from "@/components/food-donations";
import { donationsContent } from "@/lib/content";
import { createContributionMock, uploadComprovanteMock } from "@/lib/mock-data";

export default function Donations() {
  const params = useParams();
  const [RaUsuario, setRaUsuario] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"finance" | "food">("finance");

  const [financialData, setFinancialData] = useState({
    fonte: "",
    meta: 0,
    gastos: 0,
    quantidade: 0,
    comprovante: null as File | null,
  });

  const [foodData, setFoodData] = useState({
    fonte: "",
    meta: 0,
    gastos: 0,
    quantidade: 0,
    pesoUnidade: 0,
    comprovante: null as File | null,
    idAlimento: 1,
  });

  const [totaisPontos, setTotaisPontos] = useState(0);

  useEffect(() => {
    if (params?.RaUsuario) {
      setRaUsuario(Number(params.RaUsuario));
    }
  }, [params]);

  const handleFinancialSubmit = async () => {
    if (loading || !RaUsuario) return;

    if (
      !financialData.fonte.trim() ||
      !financialData.quantidade ||
      financialData.quantidade <= 0
    ) {
      alert(donationsContent.errors.missingFinancial);
      return;
    }

    setLoading(true);

    try {
      const body = {
        RaUsuario: RaUsuario,
        TipoDoacao: "Financeira",
        Quantidade: Number(financialData.quantidade),
        Meta: Number(financialData.meta) || 0,
        Gastos: Number(financialData.gastos) || 0,
        Fonte: financialData.fonte.trim(),
      };

      const data = await createContributionMock(body);
      const IdContribuicaoFinanceira = data.data?.IdContribuicaoFinanceira;

      if (financialData.comprovante && IdContribuicaoFinanceira) {
        await uploadComprovanteMock({
          TipoDoacao: "Financeira",
          IdContribuicao: IdContribuicaoFinanceira,
        });
      }

      alert(donationsContent.success.financial);

      setFinancialData({
        fonte: "",
        meta: 0,
        gastos: 0,
        quantidade: 0,
        comprovante: null,
      });
    } catch (err: any) {
      alert(`${donationsContent.errors.saveFinancial} ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFoodSubmit = async () => {
    if (loading || !RaUsuario) return;

    if (!foodData.idAlimento || foodData.idAlimento <= 0) {
      alert(donationsContent.errors.missingFood);
      return;
    }

    if (
      !foodData.fonte.trim() ||
      !foodData.quantidade ||
      foodData.quantidade <= 0 ||
      !foodData.pesoUnidade ||
      foodData.pesoUnidade <= 0
    ) {
      alert(donationsContent.errors.missingFoodFields);
      return;
    }

    setLoading(true);

    try {
      const body = {
        RaUsuario: Number(RaUsuario),
        TipoDoacao: "Alimenticia",
        Quantidade: Number(foodData.quantidade),
        PesoUnidade: Number(foodData.pesoUnidade),
        Gastos: Number(foodData.gastos) || 0,
        Meta: Number(foodData.meta) || 0,
        Fonte: foodData.fonte.trim(),
        IdAlimento: Number(foodData.idAlimento),
      };

      const comprovante = await createContributionMock(body);
      const IdContribuicaoAlimenticia =
        comprovante.data?.IdContribuicaoAlimenticia;

      if (foodData.comprovante && IdContribuicaoAlimenticia) {
        await uploadComprovanteMock({
          TipoDoacao: "Alimenticia",
          IdContribuicao: IdContribuicaoAlimenticia,
        });
      }

      alert(donationsContent.success.food);

      setFoodData({
        fonte: "",
        meta: 0,
        gastos: 0,
        idAlimento: 0,
        quantidade: 0,
        pesoUnidade: 0,
        comprovante: null,
      });
      setTotaisPontos(0);
    } catch (err: any) {
      alert(`${donationsContent.errors.saveFood} ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-10 w-full bg-background">
      <header className="w-full">
        <button
          className={`open-menu ${menuOpen ? "hidden" : "menu-icon"}`}
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>

        <div className="sticky top-0 left-0 right-0 z-10 md:static bg-background/80 supports-[backdrop-filter]:bg-background/60">
          <div className="md:hidden w-full flex justify-center">
            <div className="inline-grid grid-cols-2 w-fit rounded-full border border-secondary/40 bg-background p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setActiveTab("finance")}
                className={`rounded-full p-3 text-sm font-medium ${
                  activeTab === "finance"
                    ? "bg-primary text-white"
                    : "text-black"
                }`}
              >
                {donationsContent.newContribution.tabs.finance}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("food")}
                className={`rounded-full p-3 text-sm font-medium ${
                  activeTab === "food" ? "bg-primary text-white" : "text-black"
                }`}
              >
                {donationsContent.newContribution.tabs.food}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full flex flex-col items-center md:pt-10 pb-20">
        <MenuDesktop menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MenuMobile />

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div
            className={`${
              activeTab === "finance" ? "block" : "hidden"
            } md:block bg-transparent border border-secondary/40 p-6 rounded-xl shadow-sm w-full`}
          >
            <h2 className="text-2xl font-semibold mb-4">
              {donationsContent.newContribution.sections.finance}
            </h2>

            <DonationsForm
              fonte={financialData.fonte}
              setFonte={(v) => setFinancialData({ ...financialData, fonte: v })}
              meta={financialData.meta}
              setMeta={(v) =>
                setFinancialData({ ...financialData, meta: Number(v) })
              }
              gastos={financialData.gastos}
              setGastos={(v) =>
                setFinancialData({ ...financialData, gastos: Number(v) })
              }
              quantidade={financialData.quantidade}
              setQuantidade={(v) =>
                setFinancialData({ ...financialData, quantidade: Number(v) })
              }
              comprovante={financialData.comprovante}
              setComprovante={(v) =>
                setFinancialData({ ...financialData, comprovante: v })
              }
              tipoDoacao={"Financeira"}
              setTipoDoacao={() => {}}
              RaUsuario={0}
              setRaUsuario={function (value: SetStateAction<number>): void {
                throw new Error("Function not implemented.");
              }}
            />

            <div className="mt-10 flex justify-end">
              <button
                type="button"
                onClick={handleFinancialSubmit}
                disabled={loading}
                className="w-fit px-4 py-2 rounded-[8px] bg-primary text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? donationsContent.newContribution.actions.submitting
                  : donationsContent.newContribution.actions.submit}
              </button>
            </div>
          </div>

          <div
            className={`${
              activeTab === "food" ? "block" : "hidden"
            } md:flex md:flex-col bg-transparent border border-secondary/40 p-6 rounded-xl shadow-sm w-full`}
          >
            <h2 className="text-2xl font-semibold mb-3">
              {donationsContent.newContribution.sections.food}
            </h2>

            <div className="min-h-0 flex-1 rounded-lg">
              <FoodDonations
                fonte={foodData.fonte}
                setFonte={(v) => setFoodData({ ...foodData, fonte: v })}
                meta={foodData.meta}
                setMeta={(v) => setFoodData({ ...foodData, meta: Number(v) })}
                gastos={foodData.gastos}
                setGastos={(v) =>
                  setFoodData({ ...foodData, gastos: Number(v) })
                }
                quantidade={foodData.quantidade}
                setQuantidade={(v) =>
                  setFoodData({ ...foodData, quantidade: Number(v) })
                }
                pesoUnidade={foodData.pesoUnidade}
                setPesoUnidade={(v) =>
                  setFoodData({ ...foodData, pesoUnidade: Number(v) })
                }
                idAlimento={foodData.idAlimento}
                setIdAlimento={(v) =>
                  setFoodData({ ...foodData, idAlimento: Number(v) })
                }
                comprovante={foodData.comprovante}
                setComprovante={(v) =>
                  setFoodData({ ...foodData, comprovante: v })
                }
                onTotaisChange={(totais) => setTotaisPontos(totais.pontos)}
              />
            </div>

            <div className="mt-4 flex flex-none items-center gap-3 justify-end">
              <div className="bg-secondary/20 border border-secondary/40 text-sm rounded-lg py-2 px-16 whitespace-nowrap w-[300px] overflow-hidden text-ellipsis">
                {donationsContent.newContribution.pointsLabel}:{" "}
                <span>{totaisPontos.toLocaleString("pt-BR")}</span>
              </div>

              <button
                type="button"
                onClick={handleFoodSubmit}
                disabled={loading}
                className="w-fit px-4 py-2 rounded-lg bg-primary text-white hover:bg-[#195b41] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? donationsContent.newContribution.actions.submitting
                  : donationsContent.newContribution.actions.submit}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
