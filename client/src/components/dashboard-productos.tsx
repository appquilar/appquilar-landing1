/**
 * Dashboard-Productos.tsx
 * Componente que muestra la vista de gestión de productos para empresas
 * Basado en la captura de pantalla proporcionada
 */

import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Datos de ejemplo para los productos orientados a eventos
const productos = [
  {
    id: "EVT001",
    nombre: "Sillas Plegables Blancas (paquete 50)",
    categoria: "Mobiliario de Eventos",
    precio: "75€/día",
    descripcion: "Paquete de 50 sillas plegables blancas de alta calidad para bodas y eventos formales",
    imagen: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200' fill='%23f8f9fa'%3E%3Crect width='300' height='200' fill='%23e9ecef'/%3E%3Cpath d='M175 120 H125 V70 H175 V120 Z' fill='%23fff' stroke='%23dee2e6' stroke-width='2'/%3E%3Cpath d='M135 120 V150 M165 120 V150 M130 150 H170' stroke='%23adb5bd' stroke-width='3' fill='none'/%3E%3Cpath d='M123 70 H177' stroke='%23adb5bd' stroke-width='4' fill='none'/%3E%3Ctext x='150' y='45' font-family='Arial' font-size='12' fill='%23495057' text-anchor='middle'%3ESillas Plegables%3C/text%3E%3C/svg%3E"
  },
  {
    id: "EVT002",
    nombre: "Mesas Redondas 180cm (paquete 10)",
    categoria: "Mobiliario de Eventos",
    precio: "120€/día",
    descripcion: "Mesas redondas de 180cm de diámetro para 10 personas, perfectas para banquetes y ceremonias",
    imagen: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200' fill='%23f8f9fa'%3E%3Crect width='300' height='200' fill='%23e9ecef'/%3E%3Ccircle cx='150' cy='100' r='60' fill='%23fff' stroke='%23dee2e6' stroke-width='2'/%3E%3Ccircle cx='150' cy='100' r='40' fill='none' stroke='%23adb5bd' stroke-width='1' stroke-dasharray='5,5'/%3E%3Ctext x='150' y='45' font-family='Arial' font-size='12' fill='%23495057' text-anchor='middle'%3EMesas Redondas%3C/text%3E%3C/svg%3E"
  },
  {
    id: "EVT003",
    nombre: "Carpa 5x10m con Paredes Laterales",
    categoria: "Carpas y Toldos",
    precio: "250€/día",
    descripcion: "Carpa elegante de 5x10m con paredes laterales desmontables, iluminación LED y piso elevado",
    imagen: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200' fill='%23f8f9fa'%3E%3Crect width='300' height='200' fill='%23e9ecef'/%3E%3Cpath d='M75 150 L150 70 L225 150 Z' fill='%23fff' stroke='%23dee2e6' stroke-width='2'/%3E%3Cpath d='M85 150 V120 M215 150 V120' stroke='%23adb5bd' stroke-width='3' fill='none'/%3E%3Cline x1='75' y1='150' x2='225' y2='150' stroke='%23adb5bd' stroke-width='2'/%3E%3Ctext x='150' y='45' font-family='Arial' font-size='12' fill='%23495057' text-anchor='middle'%3ECarpa para Eventos%3C/text%3E%3C/svg%3E"
  },
];

export default function DashboardProductos() {
  return (
    <div className="p-5">
      {/* Encabezado de la sección */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Productos</h1>
        <p className="text-gray-500">Gestiona tu inventario de alquiler.</p>
      </div>

      {/* Barra de búsqueda y botón de añadir */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Buscar productos por nombre o descripción..." 
            className="pl-10 pointer-events-none"
            disabled
          />
        </div>
        <Button className="bg-primary text-white-force">
          <Plus className="h-5 w-5 mr-2" />
          Añadir Nuevo
        </Button>
      </div>

      {/* Cuadrícula de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {productos.map((producto) => (
          <div key={producto.id} className="border border-gray-200 rounded-md overflow-hidden">
            {/* Imagen del producto */}
            <div className="relative h-48 bg-gray-100">
              <img 
                src={producto.imagen} 
                alt={producto.nombre} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 px-2 py-1 bg-gray-800 text-white text-xs font-medium rounded">
                {producto.id}
              </div>
            </div>
            
            {/* Información del producto */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-1 truncate">{producto.nombre}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>{producto.categoria} • {producto.precio}</span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">{producto.descripcion}</p>
              
              {/* Botones de acción - ahora uno encima del otro */}
              <div className="flex flex-col gap-2 mt-auto w-full">
                <Button variant="outline" size="sm" className="w-full h-9">
                  <Pencil className="h-4 w-4 flex-shrink-0 mr-2" />
                  <span>Editar</span>
                </Button>
                <Button variant="outline" size="sm" className="w-full h-9 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="h-4 w-4 flex-shrink-0 mr-2" />
                  <span>Eliminar</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}