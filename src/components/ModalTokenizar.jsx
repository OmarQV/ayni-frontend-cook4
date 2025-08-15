import React from 'react';

const ModalTokenizar = ({ isOpen, onClose, destino }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Tokenizar: {destino?.nombre}</h2>
        <p className="mb-6">{destino?.descripcion}</p>
        <div className="flex justify-end space-x-4">
          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              alert(`Tokenizando destino: ${destino?.nombre}`);
              onClose();
            }}
          >
            Confirmar Tokenización
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalTokenizar;
