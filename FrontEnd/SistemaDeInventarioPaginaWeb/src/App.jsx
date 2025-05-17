import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import InventarioPage from "./pages/InventarioPage";
import SalidaInventarioPage from "./pages/SalidaInventarioPage";
import HistoricoPage from "./pages/HistoricoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/registrarse" element={<RegisterPage />} />

        {/* Rutas privadas */}
        <Route path="/inicio" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/inventario" element={<PrivateRoute><InventarioPage /></PrivateRoute>} />
        <Route path="/salida" element={<PrivateRoute><SalidaInventarioPage /></PrivateRoute>} />
        <Route path="/historico" element={<PrivateRoute><HistoricoPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;