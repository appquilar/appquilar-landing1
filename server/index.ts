// server/index.ts
import express from "express";
import { createServer } from "http";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Body parsers (seguros aunque no tengamos APIs)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger simple (mantiene trazas, sin capturar res.json)
app.use((req, _res, next) => {
  const start = Date.now();
  const done = () => {
    const ms = Date.now() - start;
    log(`${req.method} ${req.path} – ${ms}ms`);
  };
  // finaliza al terminar la respuesta
  _res.on("finish", done);
  next();
});

(async () => {
  // IMPORTANTE: ya no registramos ninguna ruta /api/*
  // No usamos registerRoutes ni nada similar.

  // Dev: Vite en middleware; Prod: estático desde dist
  if (process.env.NODE_ENV !== "production") {
    await setupVite(app);
  } else {
    serveStatic(app);
  }

  const port = Number(process.env.PORT) || 8080;
  const server = createServer(app);

  server.listen(
      { port, host: "127.0.0.1" },
      () => log(`serving on port ${port}`)
  );
})();
