const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const router = require("./routes/index.routes");

const app = express();

// Habilitar handlebars como view.
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "layout",
  })
);
app.set("view engine", "handlebars");

// Static Files.
app.use(express.static(path.join(__dirname, "public")));

app.use("/", router());

app.listen(5000);
