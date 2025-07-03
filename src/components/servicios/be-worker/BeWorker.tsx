import { ArrowRight, Briefcase, Clock, TrendingUp, Users } from "lucide-react";
import { useRouter } from "next/navigation";

const BeWorker = () => {
    const router = useRouter()
    return ( <section className="py-16 mb-6 -mt-8 bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full font-bold text-sm mb-4 shadow-lg">
            <Briefcase className="w-5 h-5" />
            CONVIÉRTETE EN TRABAJADOR
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">¿Listo para generar ingresos extra?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Únete a miles de profesionales que ya están monetizando sus habilidades y construyendo su futuro con
            nosotros.
          </p>
        </div>

        {/* Beneficios */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ingresos flexibles</h3>
            <p className="text-gray-600 mb-6">
              Genera ingresos extra trabajando en tus tiempos libres. Tú decides cuándo y cuánto trabajar.
            </p>
            <div className="flex items-center gap-2 text-green-600 font-semibold">
              <ArrowRight className="w-5 h-5" />
              <span>Hasta $50,000/mes</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Horarios flexibles</h3>
            <p className="text-gray-600 mb-6">
              Trabaja cuando quieras, donde quieras. Perfecto para estudiantes, padres o como trabajo secundario.
            </p>
            <div className="flex items-center gap-2 text-blue-600 font-semibold">
              <ArrowRight className="w-5 h-5" />
              <span>100% flexible</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Clientes garantizados</h3>
            <p className="text-gray-600 mb-6">
              Accede a miles de clientes que buscan tus servicios. Nosotros te conectamos con las oportunidades.
            </p>
            <div className="flex items-center gap-2 text-purple-600 font-semibold">
              <ArrowRight className="w-5 h-5" />
              <span>+10,000 clientes activos</span>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 mb-12 text-white">
          <h3 className="text-2xl font-bold text-center mb-8">Lo que logran nuestros trabajadores</h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">$35K</div>
              <div className="text-gray-300">Ingreso promedio mensual</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">4.8★</div>
              <div className="text-gray-300">Calificación promedio</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">15hrs</div>
              <div className="text-gray-300">Horas semanales promedio</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">92%</div>
              <div className="text-gray-300">Satisfacción laboral</div>
            </div>
          </div>
        </div>

        {/* Proceso simple */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Es súper fácil empezar</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl shadow-lg">
                1
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Crea tu perfil</h4>
              <p className="text-gray-600">Completa tu información y describe tus habilidades en 5 minutos.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl shadow-lg">
                2
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Recibe solicitudes</h4>
              <p className="text-gray-600">Los clientes te contactarán directamente para solicitar tus servicios.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl shadow-lg">
                3
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Cobra y crece</h4>
              <p className="text-gray-600">Completa trabajos, acuerda con el cliente y construye tu reputación.</p>
            </div>
          </div>
        </div>

        {/* CTA Principal */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-sky-500 via-sky-700 to-blue-600 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">¡Tu oportunidad te está esperando!</h3>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              Miles de clientes buscan profesionales como tú. No dejes pasar esta oportunidad de generar ingresos extra.
            </p>
            <button

              onClick={() => router.push("/profile")}
              className="cursor-pointer inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
            >
              <Briefcase className="w-6 h-6 group-hover:animate-bounce" />
              <span>Empezar a prestar tus servicios</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <p className="text-green-100 text-sm mt-4">Gratis para empezar • Sin costos ocultos • Soporte 24/7</p>
          </div>
        </div>
      </div>
    </section>)
}

export default BeWorker;