import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    email: "",
    password: "",
    gender: "",
    bio: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para el modal
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:8080/api/users/register", formData);
      setShowModal(true); // Muestra el modal en lugar de alert
    } catch (err) {
      setError("Error al registrar. Verifica los datos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center mt-3">
      <div className="text-center mb-4">
        <h3 className="fw-bold">Crear cuenta</h3>
        <p className="text-muted">Completa los campos para registrarte</p>
      </div>

      <form onSubmit={handleRegister} className="p-4 bg-white rounded shadow-lg w-100 mx-auto" style={{ maxWidth: "400px" }}>

        {error && (
          <div className="alert alert-danger text-center fade show" role="alert">
            {error}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label fw-bold">Nombre de usuario</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Fecha de nacimiento</label>
          <input type="date" className="form-control" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="usuario@correo.com"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="********"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Género</label>
          <select className="form-select" name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Seleccionar género</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Biografía</label>
          <textarea className="form-control" name="bio" value={formData.bio} onChange={handleChange} rows="3" />
        </div>

        <button type="submit" className={`btn w-100 fw-bold text-white ${isLoading ? "btn-secondary disabled" : "btn-success"}`} disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm"></span> Registrando...
            </>
          ) : (
            "Registrarse"
          )}
        </button>
      </form>

      {/* Modal de Bootstrap */}
      <div className={`modal fade ${showModal ? "show d-block" : "d-none"}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Registro exitoso</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¡Ahora puedes iniciar sesión!</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => navigate("/")}>
                Ir a inicio de sesión
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
