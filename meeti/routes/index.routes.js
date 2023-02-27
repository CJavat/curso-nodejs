const express = require("express");
const router = express.Router();

//! CONTROLLERS
const { home } = require("../controllers/home.controller");

const {
  formCrearCuenta,
  crearNuevaCuenta,
  formIniciarSesion,
} = require("../controllers/usuariosController");

//* ENDPOINTS
module.exports = function () {
  router.get("/", home);

  router.get("/crear-cuenta", formCrearCuenta);
  router.post("/crear-cuenta", crearNuevaCuenta);

  // Iniciar Sesión.
  router.get("/iniciar-sesion", formIniciarSesion);
  return router;
};
