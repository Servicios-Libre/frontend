import Image from "next/image";
import { useRef } from "react";

interface ProfileFormType {
    phone: string;
    street: string;
    house_number: string;
    city: string;
    state: string;
    zip_code: string;
    user_pic?: string;
}

interface Props {
    formData: ProfileFormType;
    editMode: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    setUserPic: (url: string) => void;
    countries: string[];
    countryCities: string[];
}

export default function ProfileForm({
    formData,
    editMode,
    handleChange,
    handleSelectChange,
    setUserPic,
    countries,
    countryCities,
}: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setUserPic(reader.result); // Guarda la imagen como base64 en el estado
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex flex-col items-center md:items-start mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Foto de perfil</label>
                <div className="relative w-24 h-24 mb-2">
                    <Image
                        src={formData.user_pic || "/img/default-profile.png"}
                        alt="Foto de perfil"
                        width={96} // 24 * 4 = 96px
                        height={96}
                        className="w-24 h-24 rounded-full object-cover border"
                    />
                    {editMode && (
                        <button
                            type="button"
                            className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 text-xs"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            Cambiar
                        </button>
                    )}
                </div>
                {editMode && (
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Calle</label>
                <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Número de casa</label>
                <input
                    type="text"
                    name="house_number"
                    value={formData.house_number}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Estado</label>
                <select
                    name="state"
                    value={formData.state}
                    onChange={handleSelectChange}
                    disabled={!editMode}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                    <option value="">Selecciona un estado</option>
                    {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                <select
                    name="city"
                    value={formData.city}
                    onChange={handleSelectChange}
                    disabled={!editMode}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                    <option value="">Selecciona una ciudad</option>
                    {countryCities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Código postal</label>
                <input
                    type="text"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
        </form>
    );
}