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
                <svg className="h-8 w-auto text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h8.25c1.035 0 1.875-.84 1.875-1.875V15z" />
                  <path d="M8.25 19.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v4.5zM18.75 4.5c-.997 0-1.875.678-2.125 1.621a.75.75 0 0 1-1.46-.042C14.891 4.756 13.958 3.75 12.75 3.75h-1.5a.75.75 0 0 0 0 1.5H12c.69 0 1.25.56 1.25 1.25v4.687a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V7.5a.75.75 0 0 0-1.5 0v3.687A2.25 2.25 0 0 0 11 13.422v10.328a.75.75 0 0 0 1.5 0V13.422a2.25 2.25 0 0 0 2.25-2.235V7.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 0 1.5 0V6.375c0-1.036-.84-1.875-1.875-1.875h-1.5z" />
                </svg>
                <span className="ml-2 text-xl font-bold text-primary">RentaEventos</span>
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
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2"
              onClick={() => window.dispatchEvent(new CustomEvent('open-user-modal'))}
            >
              Regístrate
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => window.dispatchEvent(new CustomEvent('open-company-modal'))}
            >
              Para empresas
            </Button>
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
          <button
            className="text-primary border border-primary block px-3 py-2 text-base font-medium rounded-md mx-3 mt-2 w-[calc(100%-1.5rem)]"
            onClick={() => {
              setMobileMenuOpen(false);
              window.dispatchEvent(new CustomEvent('open-user-modal'));
            }}
          >
            Regístrate
          </button>
          <button
            className="bg-primary text-white block px-3 py-2 text-base font-medium rounded-md mx-3 mt-2 w-[calc(100%-1.5rem)]"
            onClick={() => {
              setMobileMenuOpen(false);
              window.dispatchEvent(new CustomEvent('open-company-modal'));
            }}
          >
            Para empresas
          </button>
        </div>
      )}
    </nav>
  );
}
