import { io, Socket } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_API_URL;
let socket: Socket | null = null;

export const initSocket = () => {
  if (!socket) {
    socket = io(URL, { transports: ["websocket"] });
  }
  return socket;
};

export const getSocket = () => socket;
