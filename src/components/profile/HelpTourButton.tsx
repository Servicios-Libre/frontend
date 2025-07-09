import { HelpCircle } from "lucide-react";

interface HelpTourButtonProps {
  startTour: () => void;
}

const HelpTourButton = ({ startTour }: HelpTourButtonProps) => {
  return (
    <button
      onClick={startTour}
      className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      aria-label="Iniciar tour de ayuda"
      title="Iniciar tour de ayuda"
    >
      <HelpCircle className="w-8 h-8" />
    </button>
  );
};

export default HelpTourButton;
