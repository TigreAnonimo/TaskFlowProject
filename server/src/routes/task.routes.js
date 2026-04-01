import express from "express";
import { taskController } from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", taskController.obtenerTodas);
router.post("/", taskController.crearTarea);
router.put("/:id", taskController.actualizarTarea);
router.delete("/:id", taskController.eliminarTarea);

export default router;
