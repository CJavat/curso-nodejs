const express = require("express");
const router = express.Router();
const {
  nuevoCliente,
  mostrarClientes,
  mostrarCliente,
  actualizarCliente,
  eliminarCliente,
} = require("../controllers/cliente.controller");

const {
  subirArchivo,
  nuevoProducto,
  mostrarProductos,
  mostrarProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productos.controller");

module.exports = function () {
  //! CLIENTES-----------------------
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

  //! PRODUCTOS-----------------------
  router.post("/productos", subirArchivo, nuevoProducto);

  // Muestra todos los productos.
  router.get("/productos", mostrarProductos);

  // Muestra un producto por su ID.
  router.get("/productos/:idProducto", mostrarProducto);

  // Actualizar un producto.
  router.put("/productos/:idProducto", subirArchivo, actualizarProducto);

  // Eliminar un producto.
  router.delete("/productos/:idProducto", eliminarProducto);

  return router;
};
