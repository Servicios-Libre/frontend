import Image from "next/image";
import { Crown } from "lucide-react";

interface Props {
  clienteName: string;
  trabajadorName: string;
  clientePic: string;
  trabajadorPic: string;
  trabajadorPremium: boolean;
}

const UserInfoPanel = ({
  clienteName,
  trabajadorName,
  clientePic,
  trabajadorPic,
  trabajadorPremium,
}: Props) => {
  return (
    <div className="flex gap-6 px-6 py-4 bg-white border-b">
      {/* Cliente */}
      <div className="flex-1 flex items-center gap-4 bg-white rounded-xl shadow border border-blue-100 p-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl border-2 border-white shadow">
          {clientePic ? (
            <Image
              src={clientePic}
              className="w-10 h-10 rounded-full object-cover"
              width={40}
              height={40}
              alt="Cliente"
            />
          ) : (
            clienteName.charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <div className="font-semibold text-gray-800">{clienteName}</div>
          <div className="text-xs text-blue-600 font-bold">Cliente</div>
        </div>
      </div>

      {/* Trabajador */}
      <div className="flex-1 flex items-center gap-4 bg-white rounded-xl shadow border border-green-100 p-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl border-2 border-white shadow">
          {trabajadorPic ? (
            <Image
              className="w-10 h-10 rounded-full object-cover"
              src={trabajadorPic}
              width={40}
              height={40}
              alt="Trabajador"
            />
          ) : (
            trabajadorName.charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <div
            className={`font-semibold flex items-center gap-1 ${
              trabajadorPremium
                ? "bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 bg-clip-text text-transparent"
                : "text-gray-800"
            }`}
          >
            {trabajadorPremium && (
              <Crown className="w-4 h-4 text-amber-600" />
            )}
            {trabajadorName}
          </div>
          <div
            className={`text-xs ${
              trabajadorPremium ? "text-yellow-400" : "text-green-600"
            } font-bold`}
          >
            Trabajador {trabajadorPremium && "Premium"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPanel;
