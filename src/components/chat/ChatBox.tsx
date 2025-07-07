"use client";

import { ChatMessage, ChatContract } from "@/types";
import { useState } from "react";
import UserInfoPanel from "./sections/UserInfoPanel";
import MessageList from "./sections/MessageList";
import MessageInput from "./sections/MessageInput";
import ContractSection from "./sections/ContractSection";
import ReviewSection from "./sections/ReviewSection";
import { useContractConfirmationStatus } from "@/hooks/useContractActions";
import { useReviewCheck } from "@/hooks/useReviewCheck";
import { useChatSocket } from "@/hooks/useChatSocket";

interface ChatBoxProps {
  chatId: string;
  messages: ChatMessage[];
  onSend: (message: string) => Promise<ChatMessage>;
  currentUserId: string;
  contract: ChatContract | null;
  onContractCreate: (contract: ChatContract) => void;
  onContractAccept: () => void;
  onConfirmService: () => Promise<void>;
  clienteName: string;
  trabajadorName: string;
  trabajadorId: string;
  clienteId: string;
  clientePic: string;
  trabajadorPic: string;
  trabajadorPremium: boolean;
  userRole: "client" | "worker";
  showContractForm: boolean;
  setShowContractForm: React.Dispatch<React.SetStateAction<boolean>>; 
}

const ChatBox = ({
  chatId,
  messages,
  onSend,
  currentUserId,
  contract,
  onContractCreate,
  onContractAccept,
  onConfirmService,
  clienteName,
  trabajadorName,
  trabajadorId,
  clienteId,
  clientePic,
  trabajadorPic,
  trabajadorPremium,
  userRole,
}: ChatBoxProps) => {
  const [showContractForm, setShowContractForm] = useState(false);
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>(messages);

  const alreadyConfirmed = useContractConfirmationStatus(contract, userRole);
  const alreadyReviewed = useReviewCheck(contract?.id, !!contract?.completed, userRole);

  const handleNewMessage = (incoming: ChatMessage) => {
    setLocalMessages((prev) => [...prev, incoming]);
  };

  const handleNewContract = (incomingContract: ChatContract) => {
    console.log("Nuevo contrato recibido via socket:", incomingContract);
  };

  const { sendChatMessage, sendChatContract } = useChatSocket({
    chatId,
    currentUserId,
    onMessage: handleNewMessage,
    onContract: handleNewContract,
  });

  return (
    <div className="flex flex-col h-full w-full bg-white">
      <UserInfoPanel
        clienteName={clienteName}
        trabajadorName={trabajadorName}
        clientePic={clientePic}
        trabajadorPic={trabajadorPic}
        trabajadorPremium={trabajadorPremium}
      />

      <MessageList messages={localMessages} currentUserId={currentUserId} />

      <div className="sticky bottom-0 left-0 right-0 px-6 py-2 bg-[#f0f0f0]">
        <ContractSection
          contract={contract}
          currentUserId={currentUserId}
          clienteId={clienteId}
          trabajadorId={trabajadorId}
          showContractForm={showContractForm}
          setShowContractForm={setShowContractForm}
          onContractCreate={(contractData) => {
            onContractCreate(contractData); 
            sendChatContract(contractData);
          }}
          onContractAccept={onContractAccept}
          onConfirmService={onConfirmService}
          alreadyConfirmed={alreadyConfirmed}
          userRole={userRole}
        />

        {contract?.completed && (
          <ReviewSection
            contractId={contract.id}
            trabajadorId={trabajadorId}
            alreadyReviewed={alreadyReviewed}
            setAlreadyReviewed={() => {}}
            userRole={userRole}
          />
        )}

        <MessageInput
          onSend={async (msg) => {
            await onSend(msg); 
            sendChatMessage(msg);
          }}
        />
      </div>

      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.4s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatBox;
