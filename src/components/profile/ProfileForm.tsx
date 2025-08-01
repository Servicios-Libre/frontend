import React from "react";
import SocialLinksForm from "./SocialLinksForm";

interface ProfileFormType {
    phone: string;
    street: string;
    house_number: string;
    city: string;
    state: string;
    zip_code: string;
    user_pic?: string;
    description: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
}

type Props = {
    formData: ProfileFormType;
    editMode: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    setUserPic: (url: string) => void;
    countries: string[];
    countryCities: string[];
    isWorker: boolean;
};

export default function ProfileForm({
    formData,
    editMode,
    handleChange,
    handleSelectChange,
    countries,
    countryCities,
    isWorker,
}: Props) {

    return (
        <form className="flex flex-col gap-4 bg-white rounded-xl shadow-sm p-8 border border-blue-100">
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="w-full">
                    <label htmlFor="phone" className="block text-blue-700 font-normal mb-1">
                        Teléfono {isWorker}
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Ej: 1123456789"
                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="w-full">
                    <label htmlFor="street" className="block text-blue-700 font-normal mb-1">
                        Calle
                    </label>
                    <input
                        id="street"
                        name="street"
                        type="text"
                        placeholder="Ej: Av. Siempre Viva"
                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                        value={formData.street}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="house_number" className="block text-blue-700 font-normal mb-1">
                        Número
                    </label>
                    <input
                        id="house_number"
                        name="house_number"
                        type="text"
                        placeholder="Ej: 742"
                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                        value={formData.house_number}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="w-full">
                    <label htmlFor="state" className="block text-blue-700 font-normal mb-1">
                        Provincia
                    </label>
                    <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleSelectChange}
                        disabled={!editMode}
                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                    >
                        <option value="">Selecciona una provincia</option>
                        {[...new Set(countries)].map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-full">
                    <label htmlFor="city" className="block text-blue-700 font-normal mb-1">
                        Ciudad
                    </label>
                    <select
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleSelectChange}
                        disabled={!editMode}
                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                    >
                        <option value="">Selecciona una ciudad</option>
                        {[...new Set(countryCities)].sort().map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="w-full">
                    <label htmlFor="zip_code" className="block text-blue-700 font-normal mb-1">
                        Código Postal
                    </label>
                    <input
                        id="zip_code"
                        name="zip_code"
                        type="text"
                        placeholder="Ej: 1000"
                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                        value={formData.zip_code}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
            </div>

            <div className="w-full">
                <label htmlFor="description" className="block text-blue-700 font-normal mb-1">
                    Descripción
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={3}
                    placeholder="Cuéntanos sobre ti o tus habilidades"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                    value={formData.description}
                    onChange={handleChange}
                    disabled={!editMode}
                />
            </div>

            {isWorker && (
                <SocialLinksForm
                    formData={formData}
                    editMode={editMode}
                    handleChange={handleChange}
                />
            )}

        </form>
    );
}