import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
  throw new Error("Falta la variable de entorno PORT");
}
