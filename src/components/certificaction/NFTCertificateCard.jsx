import React from 'react';
import CertificatePDFGenerator from './CertificatePDFGenerator';

const NFTCertificateCard = ({ certificate, userAddress, userData }) => {
  const handleDownloadPDF = () => {
    const pdfGenerator = new CertificatePDFGenerator();
    pdfGenerator.generateCertificate({
      certificate,
      userAddress,
      userData,
      downloadDate: new Date().toLocaleDateString()
    });
  };

  return (
    <div className="certificate-card bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 border-2 border-green-200 hover:shadow-lg transition-shadow">
      {/* Header con ícono */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">🏆</span>
        </div>
        <div>
          <h4 className="font-bold text-lg text-gray-800">{certificate.title}</h4>
          <p className="text-sm text-gray-600">📍 {certificate.location}</p>
        </div>
      </div>

      {/* Imagen del NFT */}
      <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {certificate.nftImage ? (
          <img 
            src={certificate.nftImage} 
            alt={certificate.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="text-6xl text-gray-400">🏛️</div>
      </div>

      {/* Información del certificado */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Token ID:</span>
          <span className="font-mono text-green-600">{certificate.tokenId}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Fecha:</span>
          <span className="text-gray-800">{certificate.date}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Coordenadas:</span>
          <span className="font-mono text-xs text-gray-600">{certificate.coordinates}</span>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="space-y-2">
        <button
          onClick={handleDownloadPDF}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          📄 Descargar Certificado PDF
        </button>
        
        <button className="w-full bg-blue-100 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-200 transition-colors flex items-center justify-center gap-2">
          🔗 Ver en Blockchain
        </button>
      </div>
    </div>
  );
};

export default NFTCertificateCard;