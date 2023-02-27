const Usuarios = require("../models/usuarios.model");
const enviarEmail = require("../handlers/emails");

const formCrearCuenta = (req, res) => {
  res.render("crear-cuenta", {
    nombrePagina: "Crear Cuenta",
  });
};

const crearNuevaCuenta = async (req, res) => {
  const usuario = req.body;

  try {
    await Usuarios.create(usuario);

    // URL de confirmacion.
    const url = `http://${req.headers.host}/confirmar-cuenta/${usuario.email}`;

    // Enviar email de confirmacion.
    await enviarEmail.enviarEmail({
      usuario,
      url,
      subject: "Confirma tu cuenta de Meeti",
      archivo: "confirmar-cuenta",
      secure: true,
    });

    console.log("Exito", "Hemos enviado un email, confirma tu cuenta.");
    res.redirect("/iniciar-sesion");
  } catch (error) {
    console.log(error);
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
