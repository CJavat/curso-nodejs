const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

const router = require("./routes/index.routes");

require("dotenv").config({ path: "variables.env" });

const app = express();

// Habilitar EJS como TemplateEngines.
app.use(expressLayouts);
app.set("view engine", "ejs");

// Ubicación Vistas
app.set("views", path.join(__dirname, "./views"));

// Archivos estáticos.
app.use(express.static("public"));

// Middleware (usuario logeado, flash messages, fecha actual)
app.use((req, res, next) => {
  const fecha = new Date();
  res.locals.year = fecha.getFullYear();
  next();
});

// Routing
app.use("/", router());

app.listen(process.env.PORT, () => {
  console.log("El servidor está funcionando.");
});
