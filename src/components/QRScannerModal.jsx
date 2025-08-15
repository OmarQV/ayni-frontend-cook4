import React, { useState, useEffect } from 'react';
import { Camera, QrCode, Gift, MapPin, Star, X, CheckCircle, Loader } from 'lucide-react';
import NFTModal from './profile/NFTModal'; // Ensure the path is correct

const QRScannerModal = ({ isOpen, onClose, onNFTMinted }) => {
  const [scanningMode, setScanningMode] = useState('camera');
  const [scannedData, setScannedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mintingStatus, setMintingStatus] = useState(null);
  const [nftMinted, setNftMinted] = useState(null);
  const [manualCode, setManualCode] = useState('');
  const [scanning, setScanning] = useState(false);
  const [showNFTModal, setShowNFTModal] = useState(false);

  // Fixed QR data - all in temporary memory
  const mockQRData = {
    'AYNI-COL-001': {
      location: 'Hacienda Cafetera El Paraíso',
      country: 'Colombia',
      route: 'Ruta del Café en Colombia',
      coordinates: '4.5981, -75.2958',
      nft: {
        id: 301,
        title: 'Colombian Coffee NFT',
        issuedDate: new Date().toISOString().split('T')[0],
        imageUrl: 'https://img.freepik.com/foto-gratis/delicioso-cafe-organico-naturaleza-muerta_23-2151762341.jpg?semt=ais_hybrid&w=740&q=80',
        valor: '0.05 ETH',
        beneficioComunidad: '30%',
        metadata: { fotos: 3, audios: 1, qrVerified: true },
        description: 'You have visited an authentic coffee farm in the heart of Colombia',
        rarity: 'Common',
        points: 50
      }
    },
    'AYNI-PER-002': {
      location: 'Machu Picchu',
      country: 'Perú',
      route: 'Ancestral Inca Trail',
      coordinates: '-13.1631, -72.5450',
      nft: {
        id: 302,
        title: 'Inca Citadel NFT',
        issuedDate: new Date().toISOString().split('T')[0],
        imageUrl: 'https://content-viajes.nationalgeographic.com.es/medio/2018/03/01/machu-picchu_5ff969ae_1280x720.jpg',
        valor: '0.08 ETH',
        beneficioComunidad: '40%',
        metadata: { fotos: 5, audios: 2, qrVerified: true },
        description: 'You have explored the majestic citadel of Machu Picchu',
        rarity: 'Epic',
        points: 150
      }
    },
    'AYNI-BOL-003': {
      location: 'Salar de Uyuni',
      country: 'Bolivia',
      route: 'Bolivian Altiplano',
      coordinates: '-20.1338, -67.4891',
      nft: {
        id: 303,
        title: 'Sky Mirror NFT',
        issuedDate: new Date().toISOString().split('T')[0],
        imageUrl: 'https://uploads.exoticca.com/global/destination/poi/salar-uyuni.png',
        valor: '0.10 ETH',
        beneficioComunidad: '50%',
        metadata: { fotos: 4, audios: 1, qrVerified: true },
        description: 'You have walked on the largest mirror in the world',
        rarity: 'Legendary',
        points: 200
      }
    },
    'AYNI-ECU-004': {
      location: 'Otavalo Market',
      country: 'Ecuador',
      route: 'Andean Traditions',
      coordinates: '0.2343, -78.2628',
      nft: {
        id: 304,
        title: 'Ancestral Textile NFT',
        issuedDate: new Date().toISOString().split('T')[0],
        imageUrl: 'https://pieraceresa.cl/cdn/shop/articles/textil-unsplash.jpg?v=1659477454&width=1100',
        valor: '0.06 ETH',
        beneficioComunidad: '35%',
        metadata: { fotos: 3, audios: 1, qrVerified: true },
        description: 'You have discovered the textile traditions of the Andean peoples',
        rarity: 'Rare',
        points: 75
      }
    }
  };

  useEffect(() => {
    if (isOpen && scanningMode === 'camera') {
      startCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [isOpen, scanningMode]);

  const startCamera = async () => {
    try {
      setScanning(true);
      // Simulate automatic scanning after 3 seconds
      setTimeout(() => {
        const randomCodes = Object.keys(mockQRData);
        const randomCode = randomCodes[Math.floor(Math.random() * randomCodes.length)];
        simulateQRDetection(randomCode);
      }, 3000);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    setScanning(false);
  };

  const simulateQRDetection = (qrCode) => {
    setScanning(false);
    processQRCode(qrCode);
  };

  const processQRCode = async (qrCode) => {
    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (mockQRData[qrCode]) {
      setScannedData(mockQRData[qrCode]);
      setTimeout(() => {
        mintNFT(mockQRData[qrCode]);
      }, 2000);
    } else {
      setMintingStatus('error');
      setIsProcessing(false);
    }
  };

  const mintNFT = async (locationData) => {
    try {
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mintedNFT = {
        ...locationData.nft,
        location: `${locationData.location}, ${locationData.country}`,
        coordinates: locationData.coordinates,
        tokenId: locationData.nft.id,
        gasUsed: '0.00012 MNT',
        blockNumber: 1500000 + locationData.nft.id,
        metadata: locationData.nft.metadata,
        mintedAt: new Date().toISOString() // Mint timestamp
      };
      
      setNftMinted(mintedNFT);
      setMintingStatus('success');
      setIsProcessing(false);
      
      // Send the minted NFT to the parent component (NFTGrid)
      if (onNFTMinted) {
        onNFTMinted(mintedNFT);
      }
    } catch (error) {
      console.error('Error minting NFT:', error);
      setMintingStatus('error');
      setIsProcessing(false);
    }
  };

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      processQRCode(manualCode.trim());
    }
  };

  const resetScanner = () => {
    setScannedData(null);
    setNftMinted(null);
    setMintingStatus(null);
    setManualCode('');
    setIsProcessing(false);
    setScanning(false);
  };

  const handleClose = () => {
    resetScanner();
    onClose();
  };

  const handleViewDetails = () => {
    setShowNFTModal(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Scan QR</h2>
              <p className="text-sm text-gray-600">Travel-to-Earn</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!scannedData && !isProcessing && (
            <>
              {/* Mode Selector */}
              <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                <button
                  onClick={() => setScanningMode('camera')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    scanningMode === 'camera'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600'
                  }`}
                >
                  <Camera className="w-4 h-4 inline mr-2" />
                  Camera
                </button>
                <button
                  onClick={() => setScanningMode('manual')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    scanningMode === 'manual'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600'
                  }`}
                >
                  <QrCode className="w-4 h-4 inline mr-2" />
                  Manual
                </button>
              </div>

              {/* Camera Mode */}
              {scanningMode === 'camera' && (
                <div className="text-center">
                  <div className="relative bg-gray-900 rounded-xl overflow-hidden mb-4">
                    <div className="aspect-square flex items-center justify-center">
                      {scanning ? (
                        <div className="flex flex-col items-center text-white">
                          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
                          <p>Searching for QR code...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-white">
                          <Camera className="w-16 h-16 mb-4" />
                          <p>Camera simulation</p>
                        </div>
                      )}
                    </div>
                    
                    {/* QR Frame Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 border-2 border-white rounded-xl relative">
                        <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-orange-400 rounded-tl-xl"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-orange-400 rounded-tr-xl"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-orange-400 rounded-bl-xl"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-orange-400 rounded-br-xl"></div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    Point your camera at the QR code at the point of interest
                  </p>
                  
                  {!scanning && (
                    <button
                      onClick={startCamera}
                      className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-shadow"
                    >
                      Start Scan
                    </button>
                  )}
                </div>
              )}

              {/* Manual Mode */}
              {scanningMode === 'manual' && (
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Manual QR Code
                    </label>
                    <input
                      type="text"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      placeholder="Ej: AYNI-COL-001"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
                    />
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-4 mb-4">
                    <h4 className="font-medium text-blue-900 mb-2">Test Codes:</h4>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p><code className="bg-white px-2 py-1 rounded">AYNI-COL-001</code> - Coffee Farm (Colombia)</p>
                      <p><code className="bg-white px-2 py-1 rounded">AYNI-PER-002</code> - Machu Picchu (Peru)</p>
                      <p><code className="bg-white px-2 py-1 rounded">AYNI-BOL-003</code> - Salar de Uyuni (Bolivia)</p>
                      <p><code className="bg-white px-2 py-1 rounded">AYNI-ECU-004</code> - Otavalo Market (Ecuador)</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleManualSubmit}
                    disabled={!manualCode.trim()}
                    className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
                  >
                    Process Code
                  </button>
                </div>
              )}
            </>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader className="w-8 h-8 text-white animate-spin" />
              </div>
              
              {!nftMinted ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Verifying location...
                  </h3>
                  <p className="text-gray-600">
                    Confirming your visit to the destination
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Minting your NFT...
                  </h3>
                  <p className="text-gray-600">
                    Creating your digital memory on Mantle L2
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Success State */}
          {mintingStatus === 'success' && nftMinted && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                NFT Minted Successfully!
              </h3>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <img
                  src={nftMinted.imageUrl}
                  alt={nftMinted.title}
                  className="w-32 h-32 mx-auto rounded-xl mb-4 object-cover"
                />
                
                <h4 className="font-bold text-gray-900 mb-1">{nftMinted.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{nftMinted.description}</p>
                
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-xs">{nftMinted.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{nftMinted.rarity}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4 mb-4">
                <h5 className="font-medium text-green-900 mb-2">Transaction Details</h5>
                <div className="text-sm text-green-800 space-y-1">
                  <p><strong>Token ID:</strong> #{nftMinted.id}</p>
                  <p><strong>Value:</strong> {nftMinted.valor}</p>
                  <p><strong>Community Benefit:</strong> {nftMinted.beneficioComunidad}</p>
                  <p><strong>Network:</strong> Mantle L2</p>
                  <p><strong>Points Earned:</strong> +{nftMinted.points}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={resetScanner}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Scan Another
                </button>
                <button
                  onClick={handleViewDetails}
                  className="flex-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-shadow"
                >
                  View Details
                </button>
              </div>
            </div>
          )}

          {/* Error State */}
          {mintingStatus === 'error' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Error Processing QR
              </h3>
              <p className="text-gray-600 mb-4">
                The QR code is invalid or has already been used
              </p>
              
              <button
                onClick={resetScanner}
                className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-shadow"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Info Footer */}
        {!isProcessing && mintingStatus !== 'success' && (
          <div className="px-6 pb-6">
            <div className="bg-orange-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Gift className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-900 mb-1">
                    Ayni Principle - Reciprocity
                  </h4>
                  <p className="text-sm text-orange-800">
                    By scanning this QR, you contribute directly to the local community 
                    and receive a unique NFT as a memory of your experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* NFT Modal */}
      {showNFTModal && nftMinted && (
        <NFTModal 
          nft={nftMinted} 
          onClose={() => setShowNFTModal(false)}
        />
      )}
    </div>
  );
};

export default QRScannerModal;