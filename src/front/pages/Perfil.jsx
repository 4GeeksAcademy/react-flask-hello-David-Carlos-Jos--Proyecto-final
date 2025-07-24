import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';

export const Perfil = () => {
  const { store } = useGlobalReducer();
  if (!store.user) return <Navigate to="/login" />;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const userId = store.user.id;

  const [profile, setProfile] = useState(null);
  const [offers, setOffers] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState({ profile: true, offers: true, purchases: true });
  const [error, setError] = useState(null);
  const [view, setView] = useState('info');

  useEffect(() => {
    // Fetch profile info
    fetch(`${backendUrl}/api/user/${userId}`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(prev => ({ ...prev, profile: false })));

    // Fetch user's offers
    fetch(`${backendUrl}/api/user/${userId}/offers`)
      .then(res => res.json())
      .then(data => setOffers(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(prev => ({ ...prev, offers: false })));

    // Fetch user's purchases
    fetch(`${backendUrl}/api/user/${userId}/purchases`)
      .then(res => res.json())
      .then(data => setPurchases(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(prev => ({ ...prev, purchases: false })));
  }, [backendUrl, userId]);

  const renderContent = () => {
    if (error) return <div className="alert alert-danger">{error}</div>;

    switch (view) {
      case 'info':
        if (loading.profile) return <p>Cargando perfil...</p>;
        return (
          <div>
            <h3>Información de Perfil</h3>
            <img
              src={profile.avatar || 'https://via.placeholder.com/150'}
              alt="Avatar"
              className="rounded-circle mb-3"
              width={150}
              height={150}
            />
            <p><strong>Nombre:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
          </div>
        );

      case 'reputation':
        if (loading.profile) return <p>Cargando reputación...</p>;
        const rating = profile.reputation || 0;
        const fullStars = Math.floor(rating);
        const stars = Array.from({ length: fullStars }, () => '★').join('');
        const emptyStars = Array.from({ length: 5 - fullStars }, () => '☆').join('');
        return (
          <div>
            <h3>Reputación</h3>
            <p style={{ fontSize: '1.5rem', color: '#f5c518' }}>{stars}{emptyStars}</p>
            <p>Puntuación: {rating.toFixed(1)} / 5</p>
          </div>
        );

      case 'ofertas':
        if (loading.offers) return <p>Cargando ofertas...</p>;
        return (
          <div>
            <h3>Mis Ofertas</h3>
            {offers.length === 0 ? (
              <p>No tienes ofertas publicadas.</p>
            ) : (
              offers.map(o => (
                <div key={o.id} className="card mb-2">
                  <div className="card-body">
                    <h5 className="card-title">{o.name}</h5>
                    <p className="card-text">€{o.price} / {o.unit}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case 'compras':
        if (loading.purchases) return <p>Cargando compras...</p>;
        return (
          <div>
            <h3>Compras Anteriores</h3>
            {purchases.length === 0 ? (
              <p>No has realizado compras.</p>
            ) : (
              purchases.map(p => (
                <div key={p.id} className="card mb-2">
                  <div className="card-body">
                    <h5 className="card-title">{p.offerName}</h5>
                    <p className="card-text">Cantidad: {p.quantity}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="list-group">
            <button
              className={`list-group-item list-group-item-action ${view === 'info' ? 'active' : ''}`}
              onClick={() => setView('info')}
            >Perfil</button>
            <button
              className={`list-group-item list-group-item-action ${view === 'reputation' ? 'active' : ''}`}
              onClick={() => setView('reputation')}
            >Reputación</button>
            <button
              className={`list-group-item list-group-item-action ${view === 'ofertas' ? 'active' : ''}`}
              onClick={() => setView('ofertas')}
            >Ofertas</button>
            <button
              className={`list-group-item list-group-item-action ${view === 'compras' ? 'active' : ''}`}
              onClick={() => setView('compras')}
            >Compras</button>
          </div>
        </div>

        {/* Content area */}
        <div className="col-md-9">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
