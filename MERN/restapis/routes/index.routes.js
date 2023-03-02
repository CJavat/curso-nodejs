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

const {
  registrarUSuario,
  autenticarUSuario,
} = require("../controllers/usuarios.controller");

//* MIDDLEWARE para proteger las rutas.
const auth = require("../middlewares/auth");

module.exports = function () {
  //! CLIENTES-----------------------
  // Agregar nuevos clientes via POST.
  router.post("/clientes", auth, nuevoCliente);

  // Obtener todos los clientes.
  router.get("/clientes", auth, mostrarClientes);

  // Obtener un cliente.
  router.get("/clientes/:idCliente", auth, mostrarCliente);

  // Actualizar Cliente.
  router.put("/clientes/:idCliente", auth, actualizarCliente);

  // Eliminar Cliente.
  router.delete("/clientes/:idCliente", auth, eliminarCliente);

  //! PRODUCTOS-----------------------
  router.post("/productos", auth, subirArchivo, nuevoProducto);

  // Muestra todos los productos.
  router.get("/productos", auth, mostrarProductos);

  // Muestra un producto por su ID.
  router.get("/productos/:idProducto", auth, mostrarProducto);

  // Actualizar un producto.
  router.put("/productos/:idProducto", auth, subirArchivo, actualizarProducto);

  // Eliminar un producto.
  router.delete("/productos/:idProducto", auth, eliminarProducto);

  // Busqueda de productos.
  router.post("/productos/busqueda/:query", auth, buscarProducto);

  //! PEDIDOS-----------------------
  // Agrega nuevos pedidos.
  router.post("/pedidos/nuevo/:idUsuario", auth, nuevoPedido);

  // Mostrat todos los pedidos
  router.get("/pedidos", auth, mostrarPedidos);

  // Mostrar un pedido por su ID.
  router.get("/pedidos/:idPedido", auth, mostrarPedido);

  // Actualizar pedidos.
  router.put("/pedidos/:idPedido", auth, actualizarPedido);

  // Eliminar pedido.
  router.delete("/pedidos/:idPedido", auth, eliminarPedido);

  //! CREAR CUENTAS-----------------------
  router.post("/crear-cuenta", registrarUSuario);

  router.post("/iniciar-sesion", autenticarUSuario);

  return router;
};
