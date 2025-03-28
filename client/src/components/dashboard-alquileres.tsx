/**
 * Dashboard-Alquileres.tsx
 * Componente que muestra la vista de gestión de alquileres para empresas
 * Basado en la captura de pantalla proporcionada
 */

import { Search, Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Datos de ejemplo para los alquileres
const alquileres = [
  {
    id: "1",
    producto: "Set de Mesas Redondas 180cm",
    cliente: {
      nombre: "Juan Pérez",
      email: "juan@example.com"
    },
    periodo: {
      fechaInicio: "2025-03-15",
      fechaFin: "2025-03-18",
      dias: 3
    },
    importe: "360€",
    estado: "active",
    devuelto: false
  },
  {
    id: "2",
    producto: "Carpa 5x10m con Paredes Laterales",
    cliente: {
      nombre: "Sara Rodríguez",
      email: "sara@example.com"
    },
    periodo: {
      fechaInicio: "2025-03-20",
      fechaFin: "2025-03-27",
      dias: 7
    },
    importe: "1750€",
    estado: "active",
    devuelto: false
  },
  {
    id: "3",
    producto: "Sistema de Sonido Profesional 1000W",
    cliente: {
      nombre: "David López",
      email: "david@example.com"
    },
    periodo: {
      fechaInicio: "2025-04-05",
      fechaFin: "2025-04-07",
      dias: 2
    },
    importe: "360€",
    estado: "upcoming",
    devuelto: false
  },
  {
    id: "4",
    producto: "Set de Decoración Bohemia",
    cliente: {
      nombre: "María García",
      email: "maria@example.com"
    },
    periodo: {
      fechaInicio: "2025-03-01",
      fechaFin: "2025-03-03",
      dias: 2
    },
    importe: "190€",
    estado: "completed",
    devuelto: true
  },
  {
    id: "5",
    producto: "Kit de Iluminación para Eventos",
    cliente: {
      nombre: "Roberto Fernández",
      email: "roberto@example.com"
    },
    periodo: {
      fechaInicio: "2025-02-20",
      fechaFin: "2025-02-22",
      dias: 2
    },
    importe: "300€",
    estado: "completed",
    devuelto: true
  }
];

export default function DashboardAlquileres() {
  return (
    <div className="p-5">
      {/* Encabezado de la sección */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Reservas</h1>
        <p className="text-gray-500">Controla y gestiona todas tus reservas de equipamiento.</p>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Buscar reservas..." 
            className="pl-10"
          />
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button className="gap-2 bg-primary text-white-force">
            <Calendar className="h-4 w-4" />
            Vista Calendario
          </Button>
        </div>
      </div>

      {/* Tabs de filtrado por estado */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Todas <Badge className="ml-1 bg-gray-200 text-gray-700">{alquileres.length}</Badge></TabsTrigger>
          <TabsTrigger value="active">Activas <Badge className="ml-1 bg-gray-200 text-gray-700">2</Badge></TabsTrigger>
          <TabsTrigger value="upcoming">Próximas <Badge className="ml-1 bg-gray-200 text-gray-700">1</Badge></TabsTrigger>
          <TabsTrigger value="completed">Completadas <Badge className="ml-1 bg-gray-200 text-gray-700">2</Badge></TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Lista de reservas */}
      <div className="space-y-4">
        {alquileres.map((alquiler) => (
          <div 
            key={alquiler.id} 
            className="border border-gray-200 rounded-lg p-5 bg-white"
          >
            <div className="flex flex-wrap justify-between gap-4">
              {/* Información del producto y cliente */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">{alquiler.producto}</h3>
                  <p className="text-sm text-gray-500">Reserva #{alquiler.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cliente</p>
                  <p className="font-medium">{alquiler.cliente.nombre}</p>
                  <p className="text-sm text-gray-500">{alquiler.cliente.email}</p>
                </div>
              </div>

              {/* Información del periodo */}
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Periodo de Reserva</p>
                <p className="font-medium">
                  {alquiler.periodo.fechaInicio} a {alquiler.periodo.fechaFin}
                </p>
                <p className="text-sm text-gray-500">{alquiler.periodo.dias} días</p>
              </div>

              {/* Información del importe */}
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Importe</p>
                <p className="font-medium">{alquiler.importe}</p>
                <p className="text-sm text-gray-500">{alquiler.devuelto ? 'Devuelto' : 'No devuelto'}</p>
              </div>

              {/* Estado y acciones */}
              <div className="flex flex-col items-end justify-between min-w-[150px]">
                <Badge className={
                  alquiler.estado === "active" ? "bg-green-100 text-green-800 hover:bg-green-200" : 
                  alquiler.estado === "upcoming" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : 
                  "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }>
                  {alquiler.estado === "active" ? "Activa" : 
                   alquiler.estado === "upcoming" ? "Próxima" : 
                   "Completada"}
                </Badge>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">Ver Detalles</Button>
                  {alquiler.estado === "active" && !alquiler.devuelto && (
                    <Button size="sm" className="bg-primary text-white-force">
                      Marcar como Devuelto
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}