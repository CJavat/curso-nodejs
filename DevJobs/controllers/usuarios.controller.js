const mongoose = require("mongoose");
const Usuarios = mongoose.model("Usuarios");

const formCrearCuenta = (req, res) => {
  res.render("crear-cuenta", {
    nombrePagina: "Crea tu cuenta de devJobs",
    tagline:
      "Comienza a publicar tus vacantes gratis, solo debes crear una cuenta",
  });
};

const validarRegistro = (req, res, next) => {
  // Sanitizar.
  req.sanitizeBody("nombre").escape();
  req.sanitizeBody("email").escape();
  req.sanitizeBody("password").escape();
  req.sanitizeBody("confirmar").escape();

  // Validar.
  req.checkBody("nombre", "El nombre es obligatorio").notEmpty();
  req.checkBody("email", "El email debe ser valido").isEmail();
  req.checkBody("password", "El password no debe estar vacio").notEmpty();
  req
    .checkBody("confirmar", "El password es diferente")
    .equals(req.body.password);

  const errores = req.validationErrors();
  if (errores) {
    // Si hay errores.
    req.flash(
      "error",
      errores.map((error) => error.msg)
    );

    res.render("crear-cuenta", {
      nombrePagina: "Crea tu cuenta en devJobs",
      tagline:
        "Comienza a publicar tus vacantes gratis, solo debes crear una cuenta",
      mensajes: req.flash(),
    });
    return;
  }

  // Si toda la validacion es correcta.
  next();
};

const crearUsuario = async (req, res, next) => {
  // Crear el nuevo usuario.
  const usuario = new Usuarios(req.body);

  try {
    await usuario.save();
    res.redirect("/iniciar-sesion");
  } catch (error) {
    console.log(error);
    req.flash("error", error);
    res.redirect("/crear-cuenta");
  }
};

// Formulario para iniciar sesión.
const formIniciarSesion = (req, res) => {
  res.render("iniciar-sesion", {
    nombrePagina: "Iniciar sesión, devJobs",
  });
};

module.exports = {
  formCrearCuenta,
  validarRegistro,
  crearUsuario,
  formIniciarSesion,
};