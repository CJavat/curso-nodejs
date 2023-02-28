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

module.exports = { nuevoPedido };
