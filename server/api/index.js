import express from "express";
import cors from "cors";
import taskRoutes from "../src/routes/task.routes.js";
import { errorHandler } from "../middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando correctamente" });
});

// Rutas API
app.use("/api/v1/tasks", taskRoutes);

// Middleware de errores
app.use(errorHandler);

// Exportar la app directamente para Vercel
export default app;
