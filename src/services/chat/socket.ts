import { io, Socket } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_API_URL; // Cambia por tu backend

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    socket = io(URL, { transports: ["websocket"] });
  }
  return socket;
}