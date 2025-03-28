/**
 * Dashboard-Calendario.tsx
 * Componente que muestra la vista de calendario para ver alquileres
 * 
 * Características principales:
 * - Visualización de alquileres en formato calendario
 * - Días con eventos marcados con fondo gris
 * - Panel lateral que muestra los detalles de los eventos del día seleccionado
 * - Interacción visual sin funcionalidad real (modo demo)
 */

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Users, Package2 } from "lucide-react";
import { type Matcher } from "react-day-picker";

/**
 * Datos de ejemplo para eventos del calendario relacionados con eventos/fiestas
 * Cada evento incluye:
 * - id: Identificador único
 * - title: Nombre del producto alquilado
 * - client: Nombre del cliente
 * - start: Fecha de inicio del alquiler
 * - end: Fecha de fin del alquiler
 * - status: Estado del alquiler (active, completed, upcoming)
 */
const eventos = [
  {
    id: 1,
    title: "Sillas Plegables Blancas (paquete 50)",
    client: "Eventos Elegantes",
    start: new Date(2025, 2, 15), // 15 de marzo 2025
    end: new Date(2025, 2, 18),   // 18 de marzo 2025
    status: "active",
  },
  {
    id: 2,
    title: "Mesas Redondas 180cm (paquete 10)",
    client: "Bodas Luxury",
    start: new Date(2025, 2, 12), // 12 de marzo 2025
    end: new Date(2025, 2, 19),   // 19 de marzo 2025
    status: "active",
  },
  {
    id: 3,
    title: "Sistema de Sonido Profesional 1000W",
    client: "Fiestas Premium",
    start: new Date(2025, 2, 10), // 10 de marzo 2025
    end: new Date(2025, 2, 12),   // 12 de marzo 2025
    status: "completed",
  },
  {
    id: 4,
    title: "Carpa 5x10m con Paredes Laterales",
    client: "Celebraciones Elite",
    start: new Date(2025, 2, 20), // 20 de marzo 2025
    end: new Date(2025, 2, 22),   // 22 de marzo 2025
    status: "upcoming",
  },
  {
    id: 5,
    title: "Kit de Iluminación para Eventos",
    client: "Eventos Corporativos SL",
    start: new Date(2025, 2, 25), // 25 de marzo 2025
    end: new Date(2025, 2, 28),   // 28 de marzo 2025
    status: "upcoming",
  }
];

export default function DashboardCalendario() {
  // Estado para el mes actual y el día seleccionado
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date(2025, 2, 15));
  
  /**
   * Determina si una fecha tiene eventos programados
   * @param day - La fecha a comprobar
   * @returns boolean - true si hay eventos para ese día
   */
  const hasEventOnDay = (day: Date): boolean => {
    return eventos.some(evento => {
      const eventStart = new Date(evento.start);
      const eventEnd = new Date(evento.end);
      return day >= eventStart && day <= eventEnd;
    });
  };

  /**
   * Obtiene los eventos para un día específico
   * @param day - El día del que se quieren obtener los eventos
   * @returns array - Lista de eventos para ese día
   */
  const getEventsForDay = (day: Date) => {
    if (!day) return [];
    
    return eventos.filter(evento => {
      const eventStart = new Date(evento.start);
      const eventEnd = new Date(evento.end);
      return day.getDate() >= eventStart.getDate() && 
             day.getDate() <= eventEnd.getDate() &&
             day.getMonth() === eventStart.getMonth();
    });
  };

  /**
   * Maneja la selección de un día en el calendario
   * @param day - El día seleccionado
   */
  const handleDaySelect = (day: Date | undefined) => {
    setSelectedDay(day);
  };

  // Obtener los eventos para el día seleccionado
  const selectedDayEvents = getEventsForDay(selectedDay as Date);
  
  return (
    <div className="p-5">
      {/* Encabezado de la sección */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Calendario de Reservas</h1>
        <p className="text-gray-500">Visualiza y gestiona tus reservas en formato calendario.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendario a la izquierda */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Marzo 2025</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDay}
                onSelect={handleDaySelect}
                defaultMonth={date}
                className="rounded-md border"
                disabled={false} /* Permite "selección" visual pero sin acciones reales */
                modifiers={{
                  // Definimos los modificadores para los diferentes estados de los días
                  "eventDay": (date) => hasEventOnDay(date),
                  "selectedDay": selectedDay ? [selectedDay] : [],
                }}
                modifiersClassNames={{
                  // Clases CSS para los diferentes estados
                  "eventDay": "calendar-event-day",
                  "selectedDay": "calendar-selected-day",
                }}
                classNames={{
                  day: "text-center relative"
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Panel de eventos del día a la derecha */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <span>
                  {selectedDay ? selectedDay.toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    day: 'numeric',
                    month: 'long'
                  }) : 'Seleccione una fecha'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDayEvents.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    {selectedDayEvents.length} {selectedDayEvents.length === 1 ? 'reserva' : 'reservas'} para este día
                  </p>
                  
                  {/* Lista de eventos para el día seleccionado */}
                  {selectedDayEvents.map((evento) => (
                    <div key={evento.id} className="border rounded-md p-3 bg-gray-50">
                      {/* Cabecera del evento con título y estado */}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium flex items-center gap-2">
                          <Package2 className="h-4 w-4 text-gray-500" />
                          {evento.title}
                        </h3>
                        <Badge className={
                          evento.status === "active" ? "bg-green-100 text-green-800" : 
                          evento.status === "upcoming" ? "bg-blue-100 text-blue-800" : 
                          "bg-gray-100 text-gray-800"
                        }>
                          {evento.status === "active" ? "Activo" : 
                          evento.status === "upcoming" ? "Próximo" : 
                          "Completado"}
                        </Badge>
                      </div>
                      
                      {/* Información del cliente */}
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <Users className="h-4 w-4" />
                        {evento.client}
                      </div>
                      
                      {/* Fechas del evento */}
                      <div className="text-sm text-gray-500">
                        {evento.start.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} - 
                        {evento.end.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Mensaje cuando no hay eventos para el día seleccionado */
                <div className="text-center py-6 text-gray-500">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No hay reservas para esta fecha</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}