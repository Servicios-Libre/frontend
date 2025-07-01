type Props = {
  state: string;
  city: string;
  provinces: string[];
  cities: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function CountryCitySelect({
  state,
  city,
  provinces,
  cities,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <select
        name="state"
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={state}
        onChange={onChange}
        required
      >
        {!state && <option value="">Provincia</option>}
        {provinces.map((prov) => (
          <option key={prov} value={prov}>
            {prov}
          </option>
        ))}
      </select>

      <select
        name="city"
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={city}
        onChange={onChange}
        required
        disabled={!state}
      >
        {!city && <option value="">Ciudad</option>}
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
