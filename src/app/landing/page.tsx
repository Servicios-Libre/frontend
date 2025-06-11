import JobCard from './components/JobCard';
import StoryCard from "./components/StoryCard";
import ReviewCard from "./components/ReviewCard";


/* Temporal */
const jobs = [
  {
    image: '/img/plomero.jpg',
    title: 'Plomero',
    description: 'Reparaciones, instalaciones y mantenimiento de cañerías.',
  },
  {
    image: '/img/jardinero.jpg',
    title: 'Jardinero',
    description: 'Corte de césped, poda y mantenimiento del jardín.',
  },
  {
    image: '/img/albanil.jpg',
    title: 'Albañil',
    description: 'Construcción, reparaciones y trabajos de obra.',
  },
];
const historias = [
  {
    imageSrc: '/img/amadecasa.jpg',
    alt: 'Paola limpiando',
    text: 'Paola encontró en Servicio Libre la posibilidad de ampliar su clientela como trabajadora de limpieza. Ahora tiene ingresos estables y clientes fijos.',
  },
  {
    imageSrc: '/img/plomero.jpg',
    alt: 'Gonzalo y su historia',
    text: 'Gonzalo necesitaba un plomero urgente. En minutos encontró uno en su zona, confiable y con reseñas. ¡Problema resuelto en el mismo día!',
  },
];
const opiniones = [
  {
    name: 'Lucía Gómez',
    rating: 5,
    comment: 'Conseguí trabajo en mi barrio en menos de 24 horas. ¡Excelente app!',
  },
  {
    name: 'Carlos Méndez',
    rating: 4,
    comment: 'Fácil de usar y encontré a alguien muy confiable para arreglar mi baño.',
  },
  {
    name: 'Sofía Ramírez',
    rating: 5,
    comment: 'Gracias a esta plataforma, ahora tengo más clientes y trabajo estable.',
  },
];



export default function LandingPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Encontrá trabajadores <br /> confiables cerca tuyo.
          </h1>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Buscar ahora
          </button>
        </div>

        {/* Imagen */}
        <div className="flex-1">
          <img
            src="img//hero-illustration.png"
            alt="Ilustración de busqueda de trabajos"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Trabajos más buscados</h2>
        <div className="grid md:grid-cols-3 gap-8">
            {jobs.map((job, index) => (
                <JobCard key={index} {...job} />
            ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Por qué elegir Servicio Libre?</h2>
            <ul className="space-y-4 text-gray-700 text-base list-disc list-inside">
            <li>Trabajadores verificados y con reseñas reales</li>
            <li>Conectate de forma rápida y segura</li>
            <li>Gratis para usuarios y sin comisiones ocultas</li>
            </ul>

            <div className="mt-6 flex gap-4">
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                Registrate Gratis
            </button>
            <button className="px-5 py-2 border border-gray-400 text-gray-800 rounded-lg font-semibold hover:bg-gray-100 transition">
                Cómo funciona
            </button>
            </div>
        </div>

        <div className="flex-1">
            <img
            src="/img/ServicioLibre.jpg"
            alt="Servicio Libre"
            className="w-full max-w-sm mx-auto"
            />
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-10 text-center">
            Historias reales
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
            {historias.map((historia, index) => (
            <StoryCard key={index} {...historia} />
            ))}
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-4 py-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-10 text-center">
                Opiniones de nuestros usuarios
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
                {opiniones.map((opinion, index) => (
                <ReviewCard key={index} {...opinion} />
                ))}
            </div>
      </section>

      <section className="bg-blue-600 text-white text-center py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para encontrar o empezar tu próxima changa?
        </h2>
        <p className="text-lg mb-8">
            Unite gratis y conectá con personas reales cerca tuyo.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition">
            Encontrar trabajadores
            </button>
            <button className="px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Ofrecer mis servicios
            </button>
        </div>
      </section>



    </main>
  );
}
