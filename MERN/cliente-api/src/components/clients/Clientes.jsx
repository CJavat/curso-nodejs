import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

// Importar Cliente Axios.
import clienteAxios from "../../config/axios";

import Cliente from "./Cliente";

// Importar el context.
import { CRMContext } from "../../context/CRMContext";

const Clientes = () => {
  const navigate = useNavigate();

  // Trabajar con el state.
  const [clientes, setClientes] = useState([]);

  // Utilizar valores del context.
  const [auth, setAuth] = useContext(CRMContext);

  useEffect(() => {
    if (auth.token !== "") {
      try {
        // Query a la API.
        const consultarAPI = async () => {
          const clientesConsulta = await clienteAxios.get("/clientes", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          setClientes(clientesConsulta.data);
        };
        consultarAPI();
      } catch (error) {
        if (error.response.status === 500) {
          navigate("/iniciar-sesion");
        }
      }
    } else {
      navigate("/iniciar-sesion");
    }
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
