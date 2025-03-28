import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Méndez",
    role: "Organizador de eventos",
    content: "La plataforma ha simplificado increíblemente nuestro proceso de búsqueda de equipamiento. Antes perdíamos días buscando proveedores, ahora encontramos todo en minutos.",
    rating: 5
  },
  {
    name: "Elena Rodríguez",
    role: "Propietaria de Decoraciones EventPro",
    content: "Desde que registré mi empresa en la plataforma, mis alquileres han aumentado un 40%. El dashboard es increíblemente útil para gestionar mi inventario y ver el rendimiento.",
    rating: 5
  },
  {
    name: "Miguel Torres",
    role: "Coordinador de bodas",
    content: "La variedad de equipamiento disponible es impresionante. He podido encontrar desde iluminación especializada hasta mesas decorativas únicas que mis clientes adoran.",
    rating: 4
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">Lo que dicen nuestros usuarios</h2>
          <p className="mt-4 text-xl text-gray-600">Descubre por qué nuestra plataforma es la preferida por clientes y empresas.</p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              
              <p className="text-gray-600">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
