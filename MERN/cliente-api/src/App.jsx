import { useContext } from "react";
/*LAYOUT */
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

/* ROUTING */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* COMPONENTES */
import Clientes from "./components/clients/Clientes";
import NuevoCliente from "./components/clients/NuevoCliente";
import EditarCliente from "./components/clients/EditarCliente";

import Productos from "./components/Productos/Productos";
import NuevoProducto from "./components/Productos/NuevoProducto";
import EditarProducto from "./components/Productos/EditarProducto";

import Pedidos from "./components/Pedidos/Pedidos";
import NuevoPedido from "./components/Pedidos/NuevoPedido";

import Login from "./components/auth/Login";

import { CRMContext, CRMProvider } from "./context/CRMContext";

function App() {
  // Utilizar context en el componente.
  const [auth, setAuth] = useContext(CRMContext);

  return (
    <Router>
      <CRMProvider value={[auth, setAuth]}>
        <>
          <Header />
          <div className="grid contenedor contenido-principal">
            <Sidebar />
            <main className="caja-contenido col-9">
              <Routes>
                <Route path="/">
                  <Route path="/" element={<Clientes />} />
                  <Route path="/clientes/nuevo" element={<NuevoCliente />} />
                  <Route
                    path="/clientes/editar/:id"
                    element={<EditarCliente />}
                  />

                  <Route path="/productos" element={<Productos />} />
                  <Route path="/productos/nuevo" element={<NuevoProducto />} />
                  <Route
                    path="/productos/editar/:id"
                    element={<EditarProducto />}
                  />

                  <Route path="/pedidos" element={<Pedidos />} />
                  <Route path="/pedidos/nuevo/:id" element={<NuevoPedido />} />
                </Route>

                <Route path="/iniciar-sesion" element={<Login />} />
              </Routes>
            </main>
          </div>
        </>
      </CRMProvider>
    </Router>
  );
}

export default App;
