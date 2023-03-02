import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CRMContext } from "../../context/CRMContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(CRMContext);

  if (!auth.auth) return;

  return (
    <aside className="sidebar col-3">
      <h2>Administración</h2>

      <nav className="navegacion">
        <Link to="/" className="clientes">
          Clientes
        </Link>
        <Link to="/productos" className="productos">
          Productos
        </Link>
        <Link to="/pedidos" className="pedidos">
          Pedidos
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
