# 🧩 TaskFlow — Documentación Técnica de la API (backend-api.md)

Este documento describe de forma técnica y detallada el funcionamiento interno de la API REST del proyecto **TaskFlow**, incluyendo rutas, validaciones, respuestas, errores y estructura del backend.

---

# 🚀 Base URL de la API

https://taskflow-backend-h758jxgl7-tigreanonimos-projects.vercel.app


---

# 🏗️ Arquitectura del Backend

El backend está construido con **Node.js + Express**, siguiendo una arquitectura por capas:

```plaintext
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

✔ Rutas
Definen los endpoints y conectan con los controladores.

✔ Controladores
Validan datos

Manejan errores

Llaman a los servicios

Devuelven respuestas HTTP

✔ Servicios
Contienen la lógica de negocio

No dependen de Express

Gestionan las tareas en memoria

✔ Middleware global de errores
Maneja errores 404 y 500.

🔌 Endpoints de la API
A continuación se documentan todos los endpoints disponibles.

📍 GET /tasks
Obtiene todas las tareas almacenadas.

✔ Respuesta 200
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

✔ Body esperado
{
  "titulo": "Comprar pan",
  "prioridad": 2
}

✔ Respuesta 201
{
  "id": 4,
  "text": "Comprar pan",
  "priority": "media",
  "completed": false,
  "createdAt": "12/04/2026"
}
❗ Validaciones
titulo obligatorio

mínimo 3 caracteres

prioridad debe ser 1, 2 o 3

📍 PATCH /tasks/:id
Actualiza parcialmente una tarea.

✔ Body permitido
{
  "completed": true
}

✔ Respuesta 200
{
  "id": 4,
  "text": "Comprar pan",
  "priority": "media",
  "completed": true,
  "createdAt": "12/04/2026"
}

❗ Errores
ID inexistente → 404

Body vacío → 400

📍 DELETE /tasks/:id
Elimina una tarea por ID.

✔ Respuesta 204
Sin contenido.

❗ Errores
ID inexistente → 404

🛡️ Validación de Datos
Ejemplo de validación en el controlador:

if (!titulo || typeof titulo !== "string" || titulo.trim().length < 3) {
  return res.status(400).json({
    error: "El título es obligatorio y debe tener al menos 3 caracteres."
  });
}

⚠️ Middleware Global de Errores
app.use((err, req, res, next) => {
  if (err.message === "NOT_FOUND") {
    return res.status(404).json({ error: "Recurso no encontrado" });
  }

  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});

🌐 Despliegue en Vercel
El backend se despliega desde la carpeta /server usando:
{
  "version": 2,
  "builds": [
    { "src": "api/index.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/api/index.js" }
  ]
}

🔗 Integración con el Frontend
El frontend consume la API mediante fetch:

const API_URL = "https://taskflow-backend-h758jxgl7-tigreanonimos-projects.vercel.app/tasks";

const response = await fetch(API_URL);
const tasks = await response.json();

👤 Autor
Jesús  
Desarrollador Full Stack en formación.
--------------------------------------
