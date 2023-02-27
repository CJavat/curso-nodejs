const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const router = require("./routes/index.routes");

//* CONFIGURACIÓN Y MODELOS DB.
const db = require("./config/db");
require("./models/usuarios.model");
db.sync()
  .then(() => console.log("DB CONECTADA CORRECTAMENTE."))
  .catch((error) => console.log("Ha ocurrido un error: ", error));

//* VARIABLES DE DESARROLLO.
require("dotenv").config({ path: "variables.env" });

//* APPLICACIÓN PRINCIPAL.
const app = express();

// BodyParser, leer formulario.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar EJS como TemplateEngines.
app.use(expressLayouts);
app.set("view engine", "ejs");

// Ubicación Vistas
app.set("views", path.join(__dirname, "./views"));

// Archivos estáticos.
app.use(express.static("public"));

// Habilitar CookieParser.
app.use(cookieParser());

// Crear la Sesión.
app.use(
  session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// Agrega Flash-Messages.
app.use(flash());

// Middleware (usuario logeado, flash messages, fecha actual)
app.use((req, res, next) => {
  res.locals.mensajes = req.flash;
  const fecha = new Date();
  res.locals.year = fecha.getFullYear();
  next();
});

// Routing
app.use("/", router());

app.listen(process.env.PORT, () => {
  console.log("El servidor está funcionando.");
});
