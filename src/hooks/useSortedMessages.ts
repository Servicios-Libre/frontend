import { useEffect, useState } from "react";
import { ChatMessage } from "@/types";

export const useSortedMessages = (messages: ChatMessage[]) => {
  const [sortedMessages, setSortedMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const ordered = [...messages].sort((a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    setSortedMessages(ordered);
  }, [messages]);

  return sortedMessages;
};
