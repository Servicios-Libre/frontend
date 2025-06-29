import { FaSearch } from "react-icons/fa";

type SearchInputProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
};

export function SearchInput({
  searchTerm,
  setSearchTerm,
  placeholder = "Buscar...",
}: SearchInputProps) {
  return (
    <div className="relative w-full md:w-80">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
        <FaSearch className="text-sm" />
      </span>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-4 py-2 w-full rounded-lg bg-white text-gray-800 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
      />
    </div>
  );
}
