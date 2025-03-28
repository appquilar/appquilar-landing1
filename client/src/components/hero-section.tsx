import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-primary to-primary-800 overflow-hidden">
      <div className="absolute inset-0">
        <svg className="absolute right-0 bottom-0 transform translate-x-1/2 opacity-20" width="800" height="800" fill="none" viewBox="0 0 800 800">
          <circle cx="400" cy="400" r="400" fill="white"></circle>
        </svg>
        <svg className="absolute left-0 top-0 transform -translate-x-1/2 opacity-20" width="800" height="800" fill="none" viewBox="0 0 800 800">
          <circle cx="400" cy="400" r="400" fill="white"></circle>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 relative">
        <div className="md:flex md:items-center md:space-x-10">
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Alquila todo lo que necesitas para tu evento
            </h1>
            <p className="mt-4 text-xl text-white text-opacity-90">
              La plataforma que conecta proveedores de equipamiento para eventos con clientes que necesitan alquilar sin complicaciones.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#registro-usuarios">
                <Button variant="secondary" size="lg" className="text-primary font-semibold">
                  Registrarse como Cliente
                </Button>
              </a>
              <a href="#registro-empresas">
                <Button variant="default" size="lg" className="bg-amber-500 hover:bg-amber-600 font-semibold border-none">
                  Registrarse como Empresa
                </Button>
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Evento corporativo con mesas y sillas elegantes" 
                className="w-full h-80 object-cover" 
              />
              <div className="p-6">
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
                    </svg>
                    Nuevo
                  </Badge>
                  <Badge variant="outline" className="text-primary bg-primary/10 flex items-center gap-1.5 border-primary/20">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Verificado
                  </Badge>
                </div>
                <h3 className="mt-4 text-xl font-bold">Equipamiento para eventos corporativos</h3>
                <p className="mt-2 text-gray-600">
                  Encuentra todo el material necesario para tu evento, desde mesas y sillas hasta sistemas de sonido e iluminación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
