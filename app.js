import { formatDate, generateId, isEmpty } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("taskInput");
    const addBtn = document.getElementById("addTaskBtn");
    const list = document.getElementById("taskList");
    const themeToggle = document.getElementById("themeToggle");
    const prioritySelect = document.getElementById("prioritySelect");
    const filterButtons = document.querySelectorAll(".filterBtn");
    const totalCountEl = document.getElementById("totalCount");
    const pendingCountEl = document.getElementById("pendingCount");
    const completedCountEl = document.getElementById("completedCount");
    const searchInput = document.getElementById("searchInput");
    const clearCompletedBtn = document.getElementById("clearCompletedBtn");
    const completeAllBtn = document.getElementById("completeAllBtn");

    searchInput.addEventListener("input", applySearchFilter);

    let tasks = [];

    // Cargar tareas guardadas
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = saved;
    saved.forEach(task => renderTask(task));
    updateCounters();

    // Buscador
    function applySearchFilter() {
        const text = searchInput.value.toLowerCase();
    
        document.querySelectorAll("#taskList li").forEach(li => {
            const taskText = li.querySelector("span").textContent.toLowerCase();
            li.style.display = taskText.includes(text) ? "flex" : "none";
        });
    }

    // Modo oscuro
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }

    themeToggle.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");

        if (document.documentElement.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙";
        }
    });

    // Crear tarea
    addBtn.addEventListener("click", () => {
        const text = input.value.trim();
        const priority = prioritySelect.value;

        if (isEmpty(text)) return;

        const task = {
            id: generateId(),
            text,
            priority,
            createdAt: formatDate(new Date()),
            completed: false
        };

        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        renderTask(task);
        updateCounters();
        input.value = "";
    });

    // Actualizar contadores
    function updateCounters() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;

        if (totalCountEl) totalCountEl.textContent = total;
        if (pendingCountEl) pendingCountEl.textContent = pending;
        if (completedCountEl) completedCountEl.textContent = completed;
    }

    // Renderizar tarea
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
            <span>${task.text}</span>
            <small class="opacity-70 text-xs">Creada: ${task.createdAt}</small>
          </div>

          <div class="flex gap-2">
            <button class="completeBtn text-green-600 hover:text-green-800">✔</button>
            <button class="editBtn text-blue-600 hover:text-blue-800">Editar</button>
            <button class="deleteBtn text-red-600 hover:text-red-800">Eliminar</button>
          </div>
        `;

        const taskTextEl = li.querySelector("span");

        // Estilo si está completada
        if (task.completed) {
            li.classList.add("opacity-50");
            taskTextEl.style.textDecoration = "line-through";
        }

        // Completar tarea
        li.querySelector(".completeBtn").addEventListener("click", () => {
            task.completed = !task.completed;

            li.classList.toggle("opacity-50");
            taskTextEl.style.textDecoration = task.completed ? "line-through" : "none";

            localStorage.setItem("tasks", JSON.stringify(tasks));
            updateCounters();
        });

        // Editar tarea
        li.querySelector(".editBtn").addEventListener("click", () => {
            const newText = prompt("Editar tarea:", task.text);

            if (newText !== null && newText.trim() !== "") {
                task.text = newText.trim();
                taskTextEl.textContent = task.text;

                localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        });

        // Eliminar tarea
        li.querySelector(".deleteBtn").addEventListener("click", () => {
            li.remove();
            tasks = tasks.filter(t => t.id !== task.id);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            updateCounters();
        });

        list.appendChild(li);
    }

    // Filtros por prioridad
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;

            document.querySelectorAll("#taskList li").forEach(li => {
                if (filter === "all" || li.dataset.priority === filter) {
                    li.style.display = "flex";
                } else {
                    li.style.display = "none";
                }
            });
        });
    });

    // Borrar todas las tareas completadas
    clearCompletedBtn.addEventListener("click", () => {
        document.querySelectorAll("#taskList li.opacity-50").forEach(li => li.remove());
        tasks = tasks.filter(t => !t.completed);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateCounters();
    });

    // Marcar TODAS las tareas como completadas
    completeAllBtn.addEventListener("click", () => {
        tasks.forEach(task => task.completed = true);

        document.querySelectorAll("#taskList li").forEach(li => {
            li.classList.add("opacity-50");
            li.querySelector("span").style.textDecoration = "line-through";
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateCounters();
    });

}); // ← Cierre correcto del DOMContentLoaded
