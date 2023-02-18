import Propiedad from "./propiedad.model.js";
import Categoria from "./categoria.model.js";
import Usuario from "./usuario.model.js";
import Precio from "./precio.model.js";

Propiedad.belongsTo(Precio, { foreignKey: "precioId" });
Propiedad.belongsTo(Categoria, { foreignKey: "categoriaId" });
Propiedad.belongsTo(Usuario, { foreignKey: "usuarioId" });

export { Propiedad, Categoria, Usuario, Precio };

/*//! TIPOS DE RELACIONES.
  hasOne -> 1:1 -> Precio.hasOne(Propiedad)
  hasMany -> 1:N -> Propiedad.hasMany(Usuario)

  belongsTo -> 1:1 -> Propiedad.belongsTo(Precio)
  belongsToMany -> 1:N -> Usuario.belongsTo(Propiedad)
*/
