import { check, validationResult } from "express-validator";
import Usuario from "../models/usuario.model.js";
import { generarId } from "../helpers/tokens.js";
import { emailRegistro } from "../helpers/emails.js";

const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar Sesion",
  });
};

const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear Cuenta",
    csrfToken: req.csrfToken(),
  });
};

const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recupera tu acceso a BienesRaices",
  });
};

const registrar = async (req, res) => {
  // Validación.
  await check("nombre")
    .notEmpty()
    .withMessage("El nombre no puede ir vacío.")
    .run(req);
  await check("email").isEmail().withMessage("El email no es válido.").run(req);
  await check("password")
    .isLength({ min: 6 })
    .withMessage("El password debe ser de al menos 6 caracteres.")
    .run(req);
  await check("repetir-password")
    .equals(req.body.password)
    .withMessage("Lo passwords no son iguales.")
    .run(req);

  let resultado = validationResult(req);

  // Verificar que el resultado esté vacío.
  if (!resultado.isEmpty()) {
    // Errores.
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      errores: resultado.array(),
      csrfToken: req.csrfToken(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }
  // Extraer los datos.
  const { nombre, email, password } = req.body;

  // Verificar que el usuario no esté duplicado.
  const existeUsuario = await Usuario.findOne({
    where: { email },
  });
  if (existeUsuario) {
    // Errores.
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      errores: [{ msg: "El usuario ya esta registrado" }],
      csrfToken: req.csrfToken(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }
  // Almacenar un usuario.
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId(),
  });

  // Envia email de confirmacion.
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  // Mostrar mensaje de confirmacion.
  res.render("templates/mensaje", {
    pagina: "Cuenta Creada Correctamente",
    mensaje: "Hemos enviado un email de confirmacion, presiona en el enlace.",
  });
};

// Funcion que comprueba una cuenta.
const confirmar = async (req, res, next) => {
  const { token } = req.params;

  // Verificar si el token es valido.
  const usuario = await Usuario.findOne({ where: { token } });

  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Error al confirmar la cuenta",
      mensaje: "Hubo un error al confirmar tu cuenta, intenta de nuevo.",
      error: true,
    });
  }

  // Confirmar la cuenta
  usuario.token = null;
  usuario.confirmado = true;

  await usuario.save();
  res.render("auth/confirmar-cuenta", {
    pagina: "Cuenta Confirmada",
    mensaje: "La cuenta se confirmo correctamente.",
    error: false,
  });
};

export {
  formularioLogin,
  formularioRegistro,
  formularioOlvidePassword,
  registrar,
  confirmar,
};
