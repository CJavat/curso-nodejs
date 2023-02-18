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
  guardar
);

export default router;
