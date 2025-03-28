import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Users, Building } from "lucide-react";

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

export default function RegistrationSection() {
  const { toast } = useToast();
  
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
    <section id="registro" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">Únete a RentaEventos</h2>
          <p className="mt-4 text-xl text-gray-600">Elige tu tipo de cuenta y comienza a disfrutar de todos los beneficios.</p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {/* User Registration */}
          <div id="registro-usuarios" className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Registro para usuarios</h3>
            <p className="text-gray-600 mb-8">Busca y alquila todo lo que necesitas para tu próximo evento sin complicaciones.</p>

            <Form {...userForm}>
              <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-6">
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
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={userMutation.isPending}
                >
                  {userMutation.isPending ? "Registrando..." : "Registrarme como usuario"}
                </Button>
              </form>
            </Form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Beneficios para usuarios</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="ml-2 text-sm text-gray-600">Búsqueda avanzada</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="ml-2 text-sm text-gray-600">Reservas instantáneas</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="ml-2 text-sm text-gray-600">Historial de alquileres</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="ml-2 text-sm text-gray-600">Atención 24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Company Registration */}
          <div id="registro-empresas" className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
              <Building className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Registro para empresas</h3>
            <p className="text-gray-600 mb-8">Ofrece tus productos, gestiona tu inventario y aumenta tus ingresos.</p>

            <Form {...companyForm}>
              <form onSubmit={companyForm.handleSubmit(onCompanySubmit)} className="space-y-6">
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
                <Button 
                  type="submit" 
                  className="w-full bg-amber-500 hover:bg-amber-600"
                  disabled={companyMutation.isPending}
                >
                  {companyMutation.isPending ? "Registrando..." : "Registrar mi empresa"}
                </Button>
              </form>
            </Form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Beneficios para empresas</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-amber-500" />
                  <span className="ml-2 text-sm text-gray-600">Dashboard completo</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-amber-500" />
                  <span className="ml-2 text-sm text-gray-600">Estadísticas detalladas</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-amber-500" />
                  <span className="ml-2 text-sm text-gray-600">Gestión de inventario</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-amber-500" />
                  <span className="ml-2 text-sm text-gray-600">Más visibilidad</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
