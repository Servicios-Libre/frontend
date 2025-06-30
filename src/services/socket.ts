import { io, Socket } from "socket.io-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL

let socket: Socket | null = null;

export function connectSocket() {
    if (!socket) {
        socket = io(API_URL, { transports: ["websocket"] });
    }
    return socket
}

export const getSocket = () => socket