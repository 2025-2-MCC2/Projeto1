import Modal from "../hooks/use-modal";
import DeleteContribution from "@/components/delete-contribution";
import formatBRL from "./formatBRL";
import { historyContent, images } from "@/lib/content";

interface ContributionData {
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
  IdContribuicao: number;
  DataContribuicao: string;
  alimentos?: {
    NomeAlimento: string;
    Pontuacao: number ;
    Quantidade?: number;
  }[];
  PontuacaoAlimento?: number;
  PesoUnidade: number;
  uuid: string;
}

interface RecordsModalProps {
  data: ContributionData;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleted?: () => void;
}

const RecordsModal: React.FC<RecordsModalProps> = ({
  data,
  isOpen,
  setIsOpen,
  onDeleted,
}) => {
  if (!data) return null;

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Modal isActive={isOpen} onClose={toggleModal}>
      <div className="overflow-y-scroll max-h-300  drop-shadow-2xl items-center relative bg-[#FFFDF5] rounded-2xl ">
        <div className="flex max-w-[95vw] flex-col gap-5 z-10 px-10 py-8 w-90 text-left">
          <div className="">
            <div>
              <h2 className="text-xl font-semibold">{data.Fonte}</h2>
              <div>
                <p className="text-base text-gray-600 mt-3 mb-0">
                  {new Date(data.DataContribuicao).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={toggleModal}
                className="text-white text-4xl leading-none"
              ></button>

              <div className="flex flex-col gap-4 text-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                  <div>
                    <p className="text-sm text-gray-600">
                      {historyContent.modal.typeLabel}
                    </p>
                    <p className="font-semibold">{data.TipoDoacao}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">
                      {historyContent.modal.quantityLabel}
                    </p>
                    <p className="font-semibold">
                      {Intl.NumberFormat("pt-BR").format(data.Quantidade)}
                      {data.TipoDoacao === "Financeira"
                        ? ` ${historyContent.modal.units.money}`
                        : ` ${historyContent.modal.units.kg}`}
                    </p>
                  </div>

                  {data.Meta !== null && (
                    <div>
                      <p className="text-sm text-gray-600">
                        {historyContent.modal.goalLabel}
                      </p>
                      <p className="font-semibold">
                        {typeof data.Meta === "number" &&
                        Number.isFinite(data.Meta)
                          ? new Intl.NumberFormat("pt-BR").format(data.Meta)
                          : "-"}
                        {data.TipoDoacao === "Financeira"
                          ? ` ${historyContent.modal.units.money}`
                          : ` ${historyContent.modal.units.kg}`}
                      </p>
                    </div>
                  )}

                  {data.Gastos !== null && (
                    <div>
                      <p className="text-sm text-gray-600">
                        {historyContent.modal.expensesLabel}
                      </p>
                      <p className="font-semibold"> {formatBRL(data.Gastos)}</p>
                    </div>
                  )}

                  {data.TipoDoacao === "Alimenticia" &&
                  data.alimentos &&
                  data.alimentos.length > 0 ? (
                    <ul className="flex justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          {historyContent.modal.foodsLabel}
                        </p>
                        {data.alimentos.map((a, i) => (
                          <li key={i} className="font-semibold">
                            {a.NomeAlimento}
                          </li>
                        ))}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          {historyContent.modal.scoreLabel}
                        </p>
                        {data.alimentos.map((a, i) => (
                          <li key={i} className="font-semibold">
                            <p>
                              {a.Pontuacao ? a.Pontuacao * data.Quantidade : 0}{" "}
                              {historyContent.modal.units.pointsSuffix}
                            </p>
                          </li>
                        ))}
                      </div>
                    </ul>
                  ) : data.TipoDoacao === "Alimenticia" ? (
                    <p>{historyContent.modal.noFood}</p>
                  ) : null}

                  {data.comprovante?.Imagem && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        {historyContent.modal.receiptLabel}
                      </p>
                      <a
                        href={data.comprovante.Imagem}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black-600 underline"
                      >
                        {historyContent.modal.receiptLink}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DeleteContribution
              IdContribuicao={data.IdContribuicao}
              TipoDoacao={data.TipoDoacao}
              onDeleted={() => {
                setIsOpen(false);
                onDeleted?.();
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default RecordsModal;
