import taskRoutes from "./routes/task.routes.js";
import express from "express";
import cors from "cors";
import "./config/env.js";
import { errorHandler } from "../middlewares/errorHandler.js";


const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/v1/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando correctamente" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Middleware global de errores (siempre al final)
app.use(errorHandler);
