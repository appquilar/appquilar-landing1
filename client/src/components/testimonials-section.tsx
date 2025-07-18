import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Méndez",
    role: "Organizador de eventos",
    content: "La plataforma ha simplificado nuestra búsqueda de equipamiento. Antes perdíamos días buscando proveedores, ahora encontramos todo en minutos.",
    rating: 5
  },
  {
    name: "Elena Rodríguez",
    role: "Propietaria de Decoraciones EventPro",
    content: "Desde que registré mi empresa, mis alquileres han aumentado un 40%. El dashboard es increíblemente útil para gestionar mi inventario.",
    rating: 5
  },
  {
    name: "Miguel Torres",
    role: "Coordinador de bodas",
    content: "La variedad de equipamiento disponible es impresionante. He podido encontrar desde iluminación especializada hasta mesas decorativas únicas.",
    rating: 4
  },
  {
    name: "Miguel Torres",
    role: "Coordinador de bodas",
    content: "La variedad de equipamiento disponible es impresionante. He podido encontrar desde iluminación especializada hasta mesas decorativas únicas.",
    rating: 4
  },
  {
    name: "Miguel Torres",
    role: "Coordinador de bodas",
    content: "La variedad de equipamiento disponible es impresionante. He podido encontrar desde iluminación especializada hasta mesas decorativas únicas.",
    rating: 4
  },
  {
    name: "Miguel Torres",
    role: "Coordinador de bodas",
    content: "La variedad de equipamiento disponible es impresionante. He podido encontrar desde iluminación especializada hasta mesas decorativas únicas.",
    rating: 4
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
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
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
