const express = require("express");
const router = express.Router();

//! CONTROLLERS
const { home } = require("../controllers/home.controller");

const { formCrearCuenta } = require("../controllers/usuariosController");

//* ENDPOINTS
module.exports = function () {
  router.get("/", home);

  router.get("/crear-cuenta", formCrearCuenta);

  return router;
};
