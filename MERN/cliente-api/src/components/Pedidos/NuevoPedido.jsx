import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

import FormBuscarProducto from "./FormBuscarProducto";

const NuevoPedido = () => {
  // Extraer ID.
  const { id } = useParams();

  // State.
  const [cliente, setCliente] = useState({});
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    // Obtener el cliente.
    const consultarAPI = async () => {
      // Consultar cliente actual.
      const resultado = await clienteAxios.get(`/clientes/${id}`);

      setCliente(resultado.data);
    };

    consultarAPI();
  }, []);

  const buscarProducto = async (e) => {
    e.preventDefault();

    // Obtener los productos de la busqueda.

    const resultadoBusqueda = await clienteAxios.post(
      `/productos/busqueda/${busqueda}`
    );

    // Si no hay resultados, una alerta, sino, agregarlo.
    if (resultadoBusqueda.data[0]) {
      console.log(resultadoBusqueda.data);
    } else {
      // No hay resultados.
      Swal.fire({
        icon: "error",
        title: "No hay resultados",
        text: "No hay resultados",
      });
    }
  };

  // Almacenar una busqueda en el State
  const leerDatosBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  return (
    <>
      <h2>Nuevo Pedido</h2>

      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>
          Nombre: {cliente.nombre} {cliente.apellido}
        </p>
        <p>Telefono: {cliente.telefono}</p>
      </div>

      <FormBuscarProducto
        buscarProducto={buscarProducto}
        leerDatosBusqueda={leerDatosBusqueda}
      />

      <ul className="resumen">
        <li>
          <div className="texto-producto">
            <p className="nombre">Macbook Pro</p>
            <p className="precio">$250</p>
          </div>
          <div className="acciones">
            <div className="contenedor-cantidad">
              <i className="fas fa-minus"></i>
              <input type="text" name="cantidad" />
              <i className="fas fa-plus"></i>
            </div>
            <button type="button" className="btn btn-rojo">
              <i className="fas fa-minus-circle"></i>
              Eliminar Producto
            </button>
          </div>
        </li>
        <li>
          <div className="texto-producto">
            <p className="nombre">Macbook Pro</p>
            <p className="precio">$250</p>
          </div>
          <div className="acciones">
            <div className="contenedor-cantidad">
              <i className="fas fa-minus"></i>
              <input type="text" name="cantidad" />
              <i className="fas fa-plus"></i>
            </div>
            <button type="button" className="btn btn-rojo">
              <i className="fas fa-minus-circle"></i>
              Eliminar Producto
            </button>
          </div>
        </li>
        <li>
          <div className="texto-producto">
            <p className="nombre">Macbook Pro</p>
            <p className="precio">$250</p>
          </div>
          <div className="acciones">
            <div className="contenedor-cantidad">
              <i className="fas fa-minus"></i>
              <input type="text" name="cantidad" />
              <i className="fas fa-plus"></i>
            </div>
            <button type="button" className="btn btn-rojo">
              <i className="fas fa-minus-circle"></i>
              Eliminar Producto
            </button>
          </div>
        </li>
      </ul>
      <div className="campo">
        <label>Total:</label>
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          readonly="readonly"
        />
      </div>
      <div className="enviar">
        <input type="submit" className="btn btn-azul" value="Agregar Pedido" />
      </div>
    </>
  );
};

export default NuevoPedido;
