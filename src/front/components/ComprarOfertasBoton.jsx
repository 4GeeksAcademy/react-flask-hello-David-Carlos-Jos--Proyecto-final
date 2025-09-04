import { useState } from "react";

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


export const ComprarOfertasBoton = ({ onClick, disabled = false, isLoading = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden
        px-8 py-3 rounded-xl
        font-medium text-white text-sm
        transition-all duration-300 ease-out
        transform hover:scale-105
        shadow-lg hover:shadow-xl
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        bg-gradient-to-r from-emerald-400 via-green-500 to-lime-500
        hover:from-emerald-500 hover:via-green-600 hover:to-lime-600
      `}
    >
      {/* Patrón de hojas en el fondo */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Contenido del botón */}
      <div className="relative flex items-center justify-center gap-3">
        {isLoading ? (
          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
        ) : (
          <>
            <ShoppingCartIcon />
            <LeafIcon />
            <LeafIcon />
          </>
        )}
        <span className="font-semibold tracking-wide">
          {isLoading ? 'Comprando...' : 'Comprar Oferta'}
        </span>
      </div>
      
      {/* Partículas flotantes en hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-ping"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 2) * 20}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      )}
      
      {/* Efecto de brillo al hover */}
      <div 
        className={`
          absolute top-0 left-[-100%] w-full h-full
          bg-gradient-to-r from-transparent via-white to-transparent
          opacity-30 transition-all duration-500
          ${isHovered ? 'left-[100%]' : ''}
        `}
      />
    </button>
  );
};