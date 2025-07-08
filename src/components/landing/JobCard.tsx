import Image from "next/image";
import Link from 'next/link';

type JobCardProps = {
  image: string;
  title: string;
  description: string;
  workerId: string;
  serviceId: string;
};

const DESCRIPTION_LIMIT = 70;

export default function JobCard({
  image,
  title,
  description,
  workerId,
  serviceId, // 🧠 este era el que faltaba desestructurar
}: JobCardProps) {
  const truncatedDescription =
    description.length > DESCRIPTION_LIMIT
      ? description.substring(0, DESCRIPTION_LIMIT) + '...'
      : description;

  const needsFade = description.length > DESCRIPTION_LIMIT;

  return (
    <Link href={`/worker-profile/${workerId}?serviceId=${serviceId}`}>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer h-[340px] flex flex-col justify-between">
        <div className="relative w-full h-44">
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-t-xl"
          />
        </div>
        <div className="p-5 flex flex-col justify-between flex-1 relative">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {title}
          </h3>
          <p className="md:text-sm lg:text-base text-gray-700 leading-normal line-clamp-3">
            {truncatedDescription}
          </p>
          {needsFade && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
          )}
        </div>
      </div>
    </Link>
  );
}
