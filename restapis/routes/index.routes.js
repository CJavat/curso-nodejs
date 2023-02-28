const express = require("express");
const router = express.Router();
const {
  nuevoCliente,
  mostrarClientes,
  mostrarCliente,
  actualizarCliente,
  eliminarCliente,
} = require("../controllers/cliente.controller");

module.exports = function () {
  // Agregar nuevos clientes via POST.
  router.post("/clientes", nuevoCliente);

  // Obtener todos los clientes.
  router.get("/clientes", mostrarClientes);

  // Obtener un cliente.
  router.get("/clientes/:idCliente", mostrarCliente);

  // Actualizar Cliente.
  router.put("/clientes/:idCliente", actualizarCliente);

  // Eliminar Cliente.
  router.delete("/clientes/:idCliente", eliminarCliente);

  return router;
};
