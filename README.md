# 📌 TaskFlow — Gestor de Tareas con Prioridades

TaskFlow es una aplicación web diseñada para gestionar tareas de forma sencilla, visual y eficiente.  
Permite añadir, editar, eliminar, completar y filtrar tareas según su prioridad.  
Incluye modo oscuro, buscador, contadores dinámicos y almacenamiento local.

---

## 🚀 Tecnologías utilizadas
- **HTML5**
- **CSS3 + Tailwind**
- **JavaScript**
- **LocalStorage**

---

# 🧩 Funcionalidades principales

### ✔ Añadir tareas
Permite crear nuevas tareas indicando un texto y una prioridad (Alta, Media o Baja).

### ✔ Editar tareas
Puedes modificar el texto de una tarea ya creada mediante un cuadro de diálogo.

### ✔ Eliminar tareas
Elimina una tarea de forma permanente tanto del DOM como del LocalStorage.

### ✔ Completar tareas
Marca una tarea como completada, aplicando:
- Opacidad reducida  
- Texto tachado  
- Actualización de contadores  

### ✔ Marcar todas como completadas
Botón que completa **todas** las tareas de una sola vez.

### ✔ Borrar tareas completadas
Elimina únicamente las tareas que ya están marcadas como completadas.

### ✔ Filtros por prioridad
Muestra solo las tareas de prioridad:
- Alta  
- Media  
- Baja  
- Todas  

### ✔ Buscador en tiempo real
Filtra tareas según el texto que escribas.

### ✔ Contadores dinámicos
Muestra:
- Total de tareas  
- Pendientes  
- Completadas  

### ✔ Modo oscuro
Cambia entre modo claro y oscuro, guardando la preferencia del usuario.

### ✔ Guardado automático
Todas las tareas se guardan en **LocalStorage**, por lo que no se pierden al recargar la página.

---

# 🎛️ Explicación de cada botón

## 🔵 Botón **"Añadir"**
Crea una nueva tarea con:
- Texto introducido  
- Prioridad seleccionada  
- Fecha de creación  
- Estado inicial: pendiente  

## 🟢 Botón **"✔" (Completar tarea)**
Alterna entre:
- Completada → opacidad + tachado  
- Pendiente → estilo normal  

Actualiza LocalStorage y contadores.

## 🔵 Botón **"Editar"**
Abre un `prompt` para cambiar el texto de la tarea.

## 🔴 Botón **"Eliminar"**
Borra la tarea del DOM y del LocalStorage.

## 🟥 Botón **"Borrar completadas"**
Elimina **solo** las tareas que ya están completadas.

## 🟦 Botón **"Marcar todas"**
Marca todas las tareas como completadas de golpe.

## 🌙 / ☀️ Botón **Modo oscuro**
Cambia entre modo claro y oscuro.  
Guarda la preferencia en LocalStorage.

## 🎚️ Botones de filtro (Todas / Alta / Media / Baja)
Muestran únicamente las tareas de la prioridad seleccionada.

---

# 🧱 Explicación de cada sección de la página

## 🧭 **Header**
- Título de la aplicación  
- Botón de modo oscuro  

## 📝 **Sección de presentación**
Pequeño texto introductorio con estilo profesional.

## 🎛️ **Barra de filtros**
Botones para filtrar tareas por prioridad.

## 🔍 **Buscador**
Campo de texto que filtra tareas en tiempo real.

## 📊 **Resumen de tareas**
Muestra:
- Total  
- Pendientes  
- Completadas  

## ➕ **Zona de creación de tareas**
Incluye:
- Input de texto  
- Selector de prioridad  
- Botón “Añadir”  

## 📋 **Lista de tareas**
Cada tarea incluye:
- Texto  
- Fecha  
- Botones: completar, editar, eliminar  
- Color según prioridad  

## 🧹 **Botones globales**
- Borrar completadas  
- Marcar todas  

## 📎 **Footer**
Información del proyecto.

---

# 🧭 Cómo usar la aplicación

1. Escribe una tarea en el campo de texto.  
2. Selecciona una prioridad.  
3. Pulsa **Añadir**.  
4. Usa los filtros o el buscador para organizarte.  
5. Marca tareas como completadas o elimínalas.  
6. Usa los botones globales para gestionar grandes cantidades.  
7. Cambia entre modo claro y oscuro cuando quieras.

---

# 🧩 Nueva versión: Migración a Backend + API REST

La aplicación evolucionó de un sistema basado en **LocalStorage** a una arquitectura **Full Stack** con backend real.

## 🚀 URLs en Producción

### **Frontend**
https://task-flow-project-chi.vercel.app/

### **Backend**
https://taskflow-backend-h758jxgl7-tigreanonimos-projects.vercel.app

---

# 🏗️ Arquitectura del Backend

El backend está construido con **Node.js + Express** siguiendo una arquitectura por capas:

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
