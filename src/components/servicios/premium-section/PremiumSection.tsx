import { useAuth } from "@/context/AuthContext";
import {
  Crown,
  Star,
  Zap,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";


const PremiumSection = () => {
  const router = useRouter()
  const { user } = useAuth()
  return (
    <>
      {user?.premium ?? false ? (
        <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50 -mt-10 mb-10">
          <div className="max-w-6xl mx-auto px-4">
            {/* Header Premium */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm mb-4 shadow-lg">
                <Crown className="w-5 h-5" />
                USUARIO PREMIUM ACTIVO
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                ¡Disfruta tus beneficios Premium!
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Estás aprovechando al máximo tu membresía premium. Aquí tienes
                un recordatorio de todas tus ventajas exclusivas.
              </p>
            </div>

            {/* Beneficios Premium Activos */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-yellow-200 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-bl-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Prioridad en búsquedas
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Tus servicios aparecen primero en todos los resultados de
                    búsqueda, aumentando tu visibilidad.
                  </p>
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>Activo</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-yellow-200 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-bl-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Perfiles destacados
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Apareces en la sección de perfiles destacados, donde los
                    clientes buscan a los mejores profesionales.
                  </p>
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>Activo</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-yellow-200 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-bl-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Detalles exclusivos
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Tu perfil muestra insignias premium y detalles exclusivos
                    que te distinguen de otros profesionales.
                  </p>
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>Activo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Premium */}
            <div className="mt-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                Tu rendimiento Premium
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold mb-2">3.2x</div>
                  <div className="text-yellow-100">Más visualizaciones</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">85%</div>
                  <div className="text-yellow-100">Más contactos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">TOP 5%</div>
                  <div className="text-yellow-100">
                    Ranking de profesionales
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-gradient-to-br bg-white">
          <div className="max-w-6xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-4 shadow-lg">
                <Crown className="w-5 h-5" />
                HAZTE PREMIUM
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Destaca entre miles de profesionales
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Únete a los profesionales más exitosos y multiplica tus
                oportunidades de negocio con nuestros beneficios premium.
              </p>
            </div>

            {/* Beneficios */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Prioridad en búsquedas
                </h3>
                <p className="text-gray-600 mb-6">
                  Tus servicios aparecen primero en todos los resultados de
                  búsqueda, aumentando tu visibilidad hasta 3x más.
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  <ArrowRight className="w-5 h-5" />
                  <span>Más clientes potenciales</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Perfiles destacados
                </h3>
                <p className="text-gray-600 mb-6">
                  Aparece en la sección de perfiles destacados, donde los
                  clientes buscan a los mejores profesionales.
                </p>
                <div className="flex items-center gap-2 text-purple-600 font-semibold">
                  <ArrowRight className="w-5 h-5" />
                  <span>Mayor credibilidad</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Detalles exclusivos
                </h3>
                <p className="text-gray-600 mb-6">
                  Tu perfil muestra insignias premium y detalles exclusivos que
                  te distinguen de la competencia.
                </p>
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <ArrowRight className="w-5 h-5" />
                  <span>Diferenciación premium</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-2xl p-8 shadow-2xl">
                <h3 className="text-3xl font-bold text-white mb-4">
                  ¿Listo para ser Premium?
                </h3>
                <p className="text-yellow-100 text-lg mb-8 max-w-2xl mx-auto">
                  Únete a más de 10,000 profesionales que ya están multiplicando
                  sus ingresos con Premium.
                </p>
                <button
                  onClick={() => router.push("/profile")}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-yellow-600 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group cursor-pointer"
                >
                  <Crown className="w-6 h-6 group-hover:animate-bounce" />
                  <span>Suscribirse a Premium</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <p className="text-yellow-100 text-sm mt-4">
                  Cancela cuando quieras • Sin compromisos
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PremiumSection;
