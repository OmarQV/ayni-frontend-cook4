import React from "react";
import PropTypes from "prop-types";

const ProgressList = ({ progress }) => {
  if (!progress || progress.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
          <svg
            className="w-8 h-8 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">
          No hay avances registrados
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Los avances del proyecto aparecerán aquí.
        </p>
      </div>
    );
  }

  const stateColors = {
    pendiente: "bg-yellow-100 text-yellow-800",
    en_progreso: "bg-blue-100 text-blue-800",
    completado: "bg-green-100 text-green-800",
  };

  const handleVerDetalles = (item) => {
    console.log("Ver detalles de:", item);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="divide-y divide-gray-200">
        {progress.map((item) => (
          <div
            key={item.id}
            className="p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center hover:bg-gray-50 transition-colors duration-150"
          >
            {/* Columna izquierda: info principal */}
            <div className="mb-4 sm:mb-0">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.etapa}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                <span className="inline-flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {new Date(item.fecha).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
              <p className="text-sm text-gray-600 mt-2">{item.descripcion}</p>

              {/* Enlace a evidencia en IPFS */}
              {item.evidenciaHash && (
                <a
                  href={`https://ipfs.io/ipfs/${item.evidenciaHash.replace(
                    "ipfs://",
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-2 text-xs text-blue-600 hover:text-blue-800"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Ver evidencia
                </a>
              )}
            </div>

            {/* Columna derecha: estado y botón */}
            <div className="flex items-center space-x-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  stateColors[item.estado] || "bg-gray-100 text-gray-800"
                }`}
              >
                {item.estado.replace("_", " ")}
              </span>
              <button
                className="inline-flex items-center px-4 py-2 text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded-md shadow transition-colors duration-150"
                onClick={() => handleVerDetalles(item)}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Ver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ProgressList.propTypes = {
  progress: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      etapa: PropTypes.string.isRequired,
      descripcion: PropTypes.string.isRequired,
      fecha: PropTypes.string.isRequired,
      estado: PropTypes.oneOf([
        "pendiente",
        "en_progreso",
        "completado",
      ]).isRequired,
      evidenciaHash: PropTypes.string,
    })
  ),
};

export default ProgressList;
