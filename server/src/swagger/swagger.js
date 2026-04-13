import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TaskFlow API",
      version: "1.0.0",
      description: "Documentación de la API para gestionar tareas",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/api/*.js"], // Ajusta si tus rutas están en otro sitio
};

const swaggerSpec = swaggerJsdoc(options);

export default function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
