import { ChatMessage } from "@/types";
import { useRef } from "react";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";
import { useSortedMessages } from "@/hooks/useSortedMessages";

interface Props {
  messages: ChatMessage[];
  currentUserId: string;
}

const MessageList = ({ messages, currentUserId }: Props) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const sortedMessages = useSortedMessages(messages);
  useScrollToBottom(messagesEndRef);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 space-y-2 bg-[#ece5dd] relative">
      {sortedMessages.map((msg, index) => {
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
  );
};

export default MessageList;
