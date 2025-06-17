type Props = {
  state: string;
  city: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const countries = [
  { name: "Argentina", cities: ["Buenos Aires", "Córdoba", "Rosario"] },
  { name: "Uruguay", cities: ["Montevideo", "Punta del Este"] },
  // Agrega más países y ciudades según tu necesidad
];

export default function CountryCitySelect({ state, city, onChange }: Props) {
  const selectedCountry = countries.find((c) => c.name === state);

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <select
        name="state"
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={state}
        onChange={onChange}
        required
      >
        <option value="">Seleccionar país</option>
        {countries.map((country) => (
          <option key={country.name} value={country.name}>
            {country.name}
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
        <option value="">Seleccionar ciudad</option>
        {selectedCountry &&
          selectedCountry.cities.map((cityName) => (
            <option key={cityName} value={cityName}>
              {cityName}
            </option>
          ))}
      </select>
    </div>
  );
}