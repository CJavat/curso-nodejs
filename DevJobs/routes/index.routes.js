const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home.controller");

module.exports = () => {
  router.get("/", homeController.mostrarTrabajos);

  return router;
};
