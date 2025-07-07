import { ChatContract } from "@/types";

export const useContractConfirmationStatus = (
  contract: ChatContract | null,
  userRole: "client" | "worker"
) => {
  if (!contract) return false;

  return (
    (userRole === "client" && contract.clientConfirmed === true) ||
    (userRole === "worker" && contract.workerConfirmed === true)
  );
};
