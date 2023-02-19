import express from "express";
const router = express.Router();

import { body } from "express-validator";
import {
  admin,
  crear,
  guardar,
  agregarImagen,
  almacenarImagen,
  editar,
  guardarCambios,
} from "../controllers/propiedad.controller.js";

import protegerRuta from "../middleware/protegerRuta.js";
import upload from "../middleware/subirImage.js";

router.get("/mis-propiedades", protegerRuta, admin);
router.get("/crear", protegerRuta, crear);
router.post(
  "/crear",
  protegerRuta,
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

router.get("/agregar-imagen/:id", protegerRuta, agregarImagen);

router.post(
  "/agregar-imagen/:id",
  protegerRuta,
  upload.single("imagen"),
  almacenarImagen
);

router.get("/editar/:id", protegerRuta, editar);

router.post(
  "/editar/:id",
  protegerRuta,
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
  guardarCambios
);

export default router;
