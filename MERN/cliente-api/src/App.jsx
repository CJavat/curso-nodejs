/*LAYOUT */
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

/* ROUTING */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* COMPONENTES */
import Clientes from "./components/clients/Clientes";
import Productos from "./components/Productos/Productos";
import Pedidos from "./components/Pedidos/Pedidos";

function App() {
  return (
    <Router>
      <>
        <Header />
        <div className="grid contenedor contenido-principal">
          <Sidebar />
          <main className="caja-contenido col-9">
            <Routes>
              <Route path="/">
                <Route path="/" element={<Clientes />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/pedidos" element={<Pedidos />} />
              </Route>
            </Routes>
          </main>
        </div>
      </>
    </Router>
  );
}

export default App;
