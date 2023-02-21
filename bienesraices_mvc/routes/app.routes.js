import {
  inicio,
  categoria,
  noEcnontrado,
  buscador,
} from "../controllers/app.controller.js";

import express from "express";
const router = express.Router();

// Pagina Inicio.
router.get("/", inicio);

// Categorias.
router.get("/categorias/:id", categoria);

// Pagina 404.
router.get("/404", noEcnontrado);

// Buscador.
router.post("/buscador", buscador);

export default router;
