const formCrearCuenta = (req, res) => {
  res.render("crear-cuenta", {
    nombrePagina: "Crear Cuenta",
  });
};

module.exports = { formCrearCuenta };
