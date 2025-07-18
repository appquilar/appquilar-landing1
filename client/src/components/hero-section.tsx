import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import iconLogo from "@assets/pelota-blanco.png";
import textLogo from "@assets/logo-blanco.png";

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
    "para la playa",
    "para tu acampada",
    "para tu trabajo",
    "para tu bricolaje"
  ];

  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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
      const animateNext = () => {
        setIsAnimating(true);
        
        // Después de 600ms (cuando el texto se desvanece), cambiar el contenido
        setTimeout(() => {
          setCurrentEventIndex(prev => (prev + 1) % eventTypes.length);
        }, 600);
        
        // Después de 1200ms terminar la animación y programar la siguiente
        setTimeout(() => {
          setIsAnimating(false);
          setTimeout(animateNext, 2000); // Esperar 2s antes de la siguiente animación
        }, 1200);
      };
      
      animateNext();
    }, 3000);

    return () => clearTimeout(startTimer);
  }, [isVisible.title, eventTypes.length]);

  return (
    <section id="hero-section" className="relative bg-gradient-to-b from-primary to-primary-800 overflow-hidden min-h-screen flex items-center">
      {/* Contenido principal */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
        <div className="text-center">
          {/* Logo y nombre */}
          <div
            className={`flex items-center justify-center mb-8 transition-all duration-700 transform ${
              isVisible.logo ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            <img src={iconLogo} alt="Logo icono" className="h-12 w-auto" />
            <img src={textLogo} alt="Appquilar logo" className="ml-2 mt-1 h-12 w-auto" />
          </div>

          {/* Título principal con animación */}
          <h1 
            className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl mx-auto transition-all duration-700 delay-100 transform ${
              isVisible.title ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            Alquila lo que necesitas{' '}
            <span 
              className={`inline-block transition-all duration-600 ease-in-out text-white ${
                isAnimating ? 'opacity-0 -translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
              }`}
            >
              {eventTypes[currentEventIndex]}
            </span>
          </h1>
          
          {/* Subtítulo con más espacio */}
          <p 
            className={`mt-16 text-xl md:text-2xl text-white text-opacity-90 leading-relaxed max-w-3xl mx-auto transition-all duration-700 delay-200 transform ${
              isVisible.subtitle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            Alquila lo que necesites, desde quien ya lo tiene. Fácil, seguro y sin líos.
          </p>
          
          {/* Botones CTA */}
          <div 
            className={`mt-12 flex justify-center transition-all duration-700 delay-300 transform ${
              isVisible.buttons ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            <a href="https://forms.fillout.com/t/oBy96bmpk8us" rel="noopener noreferrer">
              <Button
                variant="default"
                size="lg"
                className="bg-primary hover:bg-primary/90 font-semibold border-none flex items-center justify-center px-8 h-14 text-lg text-white"
              >
                Me interesa
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
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
