import { 
  Search, Monitor, Calendar, MessageSquare, Shield, FileCheck
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Search className="w-5 h-5 text-primary" />,
      title: "Búsqueda Simplificada",
      description: "Encuentra lo que necesites fácilmente por categoría, ubicación y fechas."
    },
    {
      icon: <Monitor className="w-5 h-5 text-primary" />,
      title: "Panel Empresarial",
      description: "Para empresas: gestiona tus productos y disponibilidad desde un panel intuitivo."
    },
    {
      icon: <Calendar className="w-5 h-5 text-primary" />,
      title: "Reservas Directas",
      description: "Proceso de reserva sencillo con confirmación inmediata entre cliente y proveedor."
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-primary" />,
      title: "Comunicación Directa",
      description: "Contacto directo entre clientes y proveedores sin intermediarios."
    },
    {
      icon: <Shield className="w-5 h-5 text-primary" />,
      title: "Proveedores Verificados",
      description: "Todos los proveedores pasan por un proceso de verificación para garantizar calidad."
    },
    {
      icon: <FileCheck className="w-5 h-5 text-primary" />,
      title: "Contratos Claros",
      description: "Términos y condiciones transparentes para cada alquiler sin sorpresas."
    }
  ];

  return (
    <section id="caracteristicas" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Una plataforma simplificada</h2>
          <p className="mt-3 text-lg text-gray-600">Desde herramientas hasta ocio: conecta con quien tiene lo que necesitas.</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm hover:shadow transition-shadow">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-3">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
