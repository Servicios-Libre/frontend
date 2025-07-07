import { useEffect } from "react";
import { ChatMessage, ChatContract } from "@/types";
import {
  initSocket,
  getSocket,
} from "@/services/chat/socket";
import {
  sendMessage,
  subscribeToMessages,
  unsubscribeFromAll,
  sendContract,
  subscribeToContract,
} from "@/services/chat/socketEvents";

export const useChatSocket = ({
  chatId,
  currentUserId,
  onMessage,
  onContract,
}: {
  chatId: string;
  currentUserId: string;
  onMessage: (message: ChatMessage) => void;
  onContract: (contract: ChatContract) => void;
}) => {
  useEffect(() => {
    const socket = initSocket();

    if (socket && chatId) {
      socket.emit("joinChat", { chatRoom: `chat_${chatId}` });

      subscribeToMessages(socket, onMessage);
      subscribeToContract(socket, onContract);
    }

    return () => {
      if (socket && chatId) {
        socket.emit("leaveChat", { chatRoom: `chat_${chatId}` });
        unsubscribeFromAll(socket);
      }
    };
  }, [chatId]);

  const sendChatMessage = (message: string) => {
    const socket = getSocket();
    if (socket) {
      sendMessage(socket, {
        chatId,
        senderId: currentUserId,
        message,
      });
    }
  };

  const sendChatContract = (contract: ChatContract) => {
    const socket = getSocket();
    if (socket) {
      sendContract(socket, contract);
    }
  };

  return { sendChatMessage, sendChatContract };
};
