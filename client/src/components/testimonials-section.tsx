import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Méndez",
    role: "Organizador de eventos",
    content: "La plataforma ha simplificado nuestra búsqueda de equipamiento. Antes perdíamos días buscando proveedores, ahora encontramos todo en minutos.",
    rating: 5,
    profile_url: "https://randomuser.me/api/portraits/men/20.jpg",
  },
  {
    name: "Elena Rodríguez",
    role: "Propietaria de tienda de decoraciones",
    content: "Desde que registré mi empresa, mis alquileres han aumentado un 40%. El dashboard es increíblemente útil para gestionar mi inventario.",
    rating: 5,
    profile_url: "https://randomuser.me/api/portraits/women/74.jpg",
  },
  {
    name: "Miguel Torres",
    role: "Wedding Planer",
    content: "La variedad de equipamiento disponible es impresionante. He podido encontrar desde iluminación especializada hasta mesas decorativas únicas.",
    rating: 4,
    profile_url: "https://randomuser.me/api/portraits/men/35.jpg",
  },
  {
    name: "Laura Martínez",
    role: "Organizadora de eventos",
    content: "Gracias a Appquilar he conseguido sillas y carpas para bodas en tiempo récord. La plataforma me ahorra muchas llamadas.",
    rating: 4,
    profile_url: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Javier Rodríguez",
    role: "Dueño de tienda de deportes",
    content: "Alquilo bicicletas de montaña durante el verano, y ahora tengo más visibilidad que nunca. Funciona genial.",
    rating: 5,
    profile_url: "https://randomuser.me/api/portraits/men/72.jpg",
  },
  {
    name: "Marta González",
    role: "Freelance de fotografía",
    content: "Uso Appquilar para alquilar focos, trípodes y hasta fondos. Es rápido, profesional y me conecta con nuevos clientes.",
    rating: 5,
    profile_url: "https://randomuser.me/api/portraits/women/84.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">La opinión de nuestros usuarios</h2>
          <p className="mt-4 text-lg text-gray-600">Descubre por qué nuestra plataforma es la preferida por clientes y empresas.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <Quote className="h-8 w-8 text-gray-200 mb-4" />
              
              <p className="text-gray-600 mb-6">{testimonial.content}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <img
                        src={testimonial.profile_url}
                        alt="Foto de perfil"
                        className="h-10 w-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">{testimonial.name}</h3>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
