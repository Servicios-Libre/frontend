// src/hooks/useChatBackend.ts
import axios from "axios";
import { ChatContract, ChatMessage } from "@/types";

export const useChatBackend = (
  chatId: string,
  token: string,
  userId: string
) => {
  const sendMessageToBackend = async (text: string): Promise<ChatMessage> => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chat/${chatId}/messages`,
      {
        senderId: userId,
        message: text,
        timestamp: new Date().toISOString(),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      id: response.data.id,
      message: response.data.message ?? text,
      senderId: response.data.senderId ?? userId,
      timestamp: response.data.timestamp ?? new Date().toISOString(),
    };
  };

  const createContract = async (
    contractData: ChatContract,
    trabajadorId: string,
    clienteId: string
  ): Promise<ChatContract | null> => {
    const body = {
      ...contractData,
      chatId,
      workerId: trabajadorId,
      clientId: clienteId,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat/${chatId}/contract`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Error al crear contrato:", error);
      return null;
    }
  };

  const acceptContract = async (contractId: string): Promise<ChatContract | null> => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat/contract/${contractId}/accept`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Error al aceptar contrato:", error);
      return null;
    }
  };

  const confirmService = async (
    contractId: string,
    clientId: string,
    trabajadorId: string
  ): Promise<ChatContract | null> => {
    const role = userId === clientId ? "user" : userId === trabajadorId ? "worker" : null;
    if (!role) return null;

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat/contract/${contractId}/confirm`,
        { role },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Error al confirmar servicio:", error);
      return null;
    }
  };

  return {
    sendMessageToBackend,
    createContract,
    acceptContract,
    confirmService,
  };
};
