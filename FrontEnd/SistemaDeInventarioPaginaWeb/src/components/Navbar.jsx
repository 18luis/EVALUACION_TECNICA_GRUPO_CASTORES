import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");
    navigate("/");
  };

  const handleInicio = () => {
    navigate("/inicio");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/inicio">Sistema de inventario</Link>

      <div className="collapse navbar-collapse ms-4">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <p className="nav-link text-white">
              <span>Hola, {localStorage.getItem("usuario")}</span>
            </p>
          </li>
          <li className="nav-item">
            <p className="nav-link text-white">
              {localStorage.getItem("rol") === "ADMINISTRADOR" ? <span>(ADMINISTRADOR)</span> : <span>(ALMACENISTA)</span>}
            </p>
          </li>
        </ul>
        <button onClick={handleInicio} className="btn btn-outline-light me-3">Inicio</button>
        <button onClick={handleLogout} className="btn btn-outline-light">Cerrar sesión</button>
      </div>
    </nav>
  );
}