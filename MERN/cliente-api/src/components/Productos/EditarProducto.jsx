import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

import clienteAxios from "../../config/axios";

const EditarProducto = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
  });
  const [archivo, setArchivo] = useState("");

  useEffect(() => {
    // Consultar API.
    const consultarAPI = async () => {
      const productoConsulta = await clienteAxios.get(`/productos/${id}`);

      setProducto(productoConsulta.data);
      console.log(productoConsulta);
    };

    consultarAPI();
  }, []);

  // Leer los datos del formulario.
  const leerInformacionProducto = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const leerImagen = (e) => {
    setArchivo(e.target.files[0]);
  };

  // Edita un producto de la DB.
  const editarProducto = async (e) => {
    e.preventDefault();

    // Crear un formData.
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("imagen", archivo);

    // Almacenar en la DB.
    try {
      const subirProducto = await clienteAxios.put(
        `/productos/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

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

  const { nombre, precio, imagen } = producto;

  return (
    <>
      <h2>Editar Producto</h2>

      <form onSubmit={editarProducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={leerInformacionProducto}
            defaultValue={nombre}
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
            defaultValue={precio}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          {imagen ? (
            <img
              src={`http://127.0.0.1:3030/${imagen}`}
              alt={`Imagen: ${imagen}`}
            />
          ) : null}
          <input type="file" name="imagen" onChange={leerImagen} />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar Producto"
          />
        </div>
      </form>
    </>
  );
};

export default EditarProducto;
