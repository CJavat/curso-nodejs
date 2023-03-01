import { useState } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

const NuevoCliente = () => {
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

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

  // Agregar en la API un nuevo cliente.
  const agregarCliente = async (e) => {
    e.preventDefault();

    try {
      const resultado = await clienteAxios.post("/clientes", cliente);
      console.log(resultado);
      if (resultado.data.code === 11000) {
        Swal.fire({
          icon: "error",
          title: "Hubo un Error",
          text: "Ese Cliente ya está registrado",
        });
      } else {
        Swal.fire("¡Se agregó el cliente!", resultado.data.mensaje, "success");
      }

      // Redireccionar.
      navigate("/");
    } catch (error) {
      console.log("Ocurrió un error al agregar en la DB. ERROR: " + error);
    }
  };

  return (
    <>
      <h2>Nuevo Cliente</h2>

      <form onSubmit={agregarCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={actualizarState}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </>
  );
};

export default NuevoCliente;
