const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

mongoose.connection.on("error", (error) => {
  console.log(error);
});

// Importar los modelos.
require("../models/Usuarios.model");
require("../models/Vacantes.model");
