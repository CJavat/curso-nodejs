import Precio from "../models/precio.model.js";
import Categoria from "../models/categoria.model.js";
import { validationResult } from "express-validator";

const admin = (req, res, next) => {
  res.render("propiedades/admin", {
    pagina: "Mis Propiedades",
    barra: true,
  });
};

// Formulario para crear una nueva propiedad.
const crear = async (req, res, next) => {
  // Consultar modelo de precio y categorias.
  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll(),
  ]);

  res.render("propiedades/crear", {
    pagina: "Crear Propiedad",
    csrfToken: req.csrfToken(),
    barra: true,
    categorias,
    precios,
  });
};

const guardar = async (req, res) => {
  // Validacion.
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    // Consultar modelo de precio y categorias.
    const [categorias, precios] = await Promise.all([
      Categoria.findAll(),
      Precio.findAll(),
    ]);

    res.render("propiedades/crear", {
      pagina: "Crear Propiedad",
      barra: true,
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      errores: resultado.array(),
    });
  }
};

export { admin, crear, guardar };
