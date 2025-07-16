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
                <svg className="h-8 w-auto" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#f97316"/>
                  <text x="16" y="22" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="white">A</text>
                </svg>
                <span className="ml-2 text-xl font-bold">
                  <span className="text-gray-900">App</span><span className="text-[#f97316]">quilar</span>
                </span>
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
