import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

// Context-
import { CRMContext } from "../../context/CRMContext";

const Login = () => {
  // Utilizar valores del context.
  const [auth, setAuth] = useContext(CRMContext);

  const navigate = useNavigate();

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  // Almacenar lo que el usuario escribe en el state
  const leerDatos = (e) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

  // Iniciar sesión en el servidor.
  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await clienteAxios.post(
        "/iniciar-sesion",
        credenciales
      );

      // Extrare el token.
      const { token } = respuesta.data;
      localStorage.setItem("token", token);

      // Colocar el token en el state.
      setAuth({ token, auth: true });

      Swal.fire({
        icon: "success",
        title: "Login Correcto",
        text: "Iniciaste sesión exitosamente",
      });

      // Redireccionar.
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: error.respuesta.data.mensaje,
      });
    }
  };

  return (
    <div className="login">
      <h2>INICIAR SESIÓN</h2>

      <div className="contenedor-formulario">
        <form onSubmit={iniciarSesion}>
          <div className="campo">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email para Iniciar Sesión"
              required
              onChange={leerDatos}
            />
          </div>

          <div className="campo">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password para Iniciar Sesión"
              required
              onChange={leerDatos}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="btn btn-verde btn-block"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
