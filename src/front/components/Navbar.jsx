import React from 'react';
import { Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';

export const Navbar = () => {
  const { store } = useGlobalReducer();
  const avatar = store.user?.avatar || 'https://via.placeholder.com/36x36.png?text=U';

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">AgriMarket</Link>

        {store.user ? (
          <div className="ms-auto d-flex align-items-center">
            <Link to="/panel" className="btn btn-outline-success me-3">Inicio</Link>
            <Link to="/perfil" className="d-flex align-items-center text-decoration-none">
              <img
                src={avatar}
                alt="perfil"
                width="36"
                height="36"
                className="rounded-circle me-2"
              />
              <span className="text-success">{store.user.name}</span>
            </Link>
          </div>
        ) : (
          <div className="ms-auto">
            <Link className="btn btn-outline-success me-2" to="/login">Acceder</Link>
            <Link className="btn btn-success" to="/register">Registrarse</Link>
          </div>
        )}
      </div>
    </nav>
  );
};