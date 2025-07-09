type Props = {
  state: string;
  city: string;
  provinces: string[];
  cities: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  errors?: {
    state?: string;
    city?: string;
  };
};

export default function CountryCitySelect({
  state,
  city,
  provinces,
  cities,
  onChange,
  onBlur,
  errors,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="w-full">
        <select
          name="state"
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={state}
          onChange={onChange}
          onBlur={onBlur}
          required
        >
          {!state && <option value="">Provincia</option>}
          {provinces.map((prov) => (
            <option key={prov} value={prov}>
              {prov}
            </option>
          ))}
        </select>
        {errors?.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
      </div>

      <div className="w-full">
        <select
          name="city"
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={city}
          onChange={onChange}
          onBlur={onBlur}
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
        {errors?.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
      </div>
    </div>
  );
}
