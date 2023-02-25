const passport = require("passport");

const autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/administracion",
  failureRedirect: "/iniciar-sesion",
  failureFlash: true,
  badRequestMessage: "Todos los campos son obligatorios",
});

module.exports = { autenticarUsuario };
