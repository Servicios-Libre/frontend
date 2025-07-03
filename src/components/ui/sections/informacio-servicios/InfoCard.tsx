export default function InfoCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="bg-gradient-to-r  from-sky-600 via-sky-600 to-sky-700 shadow-lg rounded-xl p-5 text-center transition hover:scale-105">
            <div className="flex justify-between items-start">
                <div className="text-blue-200 text-2xl mb-4">{icon}</div>
                <h3 className="text-gray-100 text-xl font-semibold mb-2">{title}</h3>
            </div>
            <p className="text-gray-100 text-sm">{description}</p>
        </div>
    );
}