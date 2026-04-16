const API_URL = "https://taskflow-backend-h758jxgl7-tigreanonimos-projects.vercel.app/api/v1/tasks";

// Obtener todas las tareas
export async function obtenerTareas() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener tareas");
    return res.json();
}

// Crear tarea
export async function crearTarea(tarea) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tarea)
    });

    if (!res.ok) throw new Error("Error al crear tarea");
    return res.json();
}

// Actualizar tarea
export async function actualizarTarea(id, cambios) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cambios)
    });

    if (!res.ok) throw new Error("Error al actualizar tarea");
    return res.json();
}

// Eliminar tarea
export async function eliminarTarea(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (res.status === 204) return true; // <-- FIX para eliminar
    if (!res.ok) throw new Error("Error al eliminar tarea");
    return res.json();
}
