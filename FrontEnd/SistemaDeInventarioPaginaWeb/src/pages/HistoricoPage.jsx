import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function HistoricoPage() {
  const token = localStorage.getItem("token");
  const [movimientos, setMovimientos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtroTipoMovimiento, setFiltroTipoMovimiento] = useState('Entrada');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/inventario/movimientos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setMovimientos(res.data);
      setIsLoading(false);
    }).catch(err => {
      console.error("Error al obtener productos:", err);
      setError("Error al obtener los productos.");
    });
  }, []);

  const movimientosFiltrados = movimientos.filter(movimiento =>
    movimiento.tipoMovimiento === filtroTipoMovimiento
  );

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        {error && (
          <div className="alert alert-danger text-center fade show" role="alert">
            {error}
          </div>
        )}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Historial de Movimientos</h2>
        </div>

        <div className="mb-3">
          <label htmlFor="filtroTipoMovimiento" className="form-label">Filtrar por tipo de movimiento:</label>
          <select
            className="form-select"
            id="filtroTipoMovimiento"
            value={filtroTipoMovimiento}
            onChange={(e) => setFiltroTipoMovimiento(e.target.value)}
          >
            <option value="Entrada">Entradas</option>
            <option value="Salida">Salidas</option>
          </select>
        </div>

        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <table className="table table-striped-columns table-bordered table-hover table-responsive">
            <thead>
              <tr>
                <th>Tipo de movimiento</th>
                <th>Autor</th>
                <th>Fecha</th>
                <th>Hora</th>
              </tr>
            </thead>
            <tbody>
              {movimientosFiltrados.map(movimiento => (
                <tr key={movimiento.id}>
                  <td>{movimiento.tipoMovimiento}</td>
                  <td>{movimiento.autor}</td>
                  <td>{movimiento.fecha}</td>
                  <td>{movimiento.hora}</td>
                </tr>
              ))}
            </tbody>
          </table>)}
      </div>
    </>
  );
}