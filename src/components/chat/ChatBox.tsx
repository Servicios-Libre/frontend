"use client"
import React, { useEffect, useState } from "react";
import { connectSocket, getSocket } from "@/services/socket";

const ChatBox = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const socket = connectSocket();

    socket.on("connect", () => {
      console.log("Conectado al servidor de sockets");
    });

    socket.on("respuesta", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("respuesta");
      socket.disconnect();
    };
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const socket = getSocket();
    if (socket) {
      socket.emit("mensaje", input);
    }
    setInput("");
  };

  return (
    <div className="pt-48">
      <div>
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ChatBox;