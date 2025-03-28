import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [activeControl, setActiveControl] = useState(0);
  
  // Alternar imagen cada 5 segundos
  useState(() => {
    const timer = setInterval(() => {
      setActiveControl((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  });

  return (
    <section id="hero-section" className="relative bg-gradient-to-r from-primary to-primary-800 overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0">
        <svg className="absolute right-0 bottom-0 transform translate-x-1/3 opacity-10" width="800" height="800" fill="none" viewBox="0 0 800 800">
          <circle cx="400" cy="400" r="400" fill="white"></circle>
        </svg>
        <svg className="absolute left-0 top-0 transform -translate-x-1/3 opacity-10" width="800" height="800" fill="none" viewBox="0 0 800 800">
          <circle cx="400" cy="400" r="400" fill="white"></circle>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
        <div className="md:flex md:items-center md:space-x-10">
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-6">
              <svg className="h-10 w-auto text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h8.25c1.035 0 1.875-.84 1.875-1.875V15z" />
                <path d="M8.25 19.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v4.5zM18.75 4.5c-.997 0-1.875.678-2.125 1.621a.75.75 0 0 1-1.46-.042C14.891 4.756 13.958 3.75 12.75 3.75h-1.5a.75.75 0 0 0 0 1.5H12c.69 0 1.25.56 1.25 1.25v4.687a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V7.5a.75.75 0 0 0-1.5 0v3.687A2.25 2.25 0 0 0 11 13.422v10.328a.75.75 0 0 0 1.5 0V13.422a2.25 2.25 0 0 0 2.25-2.235V7.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 0 1.5 0V6.375c0-1.036-.84-1.875-1.875-1.875h-1.5z" />
              </svg>
              <span className="ml-2 text-2xl font-bold text-white">RentaEventos</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Alquila lo que necesitas para tu evento
            </h1>
            <p className="mt-6 text-xl text-white text-opacity-90 leading-relaxed">
              Conectamos proveedores de equipamiento con clientes que buscan simplicidad en sus eventos.
            </p>
            <div className="mt-10 space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-primary font-semibold w-full sm:w-auto flex items-center justify-center"
                onClick={() => window.dispatchEvent(new CustomEvent('open-user-modal'))}
              >
                Para clientes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="default" 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 font-semibold border-none w-full sm:w-auto flex items-center justify-center"
                onClick={() => window.dispatchEvent(new CustomEvent('open-company-modal'))}
              >
                Para empresas
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform md:translate-y-4 transition-all duration-500">
              <div className="relative h-72 md:h-80">
                <img 
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Evento corporativo con mesas y sillas elegantes" 
                  className={`absolute inset-0 w-full h-full object-cover transform transition-opacity duration-1000 ${activeControl === 0 ? 'opacity-100' : 'opacity-0'}`}
                />
                <img 
                  src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Evento social al aire libre" 
                  className={`absolute inset-0 w-full h-full object-cover transform transition-opacity duration-1000 ${activeControl === 1 ? 'opacity-100' : 'opacity-0'}`}
                />
                <img 
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Equipamiento para evento" 
                  className={`absolute inset-0 w-full h-full object-cover transform transition-opacity duration-1000 ${activeControl === 2 ? 'opacity-100' : 'opacity-0'}`}
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        activeControl === index ? 'bg-white' : 'bg-white/40'
                      }`}
                      onClick={() => setActiveControl(index)}
                    />
                  ))}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="flex items-center gap-1.5">
                    Nuevo
                  </Badge>
                  <Badge variant="outline" className="text-primary bg-primary/10 flex items-center gap-1.5 border-primary/20">
                    Verificado
                  </Badge>
                </div>
                <h3 className="mt-4 text-xl font-bold">Equipamiento para todo tipo de eventos</h3>
                <p className="mt-2 text-gray-600">
                  Encuentra lo necesario para tu evento: mesas, sillas, carpas, sonido, iluminación y más.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center animate-bounce">
        <span className="text-sm mb-2">Descubre más</span>
        <a href="#caracteristicas" className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20">
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
}
