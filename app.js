document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("taskInput");
    const addBtn = document.getElementById("addTaskBtn");
    const list = document.getElementById("taskList");
    const themeToggle = document.getElementById("themeToggle");
    const prioritySelect = document.getElementById("prioritySelect");
    const filterButtons = document.querySelectorAll(".filterBtn");

    console.log("JS cargado correctamente");

    // -------------------------
    // MODO OSCURO MANUAL
    // -------------------------
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

    // -------------------------
    // CREAR TAREA CON PRIORIDAD + ANIMACIÓN
    // -------------------------
    addBtn.addEventListener("click", () => {
        const text = input.value.trim();
        const priority = prioritySelect.value;

        if (text === "") return;

        const li = document.createElement("li");
        li.dataset.priority = priority;

        let borderColor = {
            alta: "green",
            media: "blue",
            baja: "red"
        }[priority];

        li.className =
          "flex justify-between items-center p-3 rounded-lg transition";
        li.style.backgroundColor = "var(--bg-card)";
        li.style.color = "var(--text)";
        li.style.border = `2px solid ${borderColor}`;

        // ⭐ ANIMACIÓN DE SUSPENSO
        li.classList.add("priority-animate");

        li.innerHTML = `
          <span>${text}</span>
          <button class="text-red-600 hover:text-red-800">Eliminar</button>
        `;

        li.querySelector("button").addEventListener("click", () => {
          li.remove();
        });

        list.appendChild(li);
        input.value = "";
    });

    // -------------------------
    // FILTROS
    // -------------------------
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
