import app from "./src/index.js";
import swaggerDocs from "./src/swagger/swagger.js";

const PORT = process.env.PORT || 3000;

// Activar Swagger
swaggerDocs(app);

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
