import { useEffect, useState } from "react";

// Importar Cliente Axios.
import clienteAxios from "../../config/axios";

import Cliente from "./Cliente";

const Clientes = () => {
  // Trabajar con el state.
  const [clientes, setClientes] = useState([]);

  // Query a la API.
  const consultarAPI = async () => {
    const clientesConsulta = await clienteAxios.get("/clientes");

    setClientes(clientesConsulta.data);
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  return (
    <>
      <h2>Clientes</h2>

      <ul className="listado-clientes">
        {clientes.map((cliente) => (
          <Cliente key={cliente._id} cliente={cliente} />
        ))}
      </ul>
    </>
  );
};

export default Clientes;
