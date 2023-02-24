const express = require("express");
const router = express.Router();
const { mostrarTrabajos } = require("../controllers/home.controller");
const {
  formularioNuevaVacante,
  agregarVacante,
  mostrarVacante,
  formEditarVacante,
  editarVacante,
} = require("../controllers/vacantes.controller");

const {
  formCrearCuenta,
  validarRegistro,
  crearUsuario,
} = require("../controllers/usuarios.controller");

module.exports = () => {
  router.get("/", mostrarTrabajos);

  // Crear Vacantes.
  router.get("/vacantes/nueva", formularioNuevaVacante);
  router.post("/vacantes/nueva", agregarVacante);

  // Mostrar vacante.
  router.get("/vacantes/:url", mostrarVacante);

  // Editar vacante.
  router.get("/vacantes/editar/:url", formEditarVacante);
  router.post("/vacantes/editar/:url", editarVacante);

  // Crear cuentas
  router.get("/crear-cuenta", formCrearCuenta);
  router.post("/crear-cuenta", validarRegistro, crearUsuario);

  return router;
};
