let tasks = [];
let currentId = 1;

export const taskService = {
  obtenerTodas() {
    return tasks;
  },

  crearTarea(data) {
    const prioridadTexto = {
      1: "alta",
      2: "media",
      3: "baja"
    };

    const nueva = {
      id: currentId++,
      text: data.titulo,
      priority: prioridadTexto[data.prioridad] || "media",
      completed: false,
      createdAt: new Date().toLocaleDateString("es-ES")
    };

    tasks.push(nueva);
    return nueva;
  },

  actualizarTarea(id, datos) {
    const tarea = tasks.find(t => t.id === id);
    if (!tarea) throw new Error("NOT_FOUND");

    if (datos.text !== undefined) tarea.text = datos.text;
    if (datos.completed !== undefined) tarea.completed = datos.completed;

    return tarea;
  },

  eliminarTarea(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error("NOT_FOUND");
    tasks.splice(index, 1);
  }
};
