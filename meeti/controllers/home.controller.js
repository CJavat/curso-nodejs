const home = (req, res) => {
  res.render("home", {
    nombrePagina: "Inicio",
  });
};

module.exports = {
  home,
};
