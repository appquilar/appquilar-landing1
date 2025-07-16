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

  // Lista de diferentes tipos de eventos/situaciones
  const eventTypes = [
    "para tu evento",
    "para tus vacaciones en la playa", 
    "para tu acampada",
    "para tu trabajo",
    "para tu bricolaje"
  ];

  const [currentEventIndex, setCurrentEventIndex] = useState(0);

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

  // Efecto para la animación de cambio de tipo de evento
  useEffect(() => {
    // Esperar a que el título sea visible antes de comenzar la animación
    if (!isVisible.title) return;

    // Comenzar la animación después de 3 segundos
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentEventIndex(prev => (prev + 1) % eventTypes.length);
      }, 3000); // Cambiar cada 3 segundos

      return () => clearInterval(interval);
    }, 3000);

    return () => clearTimeout(startTimer);
  }, [isVisible.title, eventTypes.length]);

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
            <img 
              src="@assets/appquilar-transparente-blanco-pelota_1752660709824.png" 
              alt="Appquilar" 
              className="h-12 w-auto"
            />
            <img 
              src="@assets/appquilar-blanco-transparente_1752660709824.png" 
              alt="Appquilar" 
              className="ml-3 h-8 w-auto"
            />
          </div>
          
          {/* Título principal con animación */}
          <h1 
            className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl mx-auto transition-all duration-700 delay-100 transform ${
              isVisible.title ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            Alquila lo que necesitas{' '}
            <span 
              key={currentEventIndex}
              className="inline-block transition-all duration-1000 ease-in-out text-white"
              style={{
                animation: 'titleFadeInOut 3s ease-in-out infinite',
              }}
            >
              {eventTypes[currentEventIndex]}
            </span>
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
            className={`mt-12 flex justify-center transition-all duration-700 delay-300 transform ${
              isVisible.buttons ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            <Button 
              variant="default" 
              size="lg" 
              className="bg-primary hover:bg-primary/90 font-semibold border-none flex items-center justify-center px-8 h-14 text-lg text-white"
              onClick={() => window.dispatchEvent(new CustomEvent('open-company-modal'))}
            >
              Me interesa
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          {/* Indicador de desplazamiento */}
          <div 
            className={`mt-24 text-white flex flex-col items-center transition-all duration-700 delay-500 ${
              isVisible.scroll ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="text-sm mb-2 text-black font-medium">Descubre más</span>
            <a href="#caracteristicas" className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 animate-bounce">
              <ChevronDown className="h-6 w-6 text-black" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
