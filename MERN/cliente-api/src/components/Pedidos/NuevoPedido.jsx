import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

import FormBuscarProducto from "./FormBuscarProducto";
import FormCantidadProducto from "./FormCantidadProducto";

const NuevoPedido = () => {
  // Extraer ID.
  const { id } = useParams();

  // Redirección.
  const navigate = useNavigate();

  // State.
  const [cliente, setCliente] = useState({});
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Obtener el cliente.
    const consultarAPI = async () => {
      // Consultar cliente actual.
      const resultado = await clienteAxios.get(`/clientes/${id}`);

      setCliente(resultado.data);
    };

    consultarAPI();

    // Actualizar el total.
    actualizarTotal();
  }, [productos]);

  const buscarProducto = async (e) => {
    e.preventDefault();

    // Obtener los productos de la busqueda.

    const resultadoBusqueda = await clienteAxios.post(
      `/productos/busqueda/${busqueda}`
    );

    // Si no hay resultados, una alerta, sino, agregarlo.
    if (resultadoBusqueda.data[0]) {
      let productoResultado = resultadoBusqueda.data[0];

      // Agregar la llave "producto" (es la copia de id)
      productoResultado.producto = resultadoBusqueda.data[0]._id;
      productoResultado.cantidad = 0;

      // Ponerlo en el state.
      setProductos([...productos, productoResultado]);
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

  // Actualizar la cantidad de productos.
  const restarProductos = (i) => {
    // Copiar el arreglo original.
    const todosProductos = [...productos];

    // Validar que solo quede a minimo 0.
    if (todosProductos[i].cantidad === 0) return;

    // Decremento
    todosProductos[i].cantidad--;

    // Almacenarlo en el state.
    setProductos(todosProductos);
  };

  const aumentarProductos = (i) => {
    // Copiar el arreglo original.
    const todosProductos = [...productos];

    // Incremento.
    todosProductos[i].cantidad++;

    // Almacenarlo en el state.
    setProductos(todosProductos);
  };

  // Elimina un producto del state.
  const elimiarProductoPedido = (id) => {
    const todosProductos = productos.filter(
      (producto) => producto.producto !== id
    );
    setProductos(todosProductos);
  };

  // Actualizar el total a pagar.
  const actualizarTotal = () => {
    // Si el arreglo de productos es igual a 0: el total es 0.
    if (productos.length === 0) {
      setTotal(0);
      return;
    }

    // Calcular el nuevo total.
    let nuevoTotal = 0;

    // Recorrer todos los productos, sus cantidades y precios.
    productos.map(
      (producto) => (nuevoTotal += producto.cantidad * producto.precio)
    );

    // Almacenar el nuevo total.
    setTotal(nuevoTotal);
  };

  // Almacena el pedido en la DB.
  const realizarPedido = async (e) => {
    e.preventDefault();

    // Construir el objeto.
    const pedido = {
      cliente: id,
      productos: productos,
      total: total,
    };

    // Realizar la petición.
    const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);

    // Si la petición es exitosa, se muestra un mensaje de exito.
    if (resultado.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Correcto",
        text: resultado.data.mensaje,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al realizar pedido",
        text: "Vuelve a Intentarlo",
      });
    }

    navigate("/");
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
        {productos.map((producto, index) => (
          <FormCantidadProducto
            key={producto.producto}
            index={index}
            producto={producto}
            restarProductos={restarProductos}
            aumentarProductos={aumentarProductos}
            elimiarProductoPedido={elimiarProductoPedido}
          />
        ))}
      </ul>

      <p className="total">
        Total a Pagar: <span className="">${total}</span>
      </p>

      {total > 0 ? (
        <form onSubmit={realizarPedido}>
          <input
            type="submit"
            className="btn btn-verde btn-block"
            value="Realizar Pedido"
          />
        </form>
      ) : null}
    </>
  );
};

export default NuevoPedido;
