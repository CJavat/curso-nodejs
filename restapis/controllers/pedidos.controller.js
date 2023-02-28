const Pedidos = require("../models/pedidos.model");

const nuevoPedido = async (req, res, next) => {
  const pedido = new Pedidos(req.body);

  try {
    await pedido.save();
    res.json({ mensaje: "Se agregó un nuevo pedido." });
  } catch (error) {
    console.error(error);
    next();
  }
};

// Muestra todos los pedidos-
const mostrarPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedidos.find({}).populate("cliente").populate({
      path: "pedido.producto",
      model: "Productos",
    });

    res.json(pedidos);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Muestra un pedido por su ID.
const mostrarPedido = async (req, res, next) => {
  try {
    const pedido = await Pedidos.findById(req.params.idPedido)
      .populate("cliente")
      .populate({
        path: "pedido.producto",
        model: "Productos",
      });

    if (!pedido) {
      res.json({ mensaje: "Ese pedido no existe" });
      return next();
    }

    // Mostrar el pedido.
    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Actualizar un pedido por ID.
const actualizarPedido = async (req, res, next) => {
  try {
    let pedido = await Pedidos.findByIdAndUpdate(
      { _id: req.params.idPedido },
      req.body,
      { new: true }
    )
      .populate("cliente")
      .populate({
        path: "pedido.producto",
        model: "Productos",
      });

    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Eliminar pedido por ID.
const eliminarPedido = async (req, res, next) => {
  try {
    await Pedidos.findOneAndDelete({ _id: req.params.idPedido });

    res.json({ mensaje: "El pedido se ha eliminado." });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  nuevoPedido,
  mostrarPedidos,
  mostrarPedido,
  actualizarPedido,
  eliminarPedido,
};
