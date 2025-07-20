import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserRegistrationSchema, insertCompanyRegistrationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User registration route
  app.post("/api/register/user", async (req, res) => {
    try {
      const validatedData = insertUserRegistrationSchema.parse(req.body);
      const userRegistration = await storage.createUserRegistration(validatedData);
      res.status(201).json({
        message: "Registro exitoso. ¡Gracias por unirte a RentaEventos!",
        data: userRegistration
      });
    } catch (error) {
      res.status(400).json({ 
        message: "Error en el registro. Por favor, verifica los datos e intenta nuevamente.",
        error: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  });

  // Company registration route
  app.post("/api/register/company", async (req, res) => {
    try {
      const validatedData = insertCompanyRegistrationSchema.parse(req.body);
      const companyRegistration = await storage.createCompanyRegistration(validatedData);
      res.status(201).json({
        message: "Registro de empresa exitoso. Un miembro de nuestro equipo se pondrá en contacto contigo pronto.",
        data: companyRegistration
      });
    } catch (error) {
      res.status(400).json({ 
        message: "Error en el registro de la empresa. Por favor, verifica los datos e intenta nuevamente.",
        error: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  });

  // Get all user registrations (admin functionality)
  app.get("/api/registrations/users", async (_req, res) => {
    try {
      const registrations = await storage.getUserRegistrations();
      res.status(200).json(registrations);
    } catch (error) {
      res.status(500).json({ 
        message: "Error al obtener registros de usuarios",
        error: error instanceof Error ? error.message : "Error desconocido" 
      });
    }
  });

  // Get all company registrations (admin functionality)
  app.get("/api/registrations/companies", async (_req, res) => {
    try {
      const registrations = await storage.getCompanyRegistrations();
      res.status(200).json(registrations);
    } catch (error) {
      res.status(500).json({ 
        message: "Error al obtener registros de empresas",
        error: error instanceof Error ? error.message : "Error desconocido" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
