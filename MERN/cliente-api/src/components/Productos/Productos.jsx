import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";

import { CRMContext } from "../../context/CRMContext";

import Producto from "./Producto";

const Productos = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(CRMContext);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (!auth.token !== "") {
      // Query a la API.
      const consultarAPI = async () => {
        const productosConsulta = await clienteAxios.get("/productos", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setProductos(productosConsulta.data);
      };

      consultarAPI();
    } else {
      navigate("/iniciar-sesion");
    }
  }, [productos]);

  return (
    <>
      <h2>Productos</h2>

      <Link to="/productos/nuevo" className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {productos.map((producto) => (
          <Producto key={producto._id} producto={producto} />
        ))}
      </ul>
    </>
  );
};

export default Productos;
