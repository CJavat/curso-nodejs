import { exit } from "node:process";
import categorias from "./categorias.seed.js";
import precios from "./precios.seed.js";
import usuarios from "./usuarios.seed.js";
import db from "../config/db.js";
import { Categoria, Precio, Usuario } from "../models/index.js";

const importarDatos = async () => {
  try {
    // Autenticar.
    await db.authenticate();

    // Regenerar las columnas.
    await db.sync();

    // Insertar los datos.
    await Promise.all([
      Categoria.bulkCreate(categorias),
      Precio.bulkCreate(precios),
      Usuario.bulkCreate(usuarios),
    ]);

    console.log("Datos importados correctamente");
    exit();
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

const eliminarDatos = async () => {
  try {
    /* //* UNA FORMA DE ELIMINAR LOS DATOS. 
      await Promise.all([
        Categoria.destroy({ where: {}, truncate: true }),
        Precio.destroy({ where: {}, truncate: true }),
      ]); 
    */
    await db.sync({ force: true });
    console.log("Datos eliminados correctamente.");
    exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importarDatos();
}

if (process.argv[2] === "-e") {
  eliminarDatos();
}
