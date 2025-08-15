import React from "react";

const FiltroDestinos = ({ filtros, setFiltros, paises }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8 card-shadow fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 mr-2 text-[var(--color-primary)]" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
          />
        </svg>
        Filtrar destinos turísticos
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Filtro por país */}
        <div className="space-y-2">
          <label htmlFor="pais" className="block text-sm font-medium text-gray-700 flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1 text-[var(--color-secondary)]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            País
          </label>
          <select
            id="pais"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all duration-200 hover:border-[var(--color-secondary)]"
            value={filtros.pais}
            onChange={(e) => setFiltros({ ...filtros, pais: e.target.value })}
          >
            <option value="">Todos los países</option>
            {paises.map((pais) => (
              <option key={pais} value={pais}>
                {pais}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por tipo */}
        <div className="space-y-2">
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1 text-[var(--color-secondary)]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" 
              />
            </svg>
            Tipo de destino
          </label>
          <select
            id="tipo"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all duration-200 hover:border-[var(--color-secondary)]"
            value={filtros.tipo}
            onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
          >
            <option value="">Todos los tipos</option>
            <option value="ecologico">Ecológico</option>
            <option value="cultural">Cultural</option>
          </select>
        </div>

        {/* Filtro por accesibilidad */}
        <div className="space-y-2">
          <label htmlFor="accesibilidad" className="block text-sm font-medium text-gray-700 flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1 text-[var(--color-secondary)]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
              />
            </svg>
            Nivel de acceso
          </label>
          <select
            id="accesibilidad"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all duration-200 hover:border-[var(--color-secondary)]"
            value={filtros.accesibilidad}
            onChange={(e) =>
              setFiltros({ ...filtros, accesibilidad: e.target.value })
            }
          >
            <option value="">Todas las opciones</option>
            <option value="alta">Alta accesibilidad</option>
            <option value="media">Accesibilidad media</option>
            <option value="baja">Difícil acceso</option>
          </select>
        </div>
      </div>
      
      {/* Botón de reset */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setFiltros({ pais: "", tipo: "", accesibilidad: "" })}
          className="px-4 py-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors duration-200 flex items-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </svg>
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

export default FiltroDestinos;