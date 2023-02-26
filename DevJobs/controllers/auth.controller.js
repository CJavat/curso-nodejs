const passport = require("passport");
const mongoose = require("mongoose");
const Vacante = mongoose.model("Vacante");

const autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/administracion",
  failureRedirect: "/iniciar-sesion",
  failureFlash: true,
  badRequestMessage: "Todos los campos son obligatorios",
});

// Revisar si el usuario esta autenticado o no, redireccionarlo.
const verificarUsuario = (req, res, next) => {
  // Revisar el usuario.
  if (req.isAuthenticated()) {
    return next(); // Estan autenticados
  }

  // Redireccionar.
  res.redirect("/iniciar-sesion");
};

const mostrarPanel = async (req, res) => {
  // Consultar el usuario autenticado.
  const vacantes = await Vacante.find({ autor: req.user._id });

  res.render("administracion", {
    nombrePagina: "Panel de Administración",
    tagLine: "Crea y Administra tus vacantes desde aquí",
    cerrarSesion: true,
    nombre: req.user.nombre,
    imagen: req.user.imagen,
    vacantes,
  });
};

const cerrarSesion = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("correcto", "Cerraste Sesión Correctamente");
    return res.redirect("/iniciar-sesion");
  });
};

module.exports = {
  autenticarUsuario,
  verificarUsuario,
  mostrarPanel,
  cerrarSesion,
};
