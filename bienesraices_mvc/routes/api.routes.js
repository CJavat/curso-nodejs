import express from "express";
const router = express.Router();
import { propiedades } from "../controllers/api.controller.js";

router.get("/propiedades", propiedades);

export default router;
