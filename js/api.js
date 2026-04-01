const API_URL = "http://localhost:3000/api/v1/tasks";

// Obtener todas las tareas
export async function obtenerTareas() {
    const res = await fetch(API_URL);
    return await res.json();
}

// Crear una tarea
export async function crearTarea(tarea) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tarea)
    });
    return await res.json();
}

// Actualizar una tarea
export async function actualizarTarea(id, datos) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });
    return await res.json();
}

// Eliminar una tarea
export async function eliminarTarea(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
