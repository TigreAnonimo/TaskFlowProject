import { obtenerTareas, crearTarea, actualizarTarea, eliminarTarea } from "./js/api.js";

let loading = false;
let error = null;
let tasks = [];

let list, totalCountEl, pendingCountEl, completedCountEl;

function mostrarError(mensaje) {
    const div = document.createElement("div");
    div.textContent = mensaje;
    div.style.background = "#ff4d4d";
    div.style.color = "white";
    div.style.padding = "10px";
    div.style.margin = "10px 0";
    div.style.borderRadius = "5px";
    div.style.textAlign = "center";
    div.style.fontWeight = "bold";

    document.body.prepend(div);

    setTimeout(() => div.remove(), 3000);
}

// -----------------------------
// RENDER UI
// -----------------------------
function renderUI() {
    list.innerHTML = "";

    if (loading) {
        list.innerHTML = "<p>Cargando tareas...</p>";
        return;
    }

    if (error) {
        list.innerHTML = `<p style="color:red;">${error}</p>`;
        return;
    }

    if (tasks.length === 0) {
        list.innerHTML = "<p>No hay tareas aún.</p>";
        return;
    }

    tasks.forEach(t => renderTask(t));
}

// -----------------------------
// RENDERIZAR TAREA
// -----------------------------
function renderTask(task) {
    const li = document.createElement("li");
    li.dataset.priority = task.priority;

    const borderColor = {
        alta: "green",
        media: "blue",
        baja: "red"
    }[task.priority];

    li.className =
      "flex justify-between items-center p-3 rounded-lg transition priority-animate";
    li.style.backgroundColor = "var(--bg-card)";
    li.style.color = "var(--text)";
    li.style.border = `2px solid ${borderColor}`;

    li.innerHTML = `
     <div class="flex flex-col">
        <span class="block mb-1">${task.text}</span>
        <small class="opacity-70 text-xs">Creada: ${task.createdAt}</small>
     </div>

      <div class="flex gap-2">
        <button class="completeBtn text-green-600 hover:text-green-800">✔</button>
        <button class="editBtn text-blue-600 hover:text-blue-800">Editar</button>
        <button class="deleteBtn text-red-600 hover:text-red-800">Eliminar</button>
      </div>
    `;

    const textEl = li.querySelector("span");

    // COMPLETAR
    li.querySelector(".completeBtn").addEventListener("click", async () => {
        task.completed = !task.completed;

        try {
            await actualizarTarea(task.id, { completed: task.completed });
            li.classList.toggle("opacity-50");
            textEl.style.textDecoration = task.completed ? "line-through" : "none";
            updateCounters();
        } catch {
            mostrarError("No se pudo completar la tarea.");
        }
    });

    // EDITAR
    li.querySelector(".editBtn").addEventListener("click", async () => {
        const nuevoTexto = prompt("Editar tarea:", task.text);

        if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
            task.text = nuevoTexto.trim();

            try {
                await actualizarTarea(task.id, { text: task.text });
                textEl.textContent = task.text;
            } catch {
                mostrarError("No se pudo actualizar la tarea.");
            }
        }
    });

    // ELIMINAR
    li.querySelector(".deleteBtn").addEventListener("click", async () => {
        try {
            await eliminarTarea(task.id);
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            updateCounters();
        } catch {
            mostrarError("No se pudo eliminar la tarea.");
        }
    });

    list.appendChild(li);
}

// -----------------------------
// CONTADORES
// -----------------------------
function updateCounters() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    totalCountEl.textContent = total;
    pendingCountEl.textContent = pending;
    completedCountEl.textContent = completed;
}

// -----------------------------
// CARGAR TAREAS DEL BACKEND
// -----------------------------
async function cargarTareasIniciales() {
    loading = true;
    error = null;
    renderUI();

    try {
        const data = await obtenerTareas();
        tasks = data;
    } catch {
        error = "No se pudieron cargar las tareas del servidor.";
    }

    loading = false;
    renderUI();
    updateCounters();
}

// -----------------------------
// DOMContentLoaded
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("taskInput");
    const addBtn = document.getElementById("addTaskBtn");
    list = document.getElementById("taskList");
    const themeToggle = document.getElementById("themeToggle");
    const prioritySelect = document.getElementById("prioritySelect");
    const filterButtons = document.querySelectorAll(".filterBtn");
    totalCountEl = document.getElementById("totalCount");
    pendingCountEl = document.getElementById("pendingCount");
    completedCountEl = document.getElementById("completedCount");
    const searchInput = document.getElementById("searchInput");
    const clearCompletedBtn = document.getElementById("clearCompletedBtn");
    const completeAllBtn = document.getElementById("completeAllBtn");

    cargarTareasIniciales();

    // CREAR TAREA
    addBtn.addEventListener("click", async () => {
        const text = input.value.trim();
        const priority = prioritySelect.value; // ahora coincide con backend

        if (text === "") return;

        try {
            const nueva = await crearTarea({
                text: text,
                priority: priority
            });

            nueva.createdAt = new Date().toLocaleDateString("es-ES");

            tasks.push(nueva);
            renderUI();
            updateCounters();
            input.value = "";

        } catch {
            mostrarError("No se pudo crear la tarea.");
        }
    });

    // MODO OSCURO
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    });

    // FILTROS
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;

            document.querySelectorAll("#taskList li").forEach(li => {
                if (filter === "all" || li.dataset.priority == filter) {
                    li.style.display = "flex";
                } else {
                    li.style.display = "none";
                }
            });
        });
    });

    // BUSCADOR
    searchInput.addEventListener("input", () => {
        const term = searchInput.value.toLowerCase();

        document.querySelectorAll("#taskList li").forEach(li => {
            const text = li.querySelector("span").textContent.toLowerCase();
            li.style.display = text.includes(term) ? "flex" : "none";
        });
    });

    // BORRAR COMPLETADAS
    clearCompletedBtn.addEventListener("click", async () => {
        const completadas = tasks.filter(t => t.completed);

        for (const t of completadas) {
            try {
                await eliminarTarea(t.id);
            } catch {
                mostrarError("Error eliminando tareas completadas.");
            }
        }

        tasks = tasks.filter(t => !t.completed);
        cargarTareasIniciales();
    });

    // COMPLETAR TODAS
    completeAllBtn.addEventListener("click", async () => {
        for (const t of tasks) {
            t.completed = true;
            try {
                await actualizarTarea(t.id, { completed: true });
            } catch {
                mostrarError("Error marcando todas como completadas.");
            }
        }

        cargarTareasIniciales();
    });
});
