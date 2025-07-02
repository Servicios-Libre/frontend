'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import JobCard from './JobCard';

type Service = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
};

export default function FeaturedJobsSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPremiumServices = async () => {
      try {
        const response = await axios.get<Service[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/services/premium`
        );
        setServices(response.data.slice(0, 6)); // Limita a 6
      } catch (error) {
        console.error('Error al obtener servicios premium:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPremiumServices();
  }, []);

  return (
    <section className="bg-[#f3f8ff] py-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-10">
          Trabajos destacados
        </h2>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white h-64 rounded-xl animate-pulse shadow-inner"
              />
            ))}
          </div>
        ) : services.length === 0 ? (
          <p className="text-center text-sm text-gray-600">
            No hay trabajos destacados disponibles por ahora 🛠️
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((job) => (
              <JobCard
                key={job.id}
                image={job.thumbnail}
                title={job.title}
                description={job.description}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
