import Image from "next/image";

type JobCardProps = {
  image: string;
  title: string;
  description: string;
};

export default function JobCard({ image, title, description }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        width={300}
        height={300}
        src={image}
        alt={title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-black font-semibold">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
