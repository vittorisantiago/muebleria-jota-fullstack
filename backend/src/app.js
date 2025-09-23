import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import productsRouter from "./routes/products.routes.js";
import { logger } from "./middlewares/logger.js";
import { notFound, errorHandler } from "./middlewares/errorHandlers.js";

const app = express();

// --- resolver __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares globales
app.use(morgan("dev")); // logging HTTP
app.use(logger); // logging propio
app.use(express.json()); // parse application/json (futuro)

// Todo lo que esté en backend/public será accesible
app.use(
  "/assets",
  express.static(path.join(__dirname, "..", "public", "assets"))
);

// Rutas API
app.use("/api/productos", productsRouter);

// 404 y error handler
app.use(notFound);
app.use(errorHandler);

export default app;
