import React from "react";

const FormCantidadProducto = (props) => {
  const {
    producto,
    index,
    aumentarProductos,
    restarProductos,
    elimiarProductoPedido,
  } = props;
  const { nombre, precio } = producto;

  return (
    <li>
      <div className="texto-producto">
        <p className="nombre">{nombre}</p>
        <p className="precio">${precio}</p>
      </div>
      <div className="acciones">
        <div className="contenedor-cantidad">
          <i
            className="fas fa-minus"
            onClick={() => {
              restarProductos(index);
            }}
          ></i>
          <p>{producto.cantidad}</p>
          <i
            className="fas fa-plus"
            onClick={() => aumentarProductos(index)}
          ></i>
        </div>
        <button
          type="button"
          className="btn btn-rojo"
          onClick={() => {
            elimiarProductoPedido(producto.producto);
          }}
        >
          <i className="fas fa-minus-circle"></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  );
};

export default FormCantidadProducto;
