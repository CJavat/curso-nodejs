import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import clienteAxios from "../../config/axios";

const NuevoProducto = () => {
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
  });
  const [imagen, setImagen] = useState("");

  // Leer los datos del formulario.
  const leerInformacionProducto = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  // Colocar la imagen en el State.
  const leerImagen = (e) => {
    setImagen(e.target.files[0]);
  };

  // Almacena nuevo producto en la DB.
  const agregarProducto = async (e) => {
    e.preventDefault();

    // Crear un formData.
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("imagen", imagen);

    // Almacenar en la DB.
    try {
      const subirProducto = await clienteAxios.post(`/productos`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Lanzar una alerta.
      if (subirProducto.status === 200) {
        Swal.fire(
          "Agregado Correctamente",
          subirProducto.data.mensaje,
          "success"
        );

        navigate("/productos");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Hubo un error al agregarlo a la DB.",
        text: "Vuelve a intentarlo",
      });
    }
  };

  return (
    <>
      <h2>Nuevo Producto</h2>

      <form onSubmit={agregarProducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={leerInformacionProducto}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            min="0.00"
            step="0.01"
            placeholder="Precio"
            onChange={leerInformacionProducto}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          <input type="file" name="imagen" onChange={leerImagen} />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Producto"
          />
        </div>
      </form>
    </>
  );
};

export default NuevoProducto;
