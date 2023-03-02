const Usuarios = require("../models/usuarios.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registrarUSuario = async (req, res, next) => {
  // Leer los datos del usuario y colocarlos en Usuarios.
  const usuario = new Usuarios(req.body);
  usuario.password = await bcrypt.hash(req.body.password, 12);

  try {
    await usuario.save();
    res.json({ mensaje: "Usuario Creado Correctamente." });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "Hubo un error al crear el usuario." });
  }
};

const autenticarUSuario = async (req, res, next) => {
  // Buscar el usuario.
  const { email, password } = req.body;
  const usuario = await Usuarios.findOne({ email });

  if (!usuario) {
    // Si el usuario no existe.
    await res.status(401).json({ mensaje: "El usuario no existe" });
    next();
  }
  // El usuario existe, buscar si es correcto o incorrecto
  if (!bcrypt.compareSync(password, usuario.password)) {
    // Si el password es incorrecto.
    await res.status(401).json({ mensaje: "El password es incorrecto" });
    next();
  } else {
    // Password correcto, firmar el token.
    const token = jwt.sign(
      { email: usuario.email, nombre: usuario.nombre, id: usuario.id },
      "LLAVESUPERSECRETA",
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  }
};

module.exports = {
  registrarUSuario,
  autenticarUSuario,
};
