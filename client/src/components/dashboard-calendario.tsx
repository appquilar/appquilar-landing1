/**
 * Dashboard-Calendario.tsx
 * Componente que muestra la vista de calendario para ver alquileres
 * Vista creada basada en las funcionalidades requeridas
 */

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Users, Package2 } from "lucide-react";

// Datos de ejemplo para eventos del calendario
const eventos = [
  {
    id: 1,
    title: "Taladro Percutor 20V",
    client: "Juan Pérez",
    start: new Date(2025, 2, 15), // 15 de marzo 2025
    end: new Date(2025, 2, 18),   // 18 de marzo 2025
    status: "active",
  },
  {
    id: 2,
    title: "Sierra de Mesa con Soporte",
    client: "Sara Martínez",
    start: new Date(2025, 2, 12), // 12 de marzo 2025
    end: new Date(2025, 2, 19),   // 19 de marzo 2025
    status: "active",
  },
  {
    id: 3,
    title: "Set de Herramientas de Jardinería",
    client: "Miguel Rodríguez",
    start: new Date(2025, 2, 10), // 10 de marzo 2025
    end: new Date(2025, 2, 12),   // 12 de marzo 2025
    status: "completed",
  },
  {
    id: 4,
    title: "Mezcladora de Concreto",
    client: "Carlos López",
    start: new Date(2025, 2, 20), // 20 de marzo 2025
    end: new Date(2025, 2, 22),   // 22 de marzo 2025
    status: "upcoming",
  },
  {
    id: 5,
    title: "Compresor de Aire",
    client: "Ana Gómez",
    start: new Date(2025, 2, 25), // 25 de marzo 2025
    end: new Date(2025, 2, 28),   // 28 de marzo 2025
    status: "upcoming",
  }
];

export default function DashboardCalendario() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  
  // Función para determinar si una fecha tiene eventos
  const hasEventOnDay = (day: Date) => {
    return eventos.some(evento => {
      const eventStart = new Date(evento.start);
      const eventEnd = new Date(evento.end);
      return day >= eventStart && day <= eventEnd;
    });
  };

  // Función para obtener los eventos de un día específico
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

  // Función para manejar el cambio de día seleccionado
  const handleDaySelect = (day: Date | undefined) => {
    setSelectedDay(day);
  };

  // Eventos para el día seleccionado
  const selectedDayEvents = getEventsForDay(selectedDay as Date);
  
  return (
    <div className="p-5">
      {/* Encabezado de la sección */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Calendario de Alquileres</h1>
        <p className="text-gray-500">Visualiza y gestiona tus alquileres en formato calendario.</p>
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
                modifiers={{
                  event: (date) => hasEventOnDay(date),
                }}
                modifiersClassNames={{
                  event: "has-event"
                }}
                classNames={{
                  day: "relative"
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
                    {selectedDayEvents.length} {selectedDayEvents.length === 1 ? 'alquiler' : 'alquileres'} para este día
                  </p>
                  
                  {selectedDayEvents.map((evento) => (
                    <div key={evento.id} className="border rounded-md p-3 bg-gray-50">
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
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <Users className="h-4 w-4" />
                        {evento.client}
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        {evento.start.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} - 
                        {evento.end.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No hay alquileres para esta fecha</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}