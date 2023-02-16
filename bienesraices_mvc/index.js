import express from "express";
import usuarioRoutes from "./routes/usuario.routes.js";
// Crear la app.
const app = express();

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
