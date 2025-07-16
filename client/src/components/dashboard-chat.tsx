/**
 * Dashboard-Chat.tsx
 * Componente que muestra la vista de chat/mensajería para empresas
 * 
 * Características principales:
 * - Lista de conversaciones con clientes
 * - Panel de chat activo con mensajes
 * - Interfaz visualmente similar a apps de mensajería modernas
 * - Estado demo sin funcionalidad real
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Send, 
  Search, 
  MoreVertical,
  Phone,
  Video
} from "lucide-react";

/**
 * Datos de ejemplo para conversaciones de chat
 * Simulan conversaciones con clientes sobre alquileres de productos
 */
const conversaciones = [
  {
    id: 1,
    cliente: "María González",
    ultimoMensaje: "¿Está disponible para el 15 de marzo?",
    hora: "10:30",
    noLeidos: 2,
    activo: true,
    avatar: "MG"
  },
  {
    id: 2,
    cliente: "Carlos Ruiz",
    ultimoMensaje: "Perfecto, confirmamos el alquiler",
    hora: "09:45",
    noLeidos: 0,
    activo: false,
    avatar: "CR"
  },
  {
    id: 3,
    cliente: "Ana Martín",
    ultimoMensaje: "¿Qué incluye el paquete completo?",
    hora: "Ayer",
    noLeidos: 1,
    activo: false,
    avatar: "AM"
  },
  {
    id: 4,
    cliente: "Eventos Luna",
    ultimoMensaje: "Gracias por la cotización",
    hora: "Ayer",
    noLeidos: 0,
    activo: false,
    avatar: "EL"
  }
];

/**
 * Mensajes de la conversación activa
 */
const mensajesActivos = [
  {
    id: 1,
    autor: "María González",
    mensaje: "Hola, estoy interesada en alquilar sillas para un evento",
    hora: "10:25",
    esCliente: true
  },
  {
    id: 2,
    autor: "Appquilar",
    mensaje: "¡Hola María! Perfecto, ¿para qué fecha necesitas las sillas?",
    hora: "10:26",
    esCliente: false
  },
  {
    id: 3,
    autor: "María González",
    mensaje: "Para el 15 de marzo, necesito unas 50 sillas",
    hora: "10:27",
    esCliente: true
  },
  {
    id: 4,
    autor: "Appquilar",
    mensaje: "Perfecto, tenemos disponibilidad. Te envío la cotización",
    hora: "10:28",
    esCliente: false
  },
  {
    id: 5,
    autor: "María González",
    mensaje: "¿Está disponible para el 15 de marzo?",
    hora: "10:30",
    esCliente: true
  }
];

export default function DashboardChat() {
  return (
    <div className="p-5">
      {/* Encabezado de la sección */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Chat con Clientes</h1>
        <p className="text-gray-500">Gestiona las conversaciones con tus clientes en tiempo real.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Panel izquierdo: Lista de conversaciones */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Conversaciones</CardTitle>
                <Badge variant="secondary">4</Badge>
              </div>
              
              {/* Barra de búsqueda */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar conversaciones..."
                  className="pl-10"
                  disabled
                />
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversaciones.map((conv) => (
                  <div 
                    key={conv.id}
                    className={`p-3 hover:bg-gray-50 cursor-pointer border-l-4 ${
                      conv.activo ? 'border-l-primary bg-blue-50' : 'border-l-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="text-sm font-medium">
                          {conv.avatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="font-medium text-sm text-gray-900 truncate">
                            {conv.cliente}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{conv.hora}</span>
                            {conv.noLeidos > 0 && (
                              <Badge variant="destructive" className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                                {conv.noLeidos}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {conv.ultimoMensaje}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel derecho: Chat activo */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            {/* Cabecera del chat */}
            <CardHeader className="pb-3 border-b">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="text-sm font-medium">MG</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">María González</CardTitle>
                    <p className="text-sm text-gray-500">En línea</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" disabled>
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" disabled>
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" disabled>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Área de mensajes */}
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {mensajesActivos.map((mensaje) => (
                  <div 
                    key={mensaje.id}
                    className={`flex ${mensaje.esCliente ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      mensaje.esCliente 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'bg-primary text-white'
                    }`}>
                      <p className="text-sm">{mensaje.mensaje}</p>
                      <p className={`text-xs mt-1 ${
                        mensaje.esCliente ? 'text-gray-500' : 'text-white/70'
                      }`}>
                        {mensaje.hora}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>

            {/* Área de entrada de mensaje */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Escribe un mensaje..."
                  className="flex-1"
                  disabled
                />
                <Button size="icon" disabled>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Esta es una vista demo del chat
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}