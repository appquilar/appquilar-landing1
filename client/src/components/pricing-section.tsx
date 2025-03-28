/**
 * Pricing-Section.tsx
 * Componente que muestra las opciones de suscripción para las empresas
 * 
 * Características principales:
 * - Tres planes de suscripción: Básico, Profesional y Premium
 * - Cada plan muestra características y precios diferentes
 * - Diseño visual acorde con el resto de la plataforma
 */

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function PricingSection() {
  return (
    <section id="precios" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Planes de Suscripción</h2>
          <p className="mt-3 text-lg text-gray-600">
            Elige el plan que mejor se adapte a tu negocio de alquiler de productos para eventos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan Básico */}
          <Card className="border-gray-200 shadow-sm flex flex-col h-full">
            <CardHeader className="pb-8">
              <CardTitle className="text-xl">Plan Básico</CardTitle>
              <CardDescription>Ideal para pequeños negocios</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">€29</span>
                <span className="text-gray-500">/mes</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Hasta 20 productos en catálogo</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Dashboard básico de gestión</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Soporte por email</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Sistema de reservas básico</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary text-white-force">
                Comenzar Ahora
              </Button>
            </CardFooter>
          </Card>

          {/* Plan Profesional (Destacado) */}
          <Card className="border-primary border-2 shadow-md flex flex-col h-full relative">
            <div className="absolute top-0 inset-x-0 -mt-3 flex justify-center">
              <span className="bg-primary text-white text-sm font-medium px-4 py-1 rounded-full">
                Más Popular
              </span>
            </div>
            <CardHeader className="pb-8">
              <CardTitle className="text-xl">Plan Profesional</CardTitle>
              <CardDescription>Para empresas en crecimiento</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">€79</span>
                <span className="text-gray-500">/mes</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Hasta 100 productos en catálogo</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Dashboard completo con estadísticas</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Soporte por email y teléfono</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Sistema de reservas avanzado</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Sistema de seguimiento de pagos</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Aplicación móvil incluida</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary text-white-force">
                Elegir Profesional
              </Button>
            </CardFooter>
          </Card>

          {/* Plan Premium */}
          <Card className="border-gray-200 shadow-sm flex flex-col h-full">
            <CardHeader className="pb-8">
              <CardTitle className="text-xl">Plan Premium</CardTitle>
              <CardDescription>Para grandes empresas</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">€149</span>
                <span className="text-gray-500">/mes</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Productos ilimitados en catálogo</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Dashboard premium con inteligencia predictiva</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Soporte prioritario 24/7</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Sistema de reservas completo con flujos personalizados</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Múltiples usuarios y perfiles</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Integración con tiendas online</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>API para desarrolladores</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary text-white-force">
                Elegir Premium
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <p className="text-center mt-8 text-sm text-gray-500">
          Todos los planes incluyen un periodo de prueba gratuito de 14 días. No se requiere tarjeta de crédito.
        </p>
      </div>
    </section>
  );
}