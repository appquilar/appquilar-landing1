import StatCard from "@/components/stat-card";
import ChartPreview from "@/components/chart-preview";
import ProductCard from "@/components/product-card";
import RentalCard from "@/components/rental-card";
import { BarChart3, Calendar, CreditCard, Package2, List, LayoutDashboard } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard para empresas</h2>
          <p className="mt-3 text-lg text-gray-600">Gestiona tu inventario y visualiza estadísticas de manera sencilla</p>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar minimalista */}
            <div className="md:w-56 bg-gray-50 p-4 border-b md:border-b-0 md:border-r border-gray-200">
              <div className="flex items-center mb-6 px-2">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h8.25c1.035 0 1.875-.84 1.875-1.875V15z" />
                  </svg>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900">RentaEventos</span>
              </div>
              
              <nav className="space-y-1 text-sm">
                <div className="flex items-center px-2 py-1.5 font-medium rounded-md bg-primary text-white">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </div>
                <div className="flex items-center px-2 py-1.5 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                  <Package2 className="mr-2 h-4 w-4" />
                  Productos
                </div>
                <div className="flex items-center px-2 py-1.5 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                  <List className="mr-2 h-4 w-4" />
                  Alquileres
                </div>
                <div className="flex items-center px-2 py-1.5 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                  <Calendar className="mr-2 h-4 w-4" />
                  Calendario
                </div>
              </nav>
            </div>

            {/* Contenido principal */}
            <div className="flex-1 p-5">
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
                      name="Sillas plegables (x50)"
                      customer="Event Master"
                      date="15/07/2023"
                      days={3}
                      status="active"
                    />
                    <RentalCard
                      name="Mesa rectangular 2m (x10)"
                      customer="Bodas Luxury"
                      date="12/07/2023"
                      days={2}
                      status="active"
                    />
                    <RentalCard
                      name="Sistema de sonido 500W"
                      customer="Miguel Torres"
                      date="10/07/2023"
                      days={1}
                      status="completed"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Productos más populares</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ProductCard
                      name="Sillas plegables blancas"
                      views={1240}
                      rentals={78}
                      rank={1}
                    />
                    <ProductCard
                      name="Mesa rectangular 2m"
                      views={980}
                      rentals={56}
                      rank={2}
                    />
                    <ProductCard
                      name="Carpas 5x5m"
                      views={860}
                      rentals={42}
                      rank={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
