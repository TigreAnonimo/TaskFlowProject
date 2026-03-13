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

    let tasks = [];

    // Cargar tareas guardadas
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = saved;
    saved.forEach(task => renderTask(task));
    updateCounters();

    // Modo oscuro
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
        themeToggle.textContent = "☀️";
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

        let borderColor = {
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
            <button class="deleteBtn text-red-600 hover:text-red-800">Eliminar</button>
          </div>
        `;

        // Estilo si está completada
        if (task.completed) {
            li.classList.add("opacity-50");
            li.querySelector("span").classList.add("line-through");
        }

        // Completar tarea
        li.querySelector(".completeBtn").addEventListener("click", () => {
            task.completed = !task.completed;

            li.classList.toggle("opacity-50");
            li.querySelector("span").classList.toggle("line-through");

            localStorage.setItem("tasks", JSON.stringify(tasks));
            updateCounters();
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

    // Filtros
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
});
