const mongoose = require("mongoose");
require("./config/db");
const express = require("express");
const handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const path = require("path");
const router = require("./routes/index.routes");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const flash = require("connect-flash");

require("dotenv").config({ path: "variables.env" });

const app = express();

// Habilitar bodyParser.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Validacion de campos.
app.use(expressValidator());

// Habilitar handlebars como view.
app.engine(
  "handlebars",
  exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    defaultLayout: "layout",
    helpers: require("./helpers/handlebars"),
  })
);

app.set("view engine", "handlebars");

// Static Files.
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE }),
  })
);

// Alertas y flash messages.
app.use(flash());

// Crear nuestro middleware.
app.use((req, res, next) => {
  res.locals.mensajes = req.flash();
  next();
});

app.use("/", router());

app.listen(process.env.PUERTO);
