// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  userRegistrations;
  companyRegistrations;
  currentUserId;
  currentUserRegistrationId;
  currentCompanyRegistrationId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.userRegistrations = /* @__PURE__ */ new Map();
    this.companyRegistrations = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentUserRegistrationId = 1;
    this.currentCompanyRegistrationId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createUserRegistration(registration) {
    const id = this.currentUserRegistrationId++;
    const newRegistration = {
      ...registration,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.userRegistrations.set(id, newRegistration);
    return newRegistration;
  }
  async getUserRegistrations() {
    return Array.from(this.userRegistrations.values());
  }
  async createCompanyRegistration(registration) {
    const id = this.currentCompanyRegistrationId++;
    const newRegistration = {
      ...registration,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.companyRegistrations.set(id, newRegistration);
    return newRegistration;
  }
  async getCompanyRegistrations() {
    return Array.from(this.companyRegistrations.values());
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var userRegistration = pgTable("user_registrations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserRegistrationSchema = createInsertSchema(userRegistration).pick({
  name: true,
  email: true
});
var companyRegistration = pgTable("company_registrations", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  description: text("description").notNull(),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertCompanyRegistrationSchema = createInsertSchema(companyRegistration).pick({
  companyName: true,
  description: true,
  contactName: true,
  contactEmail: true
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/register/user", async (req, res) => {
    try {
      const validatedData = insertUserRegistrationSchema.parse(req.body);
      const userRegistration2 = await storage.createUserRegistration(validatedData);
      res.status(201).json({
        message: "Registro exitoso. \xA1Gracias por unirte a RentaEventos!",
        data: userRegistration2
      });
    } catch (error) {
      res.status(400).json({
        message: "Error en el registro. Por favor, verifica los datos e intenta nuevamente.",
        error: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  });
  app2.post("/api/register/company", async (req, res) => {
    try {
      const validatedData = insertCompanyRegistrationSchema.parse(req.body);
      const companyRegistration2 = await storage.createCompanyRegistration(validatedData);
      res.status(201).json({
        message: "Registro de empresa exitoso. Un miembro de nuestro equipo se pondr\xE1 en contacto contigo pronto.",
        data: companyRegistration2
      });
    } catch (error) {
      res.status(400).json({
        message: "Error en el registro de la empresa. Por favor, verifica los datos e intenta nuevamente.",
        error: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  });
  app2.get("/api/registrations/users", async (_req, res) => {
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
  app2.get("/api/registrations/companies", async (_req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  base: "/",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  publicDir: path.resolve(__dirname, "public"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 8080;
  server.listen({
    port,
    host: "127.0.0.1"
  }, () => {
    log(`serving on port ${port}`);
  });
})();
