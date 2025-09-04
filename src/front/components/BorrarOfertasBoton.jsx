import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer';
import { beautifulStyles } from "../styles/beautifulStyles";


const TrashIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-2 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
);
const ShoppingCartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="21" r="1"/>
    <circle cx="19" cy="21" r="1"/>
    <path d="m2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
  </svg>
);

const LeafIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);



// Componente del botón para borrar ofertas
export const BorrarOfertasBoton = ({disabled = false, isLoading = false,id_oferta }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("jwt_token");
            if (!token) {
                throw new Error("No authentication token found");
            }

            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendUrl}api/user/oferta/vendedor/borrar/${id_oferta}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data)
            navigate("/api/busqueda", { replace: true });
        } catch (err) {
            console.error('Error submitting offer:', err);
        }
        };
        return (
            <button
                onClick={handleSubmit}
                disabled={disabled || isLoading}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
        relative overflow-hidden
        px-6 py-3 rounded-xl
        font-medium text-white text-sm
        transition-all duration-300 ease-out
        transform hover:scale-105
        shadow-lg hover:shadow-xl
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${isHovered
                        ? 'bg-gradient-to-r from-red-400 via-red-500 to-red-600'
                        : 'bg-gradient-to-r from-green-400 via-green-500 to-green-600'
                    }
      `}
                style={{
                    backgroundImage: isHovered
                        ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                        : 'linear-gradient(135deg, #22c55e, #16a34a)',
                }}
            >
                {/* Patrón de fondo sutil */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />

                {/* Contenido del botón */}
                <div className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                        <>
                            <TrashIcon />
                            <LeafIcon />
                        </>
                    )}
                    <span className="font-semibold">
                        {isLoading ? 'Eliminando...' : 'Eliminar Oferta'}
                    </span>
                </div>

                {/* Efecto de brillo al hover */}
                <div
                    className={`
          absolute top-0 left-[-100%] w-full h-full
          bg-gradient-to-r from-transparent via-white to-transparent
          opacity-20 transition-all duration-700
          ${isHovered ? 'left-[100%]' : ''}
        `}
                />
            </button>
        );
    
}
