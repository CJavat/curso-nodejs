import Propiedad from "./propiedad.model.js";
import Categoria from "./categoria.model.js";
import Usuario from "./usuario.model.js";
import Precio from "./precio.model.js";
import Mensaje from "./mensaje.model.js";

Propiedad.belongsTo(Precio, { foreignKey: "precioId" });
Propiedad.belongsTo(Categoria, { foreignKey: "categoriaId" });
Propiedad.belongsTo(Usuario, { foreignKey: "usuarioId" });
Propiedad.hasMany(Mensaje, { foreignKey: "propiedadId" });

Mensaje.belongsTo(Propiedad, { foreignKey: "propiedadId" });
Mensaje.belongsTo(Usuario, { foreignKey: "usuarioId" });

export { Propiedad, Categoria, Usuario, Precio, Mensaje };

/*//! TIPOS DE RELACIONES.
  hasOne -> 1:1 -> Precio.hasOne(Propiedad)
  hasMany -> 1:N -> Propiedad.hasMany(Usuario)

  belongsTo -> 1:1 -> Propiedad.belongsTo(Precio)
  belongsToMany -> 1:N -> Usuario.belongsTo(Propiedad)
*/
