// src/pages/Tours.jsx
import React, { useState } from 'react';
import { sitiosCertificados } from '../mapa_interactivo/sitios';
import { useWallet } from '../hooks/useWallet';
import RouteModal from '../components/RouteModal';

// Example data of gamified routes
const rutasEjemplo = [
  {
    id: 1,
    nombre: "Mystical Altiplano Route",
    descripcion: "A tour of the most sacred sites of the Bolivian altiplano",
    precio: "0.5 MNT",
    duracion: "5 days",
    sitios: [
      sitiosCertificados.find(s => s.id === 2), // Isla del Sol
      sitiosCertificados.find(s => s.id === 3), // Tiwanaku
      sitiosCertificados.find(s => s.id === 12) // Copacabana
    ],
    color: "from-blue-500 to-cyan-400",
    totalTokens: 510
  },
  {
    id: 2,
    nombre: "Extreme Natural Adventure",
    descripcion: "For adventurers looking for unique landscapes",
    precio: "0.8 MNT",
    duracion: "7 days",
    sitios: [
      sitiosCertificados.find(s => s.id === 1), // Salar de Uyuni
      sitiosCertificados.find(s => s.id === 4), // Laguna Colorada
      sitiosCertificados.find(s => s.id === 15) // Laguna Verde
    ],
    color: "from-green-500 to-emerald-400",
    totalTokens: 680
  }
];

const Tours = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedSitio, setSelectedSitio] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [mintingNFT, setMintingNFT] = useState(false);

  const { isConnected, account, connectWallet } = useWallet();

  // QR scan simulator
  const handleQRScan = async () => {
    if (!isConnected) {
      await connectWallet();
      return;
    }

    setIsScanning(true);
    setScanComplete(false);

    // Simulate scan process (3 seconds)
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);

      // After 1 second, start minting
      setTimeout(() => {
        handleMintNFT();
      }, 1000);
    }, 3000);
  };

  // NFT minting simulator
  const handleMintNFT = async () => {
    setMintingNFT(true);

    // Simulate blockchain transaction (4 seconds)
    setTimeout(() => {
      setMintingNFT(false);

      // Show success and close modal
      setTimeout(() => {
        setScanComplete(false);
        setSelectedSitio(null);

        // Show success notification
        alert(`🎉 NFT obtained! You have earned ${selectedSitio?.tokens} tokens for visiting ${selectedSitio?.nombre}`);
      }, 2000);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-50 to-ocean-50 py-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🗺️ Gamified Routes
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore unique routes, collect NFTs and support local communities
        </p>
      </div>

      {/* Route Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
        {rutasEjemplo.map((ruta) => (
          <div key={ruta.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className={`h-32 bg-gradient-to-r ${ruta.color}`}>
              <div className="h-full flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white text-center px-4">
                  {ruta.nombre}
                </h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-4">{ruta.descripcion}</p>

              <div className="flex justify-between items-center mb-6">
                <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {ruta.precio}
                </span>
                <span className="text-gray-500 text-sm">{ruta.duracion}</span>
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                  {ruta.totalTokens} tokens
                </span>
              </div>

              <button
                onClick={() => setSelectedRoute(ruta)}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                View Route
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Route Modal */}
      {selectedRoute && (
        <RouteModal
          route={selectedRoute}
          onClose={() => setSelectedRoute(null)}
          onSitioClick={setSelectedSitio}
        />
      )}

      {/* Site Modal with QR Simulator */}
      {selectedSitio && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-800">{selectedSitio.nombre}</h3>
              <button
                onClick={() => {
                  setSelectedSitio(null);
                  setIsScanning(false);
                  setScanComplete(false);
                  setMintingNFT(false);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-600 mb-4">{selectedSitio.descripcion}</p>

            <div className="bg-gradient-to-r from-accent/10 to-accent/20 p-4 rounded-lg mb-6">
              <p className="text-sm font-semibold text-accent mb-2">NFT Reward:</p>
              <p className="text-2xl font-bold text-accent">{selectedSitio.tokens} tokens</p>
            </div>

            {/* Scan Process States */}
            {!isScanning && !scanComplete && !mintingNFT && (
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-32 h-32 mx-auto border-4 border-gray-300 border-dashed rounded-lg flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📱</div>
                      <div className="text-sm">QR Code</div>
                    </div>
                  </div>
                </div>

                {!isConnected ? (
                  <button
                    onClick={handleQRScan}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                  >
                    🔗 Connect Wallet to Scan
                  </button>
                ) : (
                  <button
                    onClick={handleQRScan}
                    className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                  >
                    📱 Scan QR for NFT
                  </button>
                )}
              </div>
            )}

            {/* State: Scanning */}
            {isScanning && (
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-32 h-32 mx-auto border-4 border-blue-500 rounded-lg flex items-center justify-center bg-blue-50 animate-pulse">
                    <div className="text-center">
                      <div className="text-4xl mb-2 animate-bounce">📷</div>
                      <div className="text-sm text-blue-600">Scanning...</div>
                    </div>
                  </div>
                </div>
                <p className="text-blue-600 font-semibold">📡 Scanning QR code...</p>
                <div className="mt-3 bg-blue-100 rounded-lg p-3">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent mr-2"></div>
                    <span className="text-sm text-blue-600">Verifying location...</span>
                  </div>
                </div>
              </div>
            )}

            {/* State: QR Scanned Successfully */}
            {scanComplete && !mintingNFT && (
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-32 h-32 mx-auto border-4 border-green-500 rounded-lg flex items-center justify-center bg-green-50">
                    <div className="text-center">
                      <div className="text-4xl mb-2">✅</div>
                      <div className="text-sm text-green-600">Verified!</div>
                    </div>
                  </div>
                </div>
                <p className="text-green-600 font-semibold mb-2">🎉 QR scanned successfully!</p>
                <p className="text-sm text-gray-600 mb-4">Starting NFT creation...</p>
                <div className="bg-green-100 rounded-lg p-3">
                  <div className="text-sm text-green-700">
                    📍 Verified location: {selectedSitio.nombre}
                  </div>
                </div>
              </div>
            )}

            {/* State: Minting NFT */}
            {mintingNFT && (
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-32 h-32 mx-auto border-4 border-purple-500 rounded-lg flex items-center justify-center bg-purple-50">
                    <div className="text-center">
                      <div className="text-4xl mb-2 animate-pulse">⚡</div>
                      <div className="text-sm text-purple-600">Minting...</div>
                    </div>
                  </div>
                </div>
                <p className="text-purple-600 font-semibold mb-2">🔗 Creating your NFT...</p>
                <div className="bg-purple-100 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-600 border-t-transparent mr-2"></div>
                    <span className="text-sm text-purple-600">Processing on Mantle Network...</span>
                  </div>
                  <div className="text-xs text-purple-500">
                    Wallet: {account?.slice(0, 6)}...{account?.slice(-4)}<br/>
                    Estimated gas: ~0.001 MNT
                  </div>
                </div>
                <div className="bg-yellow-100 rounded-lg p-3">
                  <div className="text-xs text-yellow-700">
                    💡 Your NFT will include: location, timestamp, and unique site metadata
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tours;