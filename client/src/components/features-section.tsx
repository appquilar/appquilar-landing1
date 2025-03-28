import { 
  Info, Monitor, CheckCircle, Users, Star, Truck,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Info className="w-6 h-6 text-primary" />,
      title: "Búsqueda Inteligente",
      description: "Encuentra fácilmente el equipamiento que necesitas con nuestros filtros avanzados por categoría, ubicación y fechas."
    },
    {
      icon: <Monitor className="w-6 h-6 text-emerald-600" />,
      title: "Gestión Eficiente",
      description: "Para empresas: gestiona tus productos, reservas y disponibilidad desde un panel de control intuitivo."
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-amber-500" />,
      title: "Reservas Seguras",
      description: "Proceso de reserva transparente con confirmación inmediata y sistema de pagos seguro."
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "Reseñas Verificadas",
      description: "Sistema de valoraciones para garantizar la calidad tanto de proveedores como de clientes."
    },
    {
      icon: <Star className="w-6 h-6 text-blue-600" />,
      title: "Destacar Productos",
      description: "Posiciona tus productos en los primeros resultados de búsqueda para aumentar tu visibilidad."
    },
    {
      icon: <Truck className="w-6 h-6 text-pink-600" />,
      title: "Logística Integrada",
      description: "Opciones de entrega y recogida para facilitar el transporte del equipamiento alquilado."
    }
  ];

  return (
    <section id="caracteristicas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">Tu plataforma completa de alquiler para eventos</h2>
          <p className="mt-4 text-xl text-gray-600">Todo lo que necesitas para encontrar o ofrecer equipamiento para eventos en un solo lugar.</p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
