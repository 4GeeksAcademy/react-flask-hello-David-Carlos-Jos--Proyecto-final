import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store } = useGlobalReducer();
  console.log("store", store);
  // Redirigir a panel si está logueado
  if (store.user) return <Navigate to="/Panel" />;

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
    const fetchOffers = async () => {
      try {
        const backend = import.meta.env.VITE_BACKEND_URL;
        const res = await fetch(`${backend}/api/user/ofertas`);
        if (!res.ok) throw new Error(res.statusText);
        setOffers(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="container my-5 pb-5">
      <div className="row gx-4">

        {/* === Preview de ofertas === */}
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
              <div
                className="overflow-auto"
                style={{ maxHeight: "400px", overflowY: "auto", overflowX: "hidden" }}
              >
                <div className="d-flex flex-column gap-3">
                  {offers.map((o) => (
                    <div key={o.id} className="card">
                      <div className="card-body">
                        <h5 className="card-title mb-1">{o.titulo}</h5>
                        <p className="card-text mb-1">{o.descripcion}</p>
                        <p className="text-muted mb-0">Vendedor ID: {o.id_vendedor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botón Mostrar más */}
            <div className="text-center mt-2">
              <Link to="/login" className="btn btn-warning">
                Mostrar más
              </Link>
            </div>
          </div>
        </div>

        {/* === Comprar / Vender === */}
        <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
          <Link to="/login" className="btn btn-success btn-lg w-75 mb-3">
            Comprar
          </Link>
          <Link to="/login" className="btn btn-outline-success btn-lg w-75">
            Vender
          </Link>
        </div>

      </div>
    </div>
  );
};
