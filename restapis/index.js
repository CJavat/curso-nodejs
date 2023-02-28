const express = require("express");
const routes = require("./routes/index.routes");
// Crear el servidor
const app = express();

app.use("/", routes());

// Puerto
app.listen(3000, () => {
  console.log("Conectado al servidor");
});
