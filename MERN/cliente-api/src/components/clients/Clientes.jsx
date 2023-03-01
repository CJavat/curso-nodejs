import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Importar Cliente Axios.
import clienteAxios from "../../config/axios";

import Cliente from "./Cliente";

const Clientes = () => {
  // Trabajar con el state.
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // Query a la API.
    const consultarAPI = async () => {
      const clientesConsulta = await clienteAxios.get("/clientes");

      setClientes(clientesConsulta.data);
    };

    consultarAPI();
  }, [clientes]);

  return (
    <>
      <h2>Clientes</h2>

      <Link to="/clientes/nuevo" className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>

      <ul className="listado-clientes">
        {clientes.map((cliente) => (
          <Cliente key={cliente._id} cliente={cliente} />
        ))}
      </ul>
    </>
  );
};

export default Clientes;
