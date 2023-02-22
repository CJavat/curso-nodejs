const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home.controller");
const {
  formularioNuevaVacante,
} = require("../controllers/vacantes.controller");

module.exports = () => {
  router.get("/", homeController.mostrarTrabajos);

  // Crear Vacantes.
  router.get("/vacantes/nueva", formularioNuevaVacante);

  return router;
};
