import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [nombreDeUsuario, setNombreDeUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:8080/api/autenticacion/iniciar-sesion", {
        nombreDeUsuario,
        contrasenia
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("usuario", res.data.nombre);
      localStorage.setItem("rol", res.data.rol);
      navigate("/inicio");
    } catch (err) {
      setError("Credenciales inválidas. Por favor, intenta nuevamente." + err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center mt-3">
      <div className="text-center mb-4">
        <h3 className="fw-bold">Bienvenido al sistema de inventario</h3>
        <p className="text-muted">Inicia sesión para continuar</p>
      </div>
      <form onSubmit={handleLogin} className="p-4 bg-white rounded shadow-lg w-100 mx-auto" style={{ maxWidth: "400px" }}>
        {error && (
          <div className="alert alert-danger text-center fade show" role="alert">
            {error}
          </div>
        )}

        <div className="form-floating mb-3">
          <input
            type="text"
            value={nombreDeUsuario}
            onChange={(e) => setNombreDeUsuario(e.target.value)}
            required
            className="form-control" id="floatingInput" placeholder="usuario" />
            <label for="floatingInput">Nombre de usuario</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            required
            className="form-control" id="floatingPassword" placeholder="********" />
            <label for="floatingPassword">Contraseña</label>
        </div>

        <button
          type="submit"
          className={`btn w-100 fw-bold text-white ${isLoading ? "btn-secondary disabled" : "btn-primary"}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm"></span> Iniciando...
            </>
          ) : (
            "Iniciar sesión"
          )}
        </button>

        <div className="d-flex justify-content-center mt-3">
          <a href="/registrarse" className="text-decoration-none text-primary fw-bold">
            Crear cuenta nueva
          </a>
        </div>
      </form>
    </div>
  );
}