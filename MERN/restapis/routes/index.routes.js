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
  buscarProducto,
} = require("../controllers/productos.controller");

const {
  nuevoPedido,
  mostrarPedidos,
  mostrarPedido,
  actualizarPedido,
  eliminarPedido,
} = require("../controllers/pedidos.controller");

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

  // Busqueda de productos.
  router.post("/productos/busqueda/:query", buscarProducto);

  //! PEDIDOS-----------------------
  // Agrega nuevos pedidos.
  router.post("/pedidos", nuevoPedido);

  // Mostrat todos los pedidos
  router.get("/pedidos", mostrarPedidos);

  // Mostrar un pedido por su ID.
  router.get("/pedidos/:idPedido", mostrarPedido);

  // Actualizar pedidos.
  router.put("/pedidos/:idPedido", actualizarPedido);

  // Eliminar pedido.
  router.delete("/pedidos/:idPedido", eliminarPedido);

  return router;
};
