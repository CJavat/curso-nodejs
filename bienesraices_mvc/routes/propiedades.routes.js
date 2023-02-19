import express from "express";
const router = express.Router();

import { body } from "express-validator";
import { admin, crear, guardar } from "../controllers/propiedad.controller.js";

router.get("/mis-propiedades", admin);
router.get("/crear", crear);
router.post(
  "/crear",
  body("titulo")
    .notEmpty()
    .withMessage("El titulo del anuncio es obligatorio."),
  body("descripcion")
    .notEmpty()
    .withMessage("La descripcion no puede ir vacia.")
    .isLength({ max: 200 })
    .withMessage("La descripcion es muy larga."),
  body("categoria").isNumeric().withMessage("Selecciona una categoria."),
  body("precio").isNumeric().withMessage("Selecciona un rango de precios."),
  body("habitaciones")
    .isNumeric()
    .withMessage("Selecciona la cantidad de habitaciones."),
  body("estacionamiento")
    .isNumeric()
    .withMessage("Selecciona la cantidad de estacionamientos."),
  body("wc").isNumeric().withMessage("Selecciona la cantidad de baños."),
  body("lat").notEmpty().withMessage("Hubica la propiedad en el mapa."),
  guardar
);

export default router;
