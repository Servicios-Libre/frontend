// src/components/common/EmptyState.tsx
import { FaRegFolderOpen, FaUser, FaTools } from "react-icons/fa";

type Props = {
  message: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string; // ejemplo: "border-blue-900"
  icon?: "folder" | "user" | "tools";
};

export default function EmptyState({
  message,
  bgColor = "bg-gray-100",
  textColor = "text-gray-600",
  borderColor = "border-gray-300",
  icon = "folder",
}: Props) {
  const iconMap = {
    folder: <FaRegFolderOpen className={`text-4xl ${textColor}`} />,
    user: <FaUser className={`text-4xl ${textColor}`} />,
    tools: <FaTools className={`text-4xl ${textColor}`} />,
  };

  return (
    <div
      className={`w-full flex flex-col items-center justify-center py-12 px-4 rounded-md shadow-sm ${bgColor} ${borderColor} border`}
    >
      <div className="mb-4">{iconMap[icon]}</div>
      <p className={`text-center text-base sm:text-lg ${textColor}`}>{message}</p>
    </div>
  );
}
