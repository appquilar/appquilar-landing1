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
    producto: "Hammer Drill 20V",
    cliente: {
      nombre: "John Smith",
      email: "john@example.com"
    },
    periodo: {
      fechaInicio: "2023-07-15",
      fechaFin: "2023-07-18",
      dias: 3
    },
    importe: "$75.00",
    estado: "active",
    devuelto: false
  },
  {
    id: "2",
    producto: "Table Saw with Stand",
    cliente: {
      nombre: "Sarah Johnson",
      email: "sarah@example.com"
    },
    periodo: {
      fechaInicio: "2023-07-12",
      fechaFin: "2023-07-19",
      dias: 7
    },
    importe: "$245.00",
    estado: "active",
    devuelto: false
  },
  {
    id: "3",
    producto: "Concrete Mixer",
    cliente: {
      nombre: "David Lopez",
      email: "david@example.com"
    },
    periodo: {
      fechaInicio: "2023-07-20",
      fechaFin: "2023-07-22",
      dias: 2
    },
    importe: "$120.00",
    estado: "upcoming",
    devuelto: false
  },
  {
    id: "4",
    producto: "Circular Saw",
    cliente: {
      nombre: "Maria Garcia",
      email: "maria@example.com"
    },
    periodo: {
      fechaInicio: "2023-07-08",
      fechaFin: "2023-07-10",
      dias: 2
    },
    importe: "$65.00",
    estado: "completed",
    devuelto: true
  },
  {
    id: "5",
    producto: "Floor Sander",
    cliente: {
      nombre: "Robert Chen",
      email: "robert@example.com"
    },
    periodo: {
      fechaInicio: "2023-07-05",
      fechaFin: "2023-07-07",
      dias: 2
    },
    importe: "$90.00",
    estado: "completed",
    devuelto: true
  }
];

export default function DashboardAlquileres() {
  return (
    <div className="p-5">
      {/* Encabezado de la sección */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Rentals Management</h1>
        <p className="text-gray-500">Track and manage all your equipment rentals.</p>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search rentals..." 
            className="pl-10"
          />
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button className="gap-2">
            <Calendar className="h-4 w-4" />
            Calendar View
          </Button>
        </div>
      </div>

      {/* Tabs de filtrado por estado */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All <Badge className="ml-1 bg-gray-200 text-gray-700">{alquileres.length}</Badge></TabsTrigger>
          <TabsTrigger value="active">Active <Badge className="ml-1 bg-gray-200 text-gray-700">3</Badge></TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming <Badge className="ml-1 bg-gray-200 text-gray-700">1</Badge></TabsTrigger>
          <TabsTrigger value="completed">Completed <Badge className="ml-1 bg-gray-200 text-gray-700">2</Badge></TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Lista de alquileres */}
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
                  <p className="text-sm text-gray-500">Rental #{alquiler.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{alquiler.cliente.nombre}</p>
                  <p className="text-sm text-gray-500">{alquiler.cliente.email}</p>
                </div>
              </div>

              {/* Información del periodo */}
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Rental Period</p>
                <p className="font-medium">
                  {alquiler.periodo.fechaInicio} to {alquiler.periodo.fechaFin}
                </p>
                <p className="text-sm text-gray-500">{alquiler.periodo.dias} days</p>
              </div>

              {/* Información del importe */}
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium">{alquiler.importe}</p>
                <p className="text-sm text-gray-500">{alquiler.devuelto ? 'Returned' : 'Not returned'}</p>
              </div>

              {/* Estado y acciones */}
              <div className="flex flex-col items-end justify-between min-w-[150px]">
                <Badge className={
                  alquiler.estado === "active" ? "bg-green-100 text-green-800 hover:bg-green-200" : 
                  alquiler.estado === "upcoming" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : 
                  "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }>
                  {alquiler.estado === "active" ? "Active" : 
                   alquiler.estado === "upcoming" ? "Upcoming" : 
                   "Completed"}
                </Badge>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">View Details</Button>
                  {alquiler.estado === "active" && !alquiler.devuelto && (
                    <Button size="sm">
                      Mark as Returned
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