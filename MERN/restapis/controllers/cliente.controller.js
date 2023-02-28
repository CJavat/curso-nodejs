const Clientes = require("../models/clientes.model");

const nuevoCliente = async (req, res) => {
  const cliente = new Clientes(req.body);

  try {
    // Almacenar registro.
    await cliente.save();

    // Enviar respuesta.
    res.status(200).json({ mensaje: "Se agregó un nuevo cliente" });
  } catch (error) {
    // Si hay un error...
    console.error(error);
    next();
  }
};

// Muestra todos los clientes.
const mostrarClientes = async (req, res) => {
  try {
    // Obtener todos los clientes.
    const clientes = await Clientes.find();

    // Enviar respuesta.
    res.status(200).json(clientes);
  } catch (error) {
    // Si hay un error...
    console.error(error);
    next();
  }
};

// Muestra un cliente por su ID.
const mostrarCliente = async (req, res) => {
  const cliente = await Clientes.findById(req.params.idCliente);

  if (!cliente) {
    res.json({ mensaje: "El cliente no existe" });
    next();
  }

  // Mostrar el cliente.
  res.json(cliente);
};

// Actualizar un cliente.
const actualizarCliente = async (req, res) => {
  try {
    const cliente = await Clientes.findByIdAndUpdate(
      { _id: req.params.idCliente },
      req.body,
      { new: true }
    );

    // Mostrar el cliente.
    res.json(cliente);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Eliminar cliente por su id.
const eliminarCliente = async (req, res) => {
  try {
    await Clientes.findByIdAndDelete({ _id: req.params.idCliente });

    // Mostrar el cliente.
    res.json({ mensaje: "El cliente se ha eliminado." });
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = {
  nuevoCliente,
  mostrarClientes,
  mostrarCliente,
  actualizarCliente,
  eliminarCliente,
};
