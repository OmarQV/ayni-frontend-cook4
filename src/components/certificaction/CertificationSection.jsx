import React, { useState, useEffect } from 'react';
import NFTCertificateCard from './NFTCertificateCard';
import CertificatePDFGenerator from './CertificatePDFGenerator';

const CertificationSection = ({ userAddress, userData }) => {
  const [showCertificates, setShowCertificates] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);

  // Datos de certificados de ejemplo
  const mockCertificates = [
    {
      id: 1,
      title: "Visitó la Isla del Sol",
      location: "Lago Titicaca",
      date: "9 años",
      nftImage: "/certificates/isla-del-sol.png",
      description: "Certificado de visita a la Isla del Sol en el Lago Titicaca",
      coordinates: "-15.7642, -69.1792",
      tokenId: "TIT001"
    },
    {
      id: 2,
      title: "Adquirió NFT de Tiwanaku",
      location: "Tiwanaku",
      date: "14 años", 
      nftImage: "/certificates/tiwanaku.png",
      description: "Certificado de adquisición de NFT conmemorativo de Tiwanaku",
      coordinates: "-16.5547, -68.6739",
      tokenId: "TIW002"
    }
  ];

  const handleShowCertificates = async () => {
    setLoading(true);
    setShowCertificates(true);
    
    // Simular carga de certificados
    setTimeout(() => {
      setCertificates(mockCertificates);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="certification-section mt-8">
      {/* Botón principal */}
      {!showCertificates && (
        <div className="text-center">
          <button
            onClick={handleShowCertificates}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
          >
            🏆 Mis Certificados NFT
          </button>
        </div>
      )}

      {/* Sección de certificados */}
      {showCertificates && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              🏆 Mis Certificados NFT
            </h3>
            <button
              onClick={() => setShowCertificates(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando certificados...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((certificate) => (
                <NFTCertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  userAddress={userAddress}
                  userData={userData}
                />
              ))}
            </div>
          )}

          {certificates.length === 0 && !loading && (
            <div className="text-center py-8">
              <p className="text-gray-500">No tienes certificados NFT aún</p>
              <p className="text-sm text-gray-400 mt-2">
                Completa experiencias turísticas para obtener certificados
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CertificationSection;