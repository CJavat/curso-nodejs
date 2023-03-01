import { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";

const EditarCliente = () => {
  // Función de RRD para redireccionar.
  const navigate = useNavigate();

  // Función de RRD para obtener el ID.
  const { id } = useParams();

  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  // Query a la API.
  const consultarAPI = async () => {
    const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
    setCliente(clienteConsulta.data);
  };

  // useEffect cuando el componente carga.
  useEffect(() => {
    consultarAPI();
  }, []);

  // Leer datos del formulario.
  const actualizarState = (e) => {
    // Almacenar lo que el usuario escribe en el state.
    setCliente({
      // Obtener una copia del state actual.
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  // Validar el formulario.
  const validarCliente = () => {
    const { nombre, apellido, email, empresa, telefono } = cliente;

    // Revisar que las propiedades del state tengan contenido.
    let valido =
      !nombre.length ||
      !apellido.length ||
      !email.length ||
      !empresa.length ||
      !telefono.length;

    return valido;
  };

  // Envia una petición por Axios para actualizar el cliente.
  const actualizarCliente = async (e) => {
    e.preventDefault();

    try {
      const clienteActualizado = await clienteAxios.put(
        `/clientes/${id}`,
        cliente
      );

      if (clienteActualizado.data.code === 11000) {
        Swal.fire({
          icon: "error",
          title: "Hubo un Error",
          text: "Ese Cliente ya está registrado",
        });
      } else {
        Swal.fire(
          "Correcto",
          "¡Se actualizó correctamente el cliente!",
          "success"
        );
      }

      // Redireccionar.
      navigate("/");
    } catch (error) {
      console.log("Ocurrió un error al agregar en la DB. ERROR: " + error);
    }
  };

  return (
    <>
      <h2>Editar Cliente</h2>

      <form onSubmit={actualizarCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            value={cliente.nombre}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            value={cliente.apellido}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            value={cliente.empresa}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            value={cliente.email}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono Cliente"
            name="telefono"
            value={cliente.telefono}
            onChange={actualizarState}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar Cambios"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </>
  );
};

export default EditarCliente;
