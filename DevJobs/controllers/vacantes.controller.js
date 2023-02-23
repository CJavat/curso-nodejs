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
  const nuevo = req.body.skills.split(",");
  vacante.skills = nuevo;

  // Alamacenar en la DB.
  const nuevaVacante = await vacante.save();

  // Redireccionar.
  res.redirect(`/vacantes/${nuevaVacante.url}`);
};

// Muestra una vacante.
const mostrarVacante = async (req, res, next) => {
  const vacante = await Vacante.findOne({ url: req.params.url });

  // Si no hay resultados.
  if (!vacante) return next();

  res.render("vacante", {
    vacante,
    nombrePagina: vacante.titulo,
    barra: true,
  });
};

module.exports = { formularioNuevaVacante, agregarVacante, mostrarVacante };
