// Devuelve una fecha en formato DD/MM/YYYY
export function formatDate(date) {
  const d = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(d.getTime())) {
    throw new Error("formatDate: fecha no válida");
  }

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

// Genera un ID único sencillo
export function generateId() {
  const random = Math.random().toString(36).substring(2, 10);
  const timestamp = Date.now().toString(36);
  return `${timestamp}-${random}`;
}

// Devuelve true si el valor se considera "vacío"
export function isEmpty(value) {
  if (value == null) return true; // null o undefined

  if (typeof value === "string") {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }

  return false;
}