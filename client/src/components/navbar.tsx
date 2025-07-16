import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Detectar cuándo el usuario ha desplazado más allá de la primera sección
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        setScrolled(window.scrollY > heroHeight * 0.8);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!scrolled) return null;
  
  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex-shrink-0 flex items-center cursor-pointer">
                {/* Logo icono SVG */}
                <svg className="h-8 w-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M50 10 C70 10 85 25 85 45 C85 55 80 65 70 70 L70 75 C70 85 60 90 50 90 C40 90 30 85 30 75 L30 70 C20 65 15 55 15 45 C15 25 30 10 50 10 Z M50 20 C35 20 25 30 25 45 C25 50 27 55 30 60 L35 65 L35 75 C35 80 42 85 50 85 C58 85 65 80 65 75 L65 65 L70 60 C73 55 75 50 75 45 C75 30 65 20 50 20 Z" 
                    fill="#f97316" 
                    stroke="none"
                  />
                </svg>
                {/* Logo texto SVG */}
                <svg className="ml-2 h-6 w-auto" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="0" y="28" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#f97316">
                    Appquilar
                  </text>
                </svg>
              </div>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <a href="#caracteristicas" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
              Características
            </a>
            <a href="#dashboard" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
              Dashboard
            </a>
            <a href="#testimonios" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
              Testimonios
            </a>
            <a href="#contacto" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
              Contacto
            </a>

            <div className="flex justify-center w-full">
              <Button 
                variant="default" 
                size="sm"
                onClick={() => window.dispatchEvent(new CustomEvent('open-company-modal'))}
              >
                Me interesa
              </Button>
            </div>
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded="false"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white pt-2 pb-3 space-y-1">
          <a 
            href="#caracteristicas" 
            className="text-gray-600 hover:text-primary block px-3 py-2 text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Características
          </a>
          <a 
            href="#dashboard" 
            className="text-gray-600 hover:text-primary block px-3 py-2 text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </a>
          <a 
            href="#testimonios" 
            className="text-gray-600 hover:text-primary block px-3 py-2 text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Testimonios
          </a>
          <a 
            href="#contacto"
            className="text-gray-600 hover:text-primary block px-3 py-2 text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contacto
          </a>

          <div className="flex justify-center mx-3 mt-2">
            <button
              className="bg-primary text-white px-3 py-2 text-base font-medium rounded-md"
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-company-modal'));
              }}
            >
              Me interesa
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
