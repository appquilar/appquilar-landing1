import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Users, Building, X } from "lucide-react";

// Validation schemas
const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, introduce un correo electrónico válido.",
  }),
});

const companyFormSchema = z.object({
  companyName: z.string().min(2, {
    message: "El nombre de la empresa debe tener al menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  contactName: z.string().min(2, {
    message: "El nombre de contacto debe tener al menos 2 caracteres.",
  }),
  contactEmail: z.string().email({
    message: "Por favor, introduce un correo electrónico válido.",
  }),
});

type UserFormValues = z.infer<typeof userFormSchema>;
type CompanyFormValues = z.infer<typeof companyFormSchema>;

export default function RegistrationModals() {
  const { toast } = useToast();
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  
  // Listener para eventos personalizados que abren los modales
  useEffect(() => {
    const handleOpenUserModal = () => setUserModalOpen(true);
    const handleOpenCompanyModal = () => setCompanyModalOpen(true);
    
    window.addEventListener('open-user-modal', handleOpenUserModal);
    window.addEventListener('open-company-modal', handleOpenCompanyModal);
    
    return () => {
      window.removeEventListener('open-user-modal', handleOpenUserModal);
      window.removeEventListener('open-company-modal', handleOpenCompanyModal);
    };
  }, []);
  
  // User registration form
  const userForm = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // Company registration form
  const companyForm = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyName: "",
      description: "",
      contactName: "",
      contactEmail: "",
    },
  });

  // User registration mutation
  const userMutation = useMutation({
    mutationFn: async (values: UserFormValues) => {
      const res = await apiRequest("POST", "/api/register/user", values);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "¡Registro exitoso!",
        description: "Gracias por registrarte como usuario. Te enviaremos un correo con los detalles para completar tu registro.",
      });
      userForm.reset();
      setUserModalOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error en el registro",
        description: error instanceof Error ? error.message : "Ha ocurrido un error. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  // Company registration mutation
  const companyMutation = useMutation({
    mutationFn: async (values: CompanyFormValues) => {
      const res = await apiRequest("POST", "/api/register/company", values);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "¡Registro exitoso!",
        description: "Gracias por registrar tu empresa. Un miembro de nuestro equipo se pondrá en contacto contigo pronto.",
      });
      companyForm.reset();
      setCompanyModalOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error en el registro",
        description: error instanceof Error ? error.message : "Ha ocurrido un error. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  // Submit handlers
  function onUserSubmit(values: UserFormValues) {
    userMutation.mutate(values);
  }

  function onCompanySubmit(values: CompanyFormValues) {
    companyMutation.mutate(values);
  }

  return (
    <>
      {/* Modal para registro de usuarios */}
      <Dialog open={userModalOpen} onOpenChange={setUserModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Users className="w-6 h-6 text-primary mr-2" />
              Registro para clientes
            </DialogTitle>
            <DialogDescription>
              Busca y alquila todo lo que necesitas para tu próximo evento sin complicaciones.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...userForm}>
            <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-4">
              <FormField
                control={userForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingresa tu nombre completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={userForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="tu@email.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Beneficios</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                    <span className="text-gray-600">Búsqueda avanzada</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                    <span className="text-gray-600">Reservas instantáneas</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                    <span className="text-gray-600">Historial de alquileres</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                    <span className="text-gray-600">Atención personalizada</span>
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={userMutation.isPending}
                >
                  {userMutation.isPending ? "Registrando..." : "Registrarme como cliente"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Modal para registro de empresas */}
      <Dialog open={companyModalOpen} onOpenChange={setCompanyModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Building className="w-6 h-6 text-amber-500 mr-2" />
              Registro para empresas
            </DialogTitle>
            <DialogDescription>
              Ofrece tus productos, gestiona tu inventario y aumenta tus ingresos.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...companyForm}>
            <form onSubmit={companyForm.handleSubmit(onCompanySubmit)} className="space-y-4">
              <FormField
                control={companyForm.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de tu empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={companyForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción breve</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Cuéntanos brevemente sobre tu empresa" 
                        className="resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={companyForm.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de contacto</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={companyForm.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email de contacto</FormLabel>
                    <FormControl>
                      <Input placeholder="contacto@tuempresa.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Beneficios</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-amber-500 mr-2" />
                    <span className="text-gray-600">Dashboard completo</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-amber-500 mr-2" />
                    <span className="text-gray-600">Estadísticas</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-amber-500 mr-2" />
                    <span className="text-gray-600">Gestión de inventario</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-amber-500 mr-2" />
                    <span className="text-gray-600">Más visibilidad</span>
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-amber-500 hover:bg-amber-600" 
                  disabled={companyMutation.isPending}
                >
                  {companyMutation.isPending ? "Registrando..." : "Registrar mi empresa"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}