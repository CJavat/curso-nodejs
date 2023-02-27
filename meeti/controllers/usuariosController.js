const Usuarios = require("../models/usuarios.model");

const formCrearCuenta = (req, res) => {
  res.render("crear-cuenta", {
    nombrePagina: "Crear Cuenta",
  });
};

const crearNuevaCuenta = async (req, res) => {
  const usuario = req.body;

  try {
    const nuevoUsuario = await Usuarios.create(usuario);

    req.flash("Exito", "Hemos enviado un email, confirma tu cuenta.");
    res.redirect("/iniciar-sesion");
  } catch (error) {
    let erroresSequelize = error.errors.map((err) => err.message);

    if (erroresSequelize.length === 0)
      erroresSequelize = parseInt(erroresSequelize);

    console.log(erroresSequelize);
    req.flash("error", erroresSequelize);
    res.redirect("/crear-cuenta");
  }
};

// Formulario Iniciar Sesión.
const formIniciarSesion = (req, res) => {
  res.render("iniciar-sesion", {
    nombrePagina: "Iniciar Sesión",
  });
};

module.exports = { formCrearCuenta, crearNuevaCuenta, formIniciarSesion };
