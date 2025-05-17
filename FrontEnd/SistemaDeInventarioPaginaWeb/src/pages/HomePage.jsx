import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const isAdmin = () => localStorage.getItem("rol") === "ADMINISTRADOR";

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-primary fw-bold">Cargando...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center mt-3">
        <div className="list-group w-50">
          <button type="button" className="list-group-item list-group-item-action list-group-item-primary"
          onClick={() => navigate("/inventario")}>
            Ver módulo inventario
          </button>
          {!isAdmin() && (
            <button type="button" className="list-group-item list-group-item-action list-group-item-primary"
            onClick={() => navigate("/salida")}>
              Ver módulo para salida de productos
            </button>
          )}
          {isAdmin() && (
            <button type="button" className="list-group-item list-group-item-action list-group-item-primary"
            onClick={() => navigate("/historico")}>
              Ver módulo para histórico de productos
            </button>
          )}
        </div>
      </div>
    </>
  );
}