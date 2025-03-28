/**
 * Dashboard-Productos.tsx
 * Componente que muestra la vista de gestión de productos para empresas
 * Basado en la captura de pantalla proporcionada
 */

import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Datos de ejemplo para los productos
const productos = [
  {
    id: "PRD001",
    nombre: "Taladro Percutor Profesional 20V",
    categoria: "Herramientas Eléctricas",
    precio: "25€/día",
    descripcion: "Taladro percutor de alta potencia perfecto para trabajos en construcción",
    imagen: "https://via.placeholder.com/300x200?text=Taladro"
  },
  {
    id: "PRD002",
    nombre: "Sierra de Mesa con Soporte",
    categoria: "Herramientas Eléctricas",
    precio: "35€/día",
    descripcion: "Sierra de mesa portátil con soporte plegable. Ideal para obras y carpintería",
    imagen: "https://via.placeholder.com/300x200?text=Sierra"
  },
  {
    id: "PRD003",
    nombre: "Set de Herramientas de Jardinería",
    categoria: "Jardinería",
    precio: "20€/día",
    descripcion: "Conjunto completo de herramientas de jardinería para mantenimiento de jardines",
    imagen: "https://via.placeholder.com/300x200?text=Jardineria"
  },
  {
    id: "PRD004",
    nombre: "Fratás para Concreto 48\"",
    categoria: "Construcción",
    precio: "28€/día",
    descripcion: "Fratás para concreto de grado profesional para alisar superficies",
    imagen: "https://via.placeholder.com/300x200?text=Fratas"
  },
  {
    id: "PRD005",
    nombre: "Lijadora Orbital 5\"",
    categoria: "Herramientas Eléctricas",
    precio: "22€/día", 
    descripcion: "Lijadora orbital para acabados finos en madera y metal",
    imagen: "https://via.placeholder.com/300x200?text=Lijadora"
  },
  {
    id: "PRD006",
    nombre: "Compactadora de Placa",
    categoria: "Construcción",
    precio: "45€/día",
    descripcion: "Compactadora de placa vibradora para trabajos de compactación",
    imagen: "https://via.placeholder.com/300x200?text=Compactadora"
  },
  {
    id: "PRD007",
    nombre: "Soldadora Inverter 200A",
    categoria: "Soldadura",
    precio: "40€/día",
    descripcion: "Soldadora inverter de alta calidad para trabajos profesionales",
    imagen: "https://via.placeholder.com/300x200?text=Soldadora"
  },
  {
    id: "PRD008",
    nombre: "Cortadora de Césped Profesional",
    categoria: "Jardinería",
    precio: "38€/día",
    descripcion: "Cortadora de césped de alta potencia para grandes extensiones",
    imagen: "https://via.placeholder.com/300x200?text=Cortadora"
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
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="h-5 w-5 mr-2" />
          Añadir Nuevo
        </Button>
      </div>

      {/* Cuadrícula de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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
              
              {/* Botones de acción */}
              <div className="flex mt-auto">
                <Button variant="outline" size="sm" className="flex-1 mr-2">
                  <Pencil className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}