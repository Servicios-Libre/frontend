"use client";

import { ChatMessage, ChatContract } from "@/types";
import { useState, useRef, useEffect } from "react";
import ContractForm from "./ContractForm";
import ContractView from "./ContractView";
import { FaPaperPlane } from "react-icons/fa";
import ReviewForm from "../reviews/ReviewForm";
import Image from "next/image";
import { Crown } from "lucide-react";

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
  userRole,
  clientePic,
  trabajadorPic,
  trabajadorPremium
}: ChatBoxProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>(messages);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [showContractForm, setShowContractForm] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  useEffect(() => {
    const checkReview = async () => {
      if (contract?.completed && userRole === "client") {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/check?contractId=${contract.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = await response.json();
          setAlreadyReviewed(data.reviewExists);
        } catch (error) {
          console.error("Error al verificar reseña:", error);
        }
      }
    };

    checkReview();
  }, [contract?.id, contract?.completed, userRole]);

  useEffect(() => {
    setLocalMessages(messages);
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    await onSend(newMessage.trim());
    setNewMessage("");
  };

  const alreadyConfirmed =
    (userRole === "client" && contract?.clientConfirmed === true) ||
    (userRole === "worker" && contract?.workerConfirmed === true);

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Info de usuario */}
      <div className="flex gap-6 px-6 py-4 bg-white border-b">
        {/* Cliente */}
        <div className="flex-1 flex items-center gap-4 bg-white rounded-xl shadow border border-blue-100 p-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl border-2 border-white shadow">
            {clientePic ? (
              <Image src={clientePic} className="rounded-full" width={40} height={40} alt="Cliente" />
            ) : (
              clienteName.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <div className="font-semibold text-gray-800">{clienteName}</div>
            <div className="text-xs text-blue-600 font-bold">Cliente</div>
          </div>
        </div>

        {/* Trabajador */}
        <div className="flex-1 flex items-center gap-4 bg-white rounded-xl shadow border border-green-100 p-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl border-2 border-white shadow">
            {trabajadorPic ? (
              <Image
              className="rounded-full"
                src={trabajadorPic}
                width={40}
                height={40}
                alt="Trabajador"
              />
            ) : (
              trabajadorName.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <div
              className={`font-semibold flex items-center gap-1 ${
              trabajadorPremium ? "bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 bg-clip-text text-transparent" : "text-gray-800"
              }`}
            >
              {trabajadorPremium && <Crown className="w-4 h-4 text-amber-600" />}
              {trabajadorName}
            </div>
            <div className={`text-xs ${trabajadorPremium ? "text-yellow-400" : "text-green-600"} font-bold`}>Trabajador {trabajadorPremium && "Premium"}</div>
          </div>
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 space-y-2 bg-[#ece5dd] relative">
        {localMessages.map((msg, index) => {
          const isOwn = msg.senderId === currentUserId;
          return (
            <div
              key={`${msg.id}-${index}`}
              className={`flex ${
                isOwn ? "justify-end" : "justify-start"
              } animate-fade-in`}
            >
              <div
                className={`relative px-5 py-3 rounded-2xl shadow-sm transition-all duration-200 ${
                  isOwn
                    ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-br-[0.75rem]"
                    : "bg-white border border-gray-200 text-gray-900 rounded-bl-[0.75rem]"
                } max-w-[70%]`}
              >
                <p className="break-words">{msg.message}</p>
                <span
                  className={`block text-xs mt-2 text-right ${
                    isOwn ? "text-blue-100" : "text-gray-400"
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input y contrato */}
      <div className="sticky bottom-0 left-0 right-0 px-6 py-2 bg-[#f0f0f0]">
        {contract &&
          contract.status === "pending" &&
          currentUserId === clienteId && (
            <ContractView
              contract={contract}
              onAccept={onContractAccept}
              onCancel={() => setShowContractForm(false)}
            />
          )}

        {!contract && currentUserId === trabajadorId && (
          <button
            onClick={() => setShowContractForm(true)}
            className="w-full mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold transition"
          >
            Crear Contrato
          </button>
        )}

        {showContractForm && (
          <ContractForm
            onSubmit={onContractCreate}
            onCancel={() => setShowContractForm(false)}
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

        {contract?.completed && (
          <p className="text-green-600 text-center font-semibold mt-2">
            ✅ Servicio completado
          </p>
        )}
        {contract?.completed && userRole === "client" && !alreadyReviewed && (
          <ReviewForm
            workerId={trabajadorId}
            contractId={contract.id}
            token={localStorage.getItem("token") || ""}
            onReviewSubmitted={() => {
              setAlreadyReviewed(true);
            }}
          />
        )}

        <form onSubmit={handleSubmit} className="flex gap-2 mt-2 items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow text-gray-800 bg-white placeholder-gray-400"
            aria-label="Escribe un mensaje"
          />
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow transition-all duration-150"
            disabled={newMessage.trim() === ""}
            aria-label="Enviar mensaje"
          >
            <FaPaperPlane className="text-lg" />
          </button>
        </form>
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
