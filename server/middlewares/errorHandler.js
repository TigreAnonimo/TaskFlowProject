export function errorHandler(err, req, res, next) {
    console.error("🔥 Error capturado:", err.message);
  
    // Error de recurso no encontrado
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ error: "NOT_FOUND" });
    }
  
    // Error de validación
    if (err.message === "VALIDATION_ERROR") {
      return res.status(400).json({ error: "Datos inválidos" });
    }
  
    // Error desconocido → 500
    return res.status(500).json({
      error: "Error interno del servidor"
    });
  }
