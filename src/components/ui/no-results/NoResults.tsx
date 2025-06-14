import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function NoResults({ mensaje = "No se encontraron servicios." }: { mensaje?: string }) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-lg p-8 my-8 text-center text-gray-600 col-span-full">
      <FontAwesomeIcon icon={faCircleExclamation} className="text-3xl text-blue-500 mb-4" />
      <p className="text-lg font-medium">{mensaje}</p>
    </div>
  );
}