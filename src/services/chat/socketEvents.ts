import { Socket } from "socket.io-client";
import { ChatMessage, ChatContract } from "@/types";

export const subscribeToMessages = (
  socket: Socket,
  onMessage: (msg: ChatMessage) => void
) => {
  socket.on("chat:message", onMessage);
};

export const sendMessage = (socket: Socket, messageData: {
  chatId: string;
  senderId: string;
  message: string;
}) => {
  socket.emit("chat:message", messageData);
};

export const sendContract = (
  socket: Socket,
  contractData: ChatContract
) => {
  socket.emit("chat:contract", contractData);
};

export const subscribeToContract = (
  socket: Socket,
  onContract: (contract: ChatContract) => void
) => {
  socket.on("chat:contract", onContract);
};

export const unsubscribeFromAll = (socket: Socket) => {
  socket.off("chat:message");
  socket.off("chat:contract");
};
