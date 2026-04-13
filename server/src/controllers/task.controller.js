import { taskService } from "../services/task.service.js";

export const taskController = {
  obtenerTodas(req, res) {
    res.json(taskService.obtenerTodas());
  },

  crearTarea(req, res) {
    let { titulo, prioridad } = req.body;

    // Validación del título
    if (!titulo || typeof titulo !== "string" || titulo.trim().length < 3) {
      return res.status(400).json({
        error: "El título es obligatorio y debe tener al menos 3 caracteres."
      });
    }

    // Prioridad por defecto si no se envía
    if (!prioridad) prioridad = 2;

    // Validación de prioridad
    if (isNaN(prioridad) || prioridad < 1 || prioridad > 3) {
      return res.status(400).json({
        error: "La prioridad debe ser un número entre 1 y 3."
      });
    }

    const nueva = taskService.crearTarea({ titulo, prioridad });
    res.status(201).json(nueva);
  },

  actualizarTarea(req, res) {
    const id = parseInt(req.params.id);
    const datos = req.body;

    // Validación opcional del título
    if (datos.titulo && (typeof datos.titulo !== "string" || datos.titulo.trim().length < 3)) {
      return res.status(400).json({
        error: "El título debe tener al menos 3 caracteres."
      });
    }

    // Validación opcional de prioridad
    if (datos.prioridad && (isNaN(datos.prioridad) || datos.prioridad < 1 || datos.prioridad > 3)) {
      return res.status(400).json({
        error: "La prioridad debe ser un número entre 1 y 3."
      });
    }

    try {
      const actualizada = taskService.actualizarTarea(id, datos);
      res.json(actualizada);
    } catch (error) {
      res.status(404).json({ error: "NOT_FOUND" });
    }
  },

  eliminarTarea(req, res) {
    const id = parseInt(req.params.id);

    try {
      taskService.eliminarTarea(id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: "NOT_FOUND" });
    }
  }
};
