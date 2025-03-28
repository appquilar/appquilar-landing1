import StatCard from "@/components/stat-card";
import ChartPreview from "@/components/chart-preview";
import ProductCard from "@/components/product-card";
import RentalCard from "@/components/rental-card";
import { BarChart3, Activity, LineChart } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">Dashboard para empresas</h2>
          <p className="mt-4 text-xl text-gray-600">Controla tu negocio de alquiler con nuestro panel intuitivo y completo.</p>
        </div>

        <div className="mt-16 lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-5 mb-10 lg:mb-0">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Gestión integral de tu inventario</h3>
            
            <div className="space-y-5">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary text-white">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Estadísticas en tiempo real</h4>
                  <p className="mt-2 text-gray-600">Visualiza el rendimiento de tus productos con métricas detalladas de alquileres y vistas.</p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary text-white">
                    <Activity className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Calendario de disponibilidad</h4>
                  <p className="mt-2 text-gray-600">Gestiona fácilmente qué productos están disponibles y cuáles están reservados.</p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary text-white">
                    <LineChart className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Gestión de pagos</h4>
                  <p className="mt-2 text-gray-600">Controla los ingresos, depósitos y pagos pendientes de todos tus alquileres.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <StatCard
                    value="156"
                    label="Total Alquileres"
                    trend="+12%"
                    trendLabel="respecto al mes pasado"
                    trendType="up"
                  />
                  <StatCard
                    value="24"
                    label="Alquileres Activos"
                    trend="+4%"
                    trendLabel="respecto a la semana pasada"
                    trendType="up"
                  />
                  <StatCard
                    value="42"
                    label="Total Productos"
                    subLabel="En tu inventario"
                    trendType="neutral"
                  />
                  <StatCard
                    value="3458"
                    label="Vistas de Productos"
                    trend="-3%"
                    trendLabel="respecto a la semana pasada"
                    trendType="down"
                  />
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Transacciones diarias de alquiler</h4>
                  <div className="h-64 bg-gray-50 rounded-lg p-4">
                    <ChartPreview type="alquileres" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Vista de estadísticas de productos</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 h-64 mb-6">
                <ChartPreview type="vistas" />
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Productos Populares</h4>
                  <div className="space-y-4">
                    <ProductCard
                      name="Taladro Percutor 20V"
                      views={421}
                      rentals={34}
                      rank={1}
                    />
                    <ProductCard
                      name="Sierra de Mesa con Soporte"
                      views={386}
                      rentals={29}
                      rank={2}
                    />
                    <ProductCard
                      name="Flotador para Hormigón"
                      views={312}
                      rentals={18}
                      rank={3}
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Alquileres Recientes</h4>
                  <div className="space-y-4">
                    <RentalCard
                      name="Taladro Percutor 20V"
                      customer="Juan Pérez"
                      date="2023-07-15"
                      days={3}
                      status="active"
                    />
                    <RentalCard
                      name="Sierra de Mesa con Soporte"
                      customer="Sara Martínez"
                      date="2023-07-12"
                      days={7}
                      status="active"
                    />
                    <RentalCard
                      name="Set de Herramientas de Jardinería"
                      customer="Miguel Rodríguez"
                      date="2023-07-10"
                      days={2}
                      status="completed"
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
