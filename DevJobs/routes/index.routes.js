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
  formIniciarSesion,
} = require("../controllers/usuarios.controller");

const {
  autenticarUsuario,
  verificarUsuario,
  mostrarPanel,
} = require("../controllers/auth.controller");

module.exports = () => {
  router.get("/", mostrarTrabajos);

  // Crear Vacantes.
  router.get("/vacantes/nueva", verificarUsuario, formularioNuevaVacante);
  router.post("/vacantes/nueva", verificarUsuario, agregarVacante);

  // Mostrar vacante.
  router.get("/vacantes/:url", mostrarVacante);

  // Editar vacante.
  router.get("/vacantes/editar/:url", verificarUsuario, formEditarVacante);
  router.post("/vacantes/editar/:url", verificarUsuario, editarVacante);

  // Crear cuentas
  router.get("/crear-cuenta", formCrearCuenta);
  router.post("/crear-cuenta", validarRegistro, crearUsuario);

  // Autenticar Usuarios.
  router.get("/iniciar-sesion", formIniciarSesion);
  router.post("/iniciar-sesion", autenticarUsuario);

  // Panel de administración.
  router.get("/administracion", verificarUsuario, mostrarPanel);

  return router;
};
