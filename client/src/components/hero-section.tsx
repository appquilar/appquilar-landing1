import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState({
    logo: false,
    title: false,
    subtitle: false,
    buttons: false,
    scroll: false
  });

  useEffect(() => {
    // Animación secuencial con tiempos diferentes para cada elemento
    const timers = [
      setTimeout(() => setIsVisible(prev => ({ ...prev, logo: true })), 300),
      setTimeout(() => setIsVisible(prev => ({ ...prev, title: true })), 800),
      setTimeout(() => setIsVisible(prev => ({ ...prev, subtitle: true })), 1400),
      setTimeout(() => setIsVisible(prev => ({ ...prev, buttons: true })), 2000),
      setTimeout(() => setIsVisible(prev => ({ ...prev, scroll: true })), 2600)
    ];

    // Limpiar los timers cuando el componente se desmonte
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <section id="hero-section" className="relative bg-gradient-to-b from-primary to-primary-800 overflow-hidden min-h-screen flex items-center">
      {/* Fondo decorativo */}
      <div className="absolute inset-0">
        <svg className="absolute right-0 bottom-0 transform translate-x-1/3 opacity-10" width="800" height="800" fill="none" viewBox="0 0 800 800">
          <circle cx="400" cy="400" r="400" fill="white"></circle>
        </svg>
        <svg className="absolute left-0 top-0 transform -translate-x-1/3 opacity-10" width="800" height="800" fill="none" viewBox="0 0 800 800">
          <circle cx="400" cy="400" r="400" fill="white"></circle>
        </svg>
      </div>

      {/* Contenido principal */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
        <div className="text-center">
          {/* Logo y nombre */}
          <div 
            className={`flex items-center justify-center mb-8 transition-all duration-700 transform ${
              isVisible.logo ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            <svg className="h-12 w-auto text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h8.25c1.035 0 1.875-.84 1.875-1.875V15z" />
              <path d="M8.25 19.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v4.5zM18.75 4.5c-.997 0-1.875.678-2.125 1.621a.75.75 0 0 1-1.46-.042C14.891 4.756 13.958 3.75 12.75 3.75h-1.5a.75.75 0 0 0 0 1.5H12c.69 0 1.25.56 1.25 1.25v4.687a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V7.5a.75.75 0 0 0-1.5 0v3.687A2.25 2.25 0 0 0 11 13.422v10.328a.75.75 0 0 0 1.5 0V13.422a2.25 2.25 0 0 0 2.25-2.235V7.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 0 1.5 0V6.375c0-1.036-.84-1.875-1.875-1.875h-1.5z" />
            </svg>
            <span className="ml-3 text-3xl font-bold text-white">RentaEventos</span>
          </div>
          
          {/* Título principal */}
          <h1 
            className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl mx-auto transition-all duration-700 delay-100 transform ${
              isVisible.title ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            Alquila lo que necesitas para tu evento
          </h1>
          
          {/* Subtítulo */}
          <p 
            className={`mt-8 text-xl md:text-2xl text-white text-opacity-90 leading-relaxed max-w-3xl mx-auto transition-all duration-700 delay-200 transform ${
              isVisible.subtitle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            Conectamos proveedores de equipamiento con clientes que buscan simplicidad en sus eventos.
          </p>
          
          {/* Botones CTA */}
          <div 
            className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 transform ${
              isVisible.buttons ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            <Button 
              variant="secondary" 
              size="lg" 
              className="text-primary font-semibold w-full sm:w-auto flex items-center justify-center px-8 h-14 text-lg"
              onClick={() => window.dispatchEvent(new CustomEvent('open-user-modal'))}
            >
              Para clientes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="default" 
              size="lg" 
              className="bg-amber-500 hover:bg-amber-600 font-semibold border-none w-full sm:w-auto flex items-center justify-center px-8 h-14 text-lg"
              onClick={() => window.dispatchEvent(new CustomEvent('open-company-modal'))}
            >
              Para empresas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          {/* Indicador de desplazamiento */}
          <div 
            className={`mt-24 text-white flex flex-col items-center transition-all duration-700 delay-500 ${
              isVisible.scroll ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="text-sm mb-2">Descubre más</span>
            <a href="#caracteristicas" className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 animate-bounce">
              <ChevronDown className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
