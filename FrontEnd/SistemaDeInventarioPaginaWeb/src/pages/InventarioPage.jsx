import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import * as bootstrap from 'bootstrap';

export default function InventarioPage() {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");
  const usuario = localStorage.getItem("usuario");
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState("");
  const [newCantidad, setNewCantidad] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [toastType, setToastType] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/inventario/productos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setProducts(res.data);
      setIsLoading(false);
    }).catch(err => {
      console.error("Error al obtener productos:", err);
      setError("Error al obtener los productos.");
    });
  }, []);

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    const toastEl = document.getElementById('liveToast');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl, {
        animation: true,
        autohide: true,
        delay: 3000
      });
      toast.show();
    }
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    if (product) {
      setNewCantidad(product.cantidad);
    } else {
      setNewCantidad(0);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (selectedProduct === null) {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/inventario/agregar-producto',
          newProduct,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'text/plain'
            }
          }
        );

        setProducts(response.data);
        setShowModal(false);
        setNewProduct("");
        showToast("Producto agregado al inventario exitosamente.", 'success');
      } catch (err) {
        console.error('Error al agregar producto:', err);
        setError('Error al agregar el producto');
      } finally {
        setIsLoading(false);
      }
    } else {
      if (newCantidad <= selectedProduct.cantidad) {
        showToast("La nueva cantidad debe ser mayor que la cantidad actual.", "danger");
        setIsLoading(false);
        return;
      }
      else {
        try {
          const response = await axios.post(
            'http://localhost:8080/api/inventario/aumentar-producto',
            {
              producto: selectedProduct.id,
              cantidad: newCantidad
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );

          setProducts(response.data);
          setShowModal(false);
          setNewCantidad(0);
          showToast("Cantidad actualizada exitosamente.", 'success');
        } catch (err) {
          console.error('Error al actualizar cantidad:', err);
          setError('Error al actualizar la cantidad');
        } finally {
          setIsLoading(false);
        }

        try {
          await axios.post(
            'http://localhost:8080/api/inventario/registrar-movimiento',
            {
              tipoMovimiento: "Entrada",
              autor: usuario
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
        } catch (err) {
          console.error('Error al registrar movimiento:', err);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const toggleProductStatus = async (id, estatus) => {
    if (estatus === "ACTIVO") {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/inventario/estatus-producto',
          {
            producto: id,
            estatus: "BAJA"
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        setProducts(response.data);
        showToast("El producto fue dado de baja en el inventario exitosamente.", 'success');
      } catch (err) {
        console.error('Error al cambiar estado del producto:', err);
        setError('Error al cambiar el estado del producto');
      }
    } else {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/inventario/estatus-producto',
          {
            producto: id,
            estatus: "ACTIVO"
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        setProducts(response.data);
        showToast("El producto fue reactivado en el inventario exitosamente.", 'success');
      } catch (err) {
        console.error('Error al cambiar estado del producto:', err);
        setError('Error al cambiar el estado del producto');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">

        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto">
                {toastType === 'success' ? 'Éxito' : 'Error'}
              </strong>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className={`toast-body ${toastType === 'success' ? 'bg-success text-white' : 'bg-danger text-white'}`}>
              {toastMessage}
            </div>
          </div>
        </div>
        {error && (
          <div className="alert alert-danger text-center fade show" role="alert">
            {error}
          </div>
        )}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Productos en inventario</h2>
          {rol === "ADMINISTRADOR" && <button type="button" className="btn me-3 btn-outline-primary" onClick={() => handleOpenModal(null)} disabled={isLoading}>
            Agregar Producto
          </button>}
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
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Estatus</th>
                {rol === "ADMINISTRADOR" && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.nombre}</td>
                  <td>{product.cantidad}</td>
                  <td>
                    <span className={`badge ${product.estatus === "ACTIVO" ? 'bg-success' : 'bg-danger'}`}>
                      {product.estatus === "ACTIVO" ? 'Activo' : 'De Baja'}
                    </span>
                  </td>
                  {rol === "ADMINISTRADOR" && <td>
                    <button
                      type="button"
                      className={'btn me-3 btn-outline-primary'}
                      onClick={() => handleOpenModal(product)}
                      disabled={isLoading}
                    >
                      Incrementar Cantidad
                    </button>
                    <button
                      type="button"
                      className={`btn ${product.estatus === "BAJA" ? 'btn-outline-success' : 'btn-outline-danger'}`}
                      onClick={() => toggleProductStatus(product.id, product.estatus)}
                      disabled={isLoading}
                    >
                      {product.estatus === "BAJA" ? 'Reactivar' : 'Dar de Baja'}
                    </button>
                  </td>}
                </tr>
              ))}
            </tbody>
          </table>)}

        {showModal && (
          <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{selectedProduct === null ? "Agregar Nuevo Producto" : "Incrementar Producto"}</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                      disabled={isLoading}
                    ></button>
                  </div>

                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedProduct === null ? newProduct : selectedProduct.nombre}
                          onChange={(e) => setNewProduct(e.target.value)}
                          disabled={selectedProduct === null ? false : true}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Cantidad</label>
                        <input
                          type="number"
                          className="form-control"
                          value={newCantidad}
                          onChange={(e) => setNewCantidad(e.target.value)}
                          disabled={selectedProduct === null ? true : false}
                        />
                      </div>

                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-secondary me-2"
                          onClick={() => setShowModal(false)}
                          disabled={isLoading}
                        >
                          Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                          {isLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Guardando...
                            </>
                          ) : 'Guardar'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}