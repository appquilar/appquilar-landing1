/**
 * Dashboard-Preview.tsx
 * Componente principal que muestra el dashboard con navegación entre diferentes vistas
 * 
 * Este componente funciona como una presentación interactiva del dashboard para empresas,
 * permitiendo navegar entre diferentes secciones (Dashboard principal, Productos, Alquileres, Calendario)
 * Incluye animaciones de entrada para una experiencia de usuario mejorada
 */

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardWelcome from "@/components/dashboard-welcome";
import StatCard from "@/components/stat-card";
import ChartPreview from "@/components/chart-preview";
import ProductCard from "@/components/product-card";
import RentalCard from "@/components/rental-card";
import DashboardProductos from "@/components/dashboard-productos";
import DashboardAlquileres from "@/components/dashboard-alquileres";
import DashboardCalendario from "@/components/dashboard-calendario";
import DashboardChat from "@/components/dashboard-chat";
import { BarChart3, Calendar, CreditCard, Package2, List, LayoutDashboard, UserCircle, MessageCircle } from "lucide-react";

/**
 * Tipos de vistas disponibles en el dashboard
 */
type DashboardView = "main" | "productos" | "alquileres" | "calendario" | "chat";

export default function DashboardPreview() {
  // Estados para controlar la vista y la animación de bienvenida
  const [currentView, setCurrentView] = useState<DashboardView>("main");
  const [showWelcome, setShowWelcome] = useState(true);
  const [userName, setUserName] = useState("Mi Empresa");
  const [demoMode, setDemoMode] = useState(false);
  
  // Efecto para simular la carga del nombre de usuario desde el backend
  useEffect(() => {
    // Aquí podrías hacer una petición al backend para obtener el nombre real
    // Por ahora usamos un timeout para simular la carga
    const timer = setTimeout(() => {
      setUserName("RentaEventos Pro");
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  /**
   * Efecto para simular la selección de días en el calendario
   * 
   * Este efecto se activa solo cuando se muestra la vista del calendario
   * y crea una animación visual para seleccionar diferentes días con eventos
   */
  useEffect(() => {
    if (currentView === "calendario" && !showWelcome) {
      // Lista de fechas de ejemplo para simular selección
      const fechasDemo = [
        new Date(2025, 2, 15), // 15 de marzo
        new Date(2025, 2, 10), // 10 de marzo
        new Date(2025, 2, 25), // 25 de marzo
      ];
      
      let currentIndex = 0;
      
      // Simula la selección de un día diferente cada segundo
      const selectDaysInterval = setInterval(() => {
        // Avanzar al siguiente día en la lista de demo
        currentIndex = (currentIndex + 1) % fechasDemo.length;
        
        // Seleccionar visualmente el día (como un clic)
        const selectedDate = fechasDemo[currentIndex];
        
        // Intentar seleccionar el día en el DOM usando atributos de data o clases
        // Esto es solo visual y no afecta al estado real
        const dayElements = document.querySelectorAll(".rdp-day");
        dayElements.forEach(element => {
          // Verificamos si ya tiene selección visual
          if (element.classList.contains("bg-accent")) {
            // Quitar selección visual
            element.classList.remove("bg-accent");
            element.classList.remove("text-accent-foreground");
          }
          
          // Revisar si este elemento corresponde a nuestro día objetivo
          const dateAttr = element.getAttribute("aria-label");
          if (dateAttr && dateAttr.includes(selectedDate.getDate().toString())) {
            // Aplicar estilos de selección
            element.classList.add("bg-accent");
            element.classList.add("text-accent-foreground");
          }
        });
      }, 1000); // Cambiar selección cada segundo
      
      // Limpiar el intervalo cuando el componente se desmonta o cambia la vista
      return () => clearInterval(selectDaysInterval);
    }
  }, [currentView, showWelcome]);
  
  /**
   * Efecto para animar automáticamente entre pestañas del dashboard
   * 
   * - Inicia automáticamente después de que la animación de bienvenida termina
   * - Rota entre todas las pestañas en una secuencia predefinida
   * - Utiliza un tiempo reducido para mantener el interés visual
   * - Limpia el intervalo al desmontar el componente
   */
  useEffect(() => {
    if (!showWelcome && !demoMode) {
      setDemoMode(true);
    }
    
    if (demoMode) {
      // Secuencia de vistas a mostrar en el demo automático
      const viewSequence: DashboardView[] = ["main", "productos", "alquileres", "calendario", "chat"];
      let currentIndex = viewSequence.indexOf(currentView);
      
      // Establecer intervalo más corto (3.5 segundos) para mantener el ritmo visual
      const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % viewSequence.length;
        setCurrentView(viewSequence[currentIndex]);
      }, 3500); 
      
      // Limpieza al desmontar el componente
      return () => clearInterval(interval);
    }
  }, [showWelcome, demoMode, currentView]);
  
  // Función para manejar la finalización de la animación de bienvenida
  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };
  
  // No hacemos nada especial aquí ya que importamos directamente el componente arriba
  
  // Función para renderizar la vista activa
  const renderActiveView = () => {
    switch (currentView) {
      case "productos":
        return <DashboardProductos />;
      case "alquileres":
        return <DashboardAlquileres />;
      case "calendario":
        return <DashboardCalendario />;
      case "chat":
        return <DashboardChat />;
      default:
        return (
          <div className="p-5">
            {/* Estadísticas generales - Tarjetas principales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                value="156"
                label="Total Alquileres"
                trend="+12%"
                trendLabel="vs. mes pasado"
                trendType="up"
              />
              <StatCard
                value="42"
                label="Productos"
                subLabel="En inventario"
                trendType="neutral"
              />
              <StatCard
                value="85%"
                label="Ocupación"
                trend="+5%"
                trendLabel="vs. mes pasado"
                trendType="up"
              />
              <StatCard
                value="3458"
                label="Vistas"
                trend="+24%"
                trendLabel="vs. mes pasado"
                trendType="up"
              />
            </div>

            {/* Gráficos y transacciones */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-sm font-medium text-gray-700">Estadísticas diarias</h3>
                  </div>
                </div>
                <div className="h-52">
                  <ChartPreview type="vistas" />
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-sm font-medium text-gray-700">Transacciones recientes</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  <RentalCard
                    name="Sillas Plegables Blancas (paquete 50)"
                    customer="Eventos Elegantes"
                    date="15/03/2025"
                    days={3}
                    status="active"
                  />
                  <RentalCard
                    name="Mesas Redondas 180cm (paquete 10)"
                    customer="Bodas Luxury"
                    date="12/03/2025"
                    days={2}
                    status="active"
                  />
                  <RentalCard
                    name="Sistema de Sonido Profesional 1000W"
                    customer="Fiestas Premium"
                    date="10/03/2025"
                    days={1}
                    status="completed"
                  />
                </div>
              </div>
            </div>

            {/* Productos populares */}
            <div className="mt-5">
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Productos más populares</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ProductCard
                    name="Sillas Plegables Blancas (paquete 50)"
                    views={1240}
                    rentals={78}
                    rank={1}
                  />
                  <ProductCard
                    name="Mesas Redondas 180cm (paquete 10)"
                    views={980}
                    rentals={56}
                    rank={2}
                  />
                  <ProductCard
                    name="Carpa 5x10m con Paredes Laterales"
                    views={860}
                    rentals={42}
                    rank={3}
                  />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="dashboard" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard para empresas</h2>
          <p className="mt-3 text-lg text-gray-600">Gestiona tu inventario y visualiza estadísticas de manera sencilla</p>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar de navegación */}
            <div className="md:w-56 bg-gray-50 p-4 border-b md:border-b-0 md:border-r border-gray-200">
              <nav className="space-y-1 text-sm">
                {/* Enlaces de navegación (ahora solo visuales, sin interactividad) */}
                <div
                  className={`flex items-center px-2 py-1.5 font-medium rounded-md w-full text-left
                    ${currentView === "main" ? "bg-primary text-white" : "text-gray-600"}`}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </div>
                <div
                  className={`flex items-center px-2 py-1.5 font-medium rounded-md w-full text-left
                    ${currentView === "productos" ? "bg-primary text-white" : "text-gray-600"}`}
                >
                  <Package2 className="mr-2 h-4 w-4" />
                  Productos
                </div>
                <div
                  className={`flex items-center px-2 py-1.5 font-medium rounded-md w-full text-left
                    ${currentView === "alquileres" ? "bg-primary text-white" : "text-gray-600"}`}
                >
                  <List className="mr-2 h-4 w-4" />
                  Reservas
                </div>
                <div
                  className={`flex items-center px-2 py-1.5 font-medium rounded-md w-full text-left
                    ${currentView === "calendario" ? "bg-primary text-white" : "text-gray-600"}`}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Calendario
                </div>
                <div
                  className={`flex items-center px-2 py-1.5 font-medium rounded-md w-full text-left
                    ${currentView === "chat" ? "bg-primary text-white" : "text-gray-600"}`}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat
                </div>
              </nav>
            </div>

            {/* Contenido principal dinámico */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {showWelcome ? (
                  <motion.div
                    key="welcome"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    <DashboardWelcome
                      userName={userName}
                      onComplete={handleWelcomeComplete}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key={`dashboard-${currentView}`} // Cambiamos la key para forzar la animación en cada cambio de vista
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full dashboard-no-click"
                  >
                    {renderActiveView()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
