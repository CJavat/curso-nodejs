const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Autorización por el Header.
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("No autenticado, no hay JWT");
    error.statusCode = 401;
    throw error;
  }

  // Obtener el token y verificarlo.
  const token = authHeader.split("")[1];
  let revisarToken;
  try {
    //! REVISAR ÉSTE ERROR. jwf malformed.
    revisarToken = jwt.verify(token, "LLAVESUPERSECRETA");
    console.log(revisarToken);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  // Si es un token válido pero hay un error...
  if (!revisarToken) {
    const error = new Error("No Autenticado");
    error.statusCode = 401;
    throw error;
  }

  next();
};
