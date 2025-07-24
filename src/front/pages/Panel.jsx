import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Panel = () => {
  const { store } = useGlobalReducer();
  if (!store.user) return <Navigate to="/login" />; 

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const res = await fetch(`${backendUrl}/api/offers`);
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);
        const data = await res.json();
        setOffers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="container my-5">
      <div className="row gx-4">

        {/* Preview igual que público */}
        <div className="col-md-8">
          <div className="bg-white p-4 rounded shadow-sm">
            <h2 className="text-success mb-3">Preview de ofertas</h2>

            {loading && (
              <div className="d-flex justify-content-center my-5">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            )}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && !error && (
              <div className="overflow-auto" style={{ maxHeight: "400px", overflowY: "auto", overflowX: "hidden" }}>
                <div className="d-flex flex-column gap-3">
                  {offers.map(o => (
                    <div key={o.id} className="card">
                      <img
                        src={o.img || "https://via.placeholder.com/300x150.png?text=Producto"}
                        className="card-img-top"
                        alt={o.name}
                        style={{ height: 150, objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title mb-1">{o.name}</h5>
                        <p className="card-text mb-1">Agricultor: {o.seller}</p>
                        <p className="fw-bold text-success mb-0">€{o.price} / {o.unit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center mt-2">
              <Link to="/ofertas" className="btn btn-warning">Mostrar más</Link>
            </div>
          </div>
        </div>

        {/* Comprar / Vender apuntan a rutas reales ahora */}
        <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
          <Link to="/comprar" className="btn btn-success btn-lg w-75 mb-3">Comprar</Link>
          <Link to="/vender" className="btn btn-outline-success btn-lg w-75">Vender</Link>
        </div>

      </div>
    </div>
  );
};
