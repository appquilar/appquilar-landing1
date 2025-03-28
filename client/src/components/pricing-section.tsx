/**
 * pricing-section.tsx
 * Componente que muestra los diferentes paquetes de suscripción para empresas
 */

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function PricingSection() {
  return (
    <section id="precios" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mx-auto max-w-2xl mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Planes flexibles para tu negocio</h2>
          <p className="mt-4 text-lg text-gray-600">
            Elige el plan que mejor se adapte a tus necesidades de alquiler de productos para eventos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:gap-8">
          {/* Plan Básico */}
          <Card className="flex flex-col border-2 border-gray-200 rounded-lg shadow-sm transition-all hover:shadow-md">
            <CardHeader className="px-6 pt-6 pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900">Básico</CardTitle>
              <CardDescription className="text-gray-500">Para pequeños negocios que empiezan</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pt-4 pb-6 flex-grow">
              <div className="flex items-baseline text-gray-900">
                <span className="text-4xl font-extrabold tracking-tight">€29</span>
                <span className="ml-1 text-sm font-medium text-gray-500">/mes</span>
              </div>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-gray-700">Hasta 20 productos</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-gray-700">Gestión básica de reservas</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-gray-700">Estadísticas mensuales</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-gray-700">Soporte por correo</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="px-6 pt-0 pb-6">
              <Button className="w-full bg-primary text-white-force">Empezar ahora</Button>
            </CardFooter>
          </Card>

          {/* Plan Profesional - El más popular */}
          <Card className="flex flex-col relative border-2 border-primary rounded-lg shadow-md transition-all hover:shadow-lg">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">Más popular</span>
            </div>
            <CardHeader className="px-6 pt-6 pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900">Profesional</CardTitle>
              <CardDescription className="text-gray-500">Para empresas establecidas</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pt-4 pb-6 flex-grow">
              <div className="flex items-baseline text-gray-900">
                <span className="text-4xl font-extrabold tracking-tight">€79</span>
                <span className="ml-1 text-sm font-medium text-gray-500">/mes</span>
              </div>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-gray-700">Hasta 100 productos</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-gray-700">Gestión avanzada de reservas</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-gray-700">Estadísticas en tiempo real</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-gray-700">Soporte prioritario</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-gray-700">Calendario personalizado</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="px-6 pt-0 pb-6">
              <Button className="w-full bg-primary text-white-force">Empieza ahora</Button>
            </CardFooter>
          </Card>

          {/* Plan Enterprise */}
          <Card className="flex flex-col border-2 border-gray-200 rounded-lg shadow-sm transition-all hover:shadow-md">
            <CardHeader className="px-6 pt-6 pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900">Enterprise</CardTitle>
              <CardDescription className="text-gray-500">Para grandes empresas de eventos</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pt-4 pb-6 flex-grow">
              <div className="flex items-baseline text-gray-900">
                <span className="text-4xl font-extrabold tracking-tight">€199</span>
                <span className="ml-1 text-sm font-medium text-gray-500">/mes</span>
              </div>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-gray-700">Productos ilimitados</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-gray-700">Gestión completa de reservas</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-gray-700">Análisis avanzado y reportes</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-gray-700">Soporte 24/7 personalizado</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-gray-700">Integración con otras plataformas</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-gray-700">Funciones personalizadas</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="px-6 pt-0 pb-6">
              <Button className="w-full bg-primary text-white-force">Contactar ventas</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-sm text-gray-500">
            Todos los planes incluyen 30 días de prueba gratuita. No se requiere tarjeta de crédito.
            <br />Cancela en cualquier momento durante el periodo de prueba sin cargo alguno.
          </p>
        </div>
      </div>
    </section>
  );
}