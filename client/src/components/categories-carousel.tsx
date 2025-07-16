import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "Cosas para la playa",
    icon: "🏖️",
    description: "Sombrillas, sillas de playa, neveras portátiles"
  },
  {
    name: "Cosas para el camping",
    icon: "🏕️",
    description: "Tiendas de campaña, sacos de dormir, hornillos"
  },
  {
    name: "Herramientas",
    icon: "🔧",
    description: "Taladros, sierras, equipamiento profesional"
  },
  {
    name: "Sillas y mesas",
    icon: "🪑",
    description: "Mobiliario para eventos y celebraciones"
  },
  {
    name: "Decoración para eventos",
    icon: "🎉",
    description: "Centros de mesa, iluminación, elementos decorativos"
  },
  {
    name: "Bicicletas",
    icon: "🚴",
    description: "Bicicletas de montaña, urbanas, eléctricas"
  },
  {
    name: "Consolas",
    icon: "🎮",
    description: "PlayStation, Xbox, Nintendo, accesorios gaming"
  }
];

export default function CategoriesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  // Resume auto-play after 10 seconds of inactivity
  useEffect(() => {
    if (!isAutoPlaying) {
      const timeout = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [isAutoPlaying, currentIndex]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Categorías disponibles
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre la amplia variedad de productos que puedes alquilar a través de nuestra plataforma
          </p>
        </div>

        <div className="relative">
          {/* Carousel container */}
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {categories.map((category, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-white rounded-xl shadow-lg p-8 mx-4 text-center min-h-[280px] flex flex-col justify-center">
                    <div className="text-6xl mb-6">{category.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-gray-200"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-gray-200"
            onClick={goToNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {categories.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Categories grid for larger screens */}
        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-16">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => goToSlide(index)}
            >
              <div className="text-3xl mb-3">{category.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-2">{category.name}</h4>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}