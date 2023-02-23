const express = require("express");
const router = express.Router();
const { mostrarTrabajos } = require("../controllers/home.controller");
const {
  formularioNuevaVacante,
  agregarVacante,
  mostrarVacante,
} = require("../controllers/vacantes.controller");

module.exports = () => {
  router.get("/", mostrarTrabajos);

  // Crear Vacantes.
  router.get("/vacantes/nueva", formularioNuevaVacante);
  router.post("/vacantes/nueva", agregarVacante);

  // Mostrar vacante.
  router.get("/vacantes/:url", mostrarVacante);

  return router;
};
