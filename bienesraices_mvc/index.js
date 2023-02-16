import express from "express";
import usuarioRoutes from "./routes/usuario.routes.js";
import db from "./config/db.js";

// Crear la app.
const app = express();

// Conexion a la DB.
try {
  await db.authenticate();
  console.log("Conexion Correcta");
} catch (error) {
  console.log(error);
}

// Habilitar pug
app.set("view engine", "pug");
app.set("views", "./views");

// Carpeta Publica.
app.use(express.static("public"));

// Routing.
app.use("/auth", usuarioRoutes);

// Definir un puerto y arrancar el proyecto.
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto: ${PORT}`);
});
