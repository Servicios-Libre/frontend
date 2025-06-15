import { FaCamera } from "react-icons/fa";
import { useRef } from "react";
import Image from "next/image";

type Props = {
  userPic: string;
  setUserPic: (url: string) => void;
  editable: boolean;
};

const ProfilePhoto = ({ userPic, setUserPic, editable }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-20 h-20">
      <Image
        width={150}
        height={150}
        src={userPic || "/img/avatar.jpg"}
        alt="Avatar"
        className="w-20 h-20 rounded-full object-cover border-2 border-white shadow"
      />
      {editable && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full cursor-pointer shadow"
        >
          <FaCamera className="text-gray-600" />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ProfilePhoto;
