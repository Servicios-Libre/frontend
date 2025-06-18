import { FaCamera } from "react-icons/fa";
import Image from "next/image";
import { RefObject } from "react";
import { uploadToCloudinary } from "@/services/cloudinaryUpload";

type Props = {
  userPic: string;
  setUserPic: (url: string) => void;
  editable: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
};

const ProfilePhoto = ({ userPic, setUserPic, editable, fileInputRef }: Props) => {

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadToCloudinary(file);
      if (url) {
        setUserPic(url);
      }
    }
  };

  return (
    <div className="relative w-32 h-32 sm:w-24 sm:h-24">
      <Image
        width={128}
        height={128}
        src={userPic || "/img/avatar.jpg"}
        alt="Avatar"
        priority
        className="w-32 h-32 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-white shadow"
      />
      {editable && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-1 right-1 bg-white p-2 rounded-full cursor-pointer shadow hover:bg-blue-100 transition"
        >
          <FaCamera className="text-gray-600 text-lg" />
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
