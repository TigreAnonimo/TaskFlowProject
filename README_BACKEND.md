🧩 TaskFlow — Backend con Node.js + Express
Este documento describe la arquitectura, endpoints, validación, middlewares y despliegue del backend de TaskFlow.
El frontend original funcionaba con LocalStorage, pero ahora se conecta a una API REST real construida con Node.js y Express siguiendo una arquitectura profesional por capas.

🚀 URLs en Producción
Frontend
https://task-flow-project-chi.vercel.app/

Backend
https://taskflow-backend-h758jxgl7-tigreanonimos-projects.vercel.app

🏗️ Arquitectura del Backend
El backend sigue una arquitectura por capas estricta:

plaintext
server/
  api/
    index.js
  src/
    config/
      env.js
    routes/
      task.routes.js
    controllers/
      task.controller.js
    services/
      task.service.js
  vercel.json
✔ Capa de Rutas (routes/)
Define las rutas HTTP y las conecta con los controladores.

✔ Capa de Controladores (controllers/)
Reciben la petición

Validan datos

Llaman a los servicios

Devuelven respuestas HTTP

✔ Capa de Servicios (services/)
Lógica de negocio pura

No conoce Express

Gestiona las tareas en memoria

✔ Configuración (config/)
Carga variables de entorno y valida que existan.

🔌 API REST — Endpoints
Base URL:

Código
https://taskflow-backend-h758jxgl7-tigreanonimos-projects.vercel.app
📍 GET /tasks
Obtiene todas las tareas.

Respuesta 200

json
[
  {
    "id": 1,
    "text": "Ir al gimnasio",
    "priority": "media",
    "completed": false,
    "createdAt": "12/04/2026"
  }
]
📍 POST /tasks
Crea una nueva tarea.

Body esperado

json
{
  "titulo": "Comprar pan",
  "prioridad": 2
}
Respuesta 201

json
{
  "id": 4,
  "text": "Comprar pan",
  "priority": "media",
  "completed": false,
  "createdAt": "12/04/2026"
}
📍 PATCH /tasks/:id
Actualiza parcialmente una tarea.

Body

json
{
  "completed": true
}
📍 DELETE /tasks/:id
Elimina una tarea.

Respuesta 204 — No Content

🛡️ Validación de Datos
El backend valida:

titulo obligatorio

mínimo 3 caracteres

prioridad debe ser número 1–3

si el ID no existe → 404

errores inesperados → 500

Ejemplo de validación en el controlador:

js
if (!titulo || typeof titulo !== "string" || titulo.trim().length < 3) {
  return res.status(400).json({
    error: "El título es obligatorio y debe tener al menos 3 caracteres."
  });
}
⚠️ Middleware Global de Errores
js
app.use((err, req, res, next) => {
  if (err.message === "NOT_FOUND") {
    return res.status(404).json({ error: "Recurso no encontrado" });
  }

  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});
🌐 Despliegue en Vercel
Frontend
Deploy automático desde la raíz del proyecto

URL: https://task-flow-project-chi.vercel.app/

Backend
Deploy desde /server

Configurado con vercel.json:

json
{
  "version": 2,
  "builds": [
    { "src": "api/index.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/api/index.js" }
  ]
}
👤 Autor
Jesús  
Desarrollador Full Stack en formación.
