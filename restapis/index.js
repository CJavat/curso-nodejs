const express = require("express");
const routes = require("./routes/index.routes");
const mongoose = require("mongoose");

// Conectar Mongo.
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://root:root@fsociety.1mrzupj.mongodb.net/restapis",
  {
    useNewUrlParser: true,
  }
);
// Crear el servidor
const app = express();

app.use("/", routes());

// Puerto
app.listen(3000, () => {
  console.log("Conectado al servidor");
});
