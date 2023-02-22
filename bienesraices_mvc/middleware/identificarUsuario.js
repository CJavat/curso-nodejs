import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.model.js";

const identificarUsuario = async (req, res, next) => {
  // Identificar si hay token en las cookies.
  const token = req.cookies._token;
  if (!token) {
    req.usuario = null;
    next();
  }

  // Comprobar el token.
};

export default identificarUsuario;
