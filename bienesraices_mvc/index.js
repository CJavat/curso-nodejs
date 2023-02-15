import express from "express";
import usuarioRoutes from "./routes/usuario.routes.js";
// Crear la app.
const app = express();

// Routing.
app.use("/", usuarioRoutes);

// Definir un puerto y arrancar el proyecto.
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto: ${PORT}`);
});
