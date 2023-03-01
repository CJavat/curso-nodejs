const express = require("express");
const routes = require("./routes/index.routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// CORS permite que un cliente se conecte a otro servidor para el intercambio de recursos.
const cors = require("cors");

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

// Habilitar BodyParser.
app.use(bodyParser.json());
false;
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar CORS.
app.use(cors());

app.use("/", routes());

// Puerto
app.listen(3030, () => {
  console.log("Conectado al servidor en el puerto: 3030");
});
