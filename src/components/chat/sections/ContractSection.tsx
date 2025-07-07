/* eslint-disable @typescript-eslint/no-explicit-any */
import ContractForm from "../contracts/ContractForm";
import ContractView from "../contracts/ContractView";

interface Props {
  contract: any;
  currentUserId: string;
  clienteId: string;
  trabajadorId: string;
  showContractForm: boolean;
  setShowContractForm: React.Dispatch<React.SetStateAction<boolean>>;
  onContractCreate: (contract: any) => void;
  onContractAccept: () => void;
  onConfirmService: () => Promise<void>;
  alreadyConfirmed: boolean;
  userRole: "client" | "worker";
}

const ContractSection = ({
  contract,
  currentUserId,
  clienteId,
  trabajadorId,
  showContractForm,
  setShowContractForm,
  onContractCreate,
  onContractAccept,
  onConfirmService,
  alreadyConfirmed,
  userRole,
}: Props) => {
  return (
    <>
      {/* Contrato pendiente: vista y acción */}
      {contract &&
        contract.status === "pending" &&
        currentUserId === clienteId && (
          <ContractView
            contract={contract}
            onAccept={onContractAccept}
            onCancel={() => setShowContractForm(false)}
          />
        )}

      {/* Crear contrato */}
      {!contract && currentUserId === trabajadorId && (
        <button
          onClick={() => setShowContractForm(true)}
          className="w-full mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold transition"
        >
          Crear Contrato
        </button>
      )}

      {/* Formulario de contrato */}
      {showContractForm && (
        <ContractForm
          onSubmit={onContractCreate}
          onCancel={() => setShowContractForm(false)}
          setShowContractForm={setShowContractForm}
        />
      )}

      {/* Confirmar servicio */}
      {contract && contract.status === "accepted" && !contract.completed && (
        <button
          onClick={onConfirmService}
          disabled={alreadyConfirmed}
          className={`w-full mt-2 mb-3 py-2 rounded-md font-semibold transition ${
            alreadyConfirmed
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-600 text-white"
          }`}
        >
          {userRole === "client"
            ? contract.clientConfirmed
              ? "Esperando al trabajador..."
              : "Concretar Servicio"
            : contract.workerConfirmed
            ? "Esperando al cliente..."
            : "Concretar Servicio"}
        </button>
      )}

      {/* Estado final */}
      {contract?.completed && (
        <p className="text-green-600 text-center font-semibold mt-2">
          ✅ Servicio completado
        </p>
      )}
    </>
  );
};

export default ContractSection;
