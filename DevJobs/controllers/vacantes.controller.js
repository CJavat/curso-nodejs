const mongoose = require("mongoose");
const Vacante = mongoose.model("Vacante");

const formularioNuevaVacante = (req, res) => {
  res.render("nueva-vacante", {
    nombrePagina: "Nueva Vacante",
    tagline: "Llena el formulario y publica tu vacante",
  });
};

// Agregar las vacantes a la base de datos.
const agregarVacante = async (req, res) => {
  const vacante = new Vacante(req.body);

  // Crear arreglo de skills.
  vacante.skills = req.body.skills.split(",");

  // Alamacenar en la DB.
  const nuevaVacante = await vacante.save();

  // Redireccionar.
  res.redirect(`/vacantes/${nuevaVacante.url}`);
};

module.exports = { formularioNuevaVacante, agregarVacante };
