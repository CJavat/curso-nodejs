import { check, validationResult } from "express-validator";
import Usuario from "../models/usuario.model.js";

const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar Sesion",
  });
};

const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear Cuenta",
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
  await check("password")
    .equals("password")
    .withMessage("Los passwords no son iguales.")
    .run(req);

  let resultado = validationResult(req);

  // Verificar que el resultado esté vacío.
  if (!resultado.isEmpty()) {
    // Errores.
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      errores: resultado.array(),
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
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  const usuario = await Usuario.create(req.body);

  res.json(usuario);

  console.log();
};

export {
  formularioLogin,
  formularioRegistro,
  formularioOlvidePassword,
  registrar,
};
