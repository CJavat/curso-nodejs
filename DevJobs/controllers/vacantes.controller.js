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

  // Usuario autor de la vacante.
  vacante.autor = req.user._id;

  // Crear arreglo de skills.
  const nuevos = req.body.skills.split(",");
  const skillsSeparados = nuevos.map((nuevo) => {
    return nuevo.trim();
  });

  vacante.skills = skillsSeparados;

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

const formEditarVacante = async (req, res, next) => {
  const vacante = await Vacante.findOne({ url: req.params.url });

  if (!vacante) return next();

  res.render("editarVacante", {
    vacante,
    nombrePagina: `Editar - ${vacante.titulo}`,
  });
};

const editarVacante = async (req, res, next) => {
  const vacanteActualizada = req.body;
  vacanteActualizada.skills = req.body.skills.split(",");
  const skillsSeparados = vacanteActualizada.skills.map((nuevo) => {
    return nuevo.trim();
  });
  vacanteActualizada.skills = skillsSeparados;
  console.log(vacanteActualizada);

  const vacante = await Vacante.findOneAndUpdate(
    { url: req.params.url },
    vacanteActualizada,
    {
      new: true,
      runValidators: true,
    }
  );

  res.redirect(`/vacantes/${vacante.url}`);
};

module.exports = {
  formularioNuevaVacante,
  agregarVacante,
  mostrarVacante,
  formEditarVacante,
  editarVacante,
};
