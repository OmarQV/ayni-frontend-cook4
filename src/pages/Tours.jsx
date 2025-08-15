// src/pages/Tours.jsx
import React, { useState } from 'react';
import { sitiosCertificados } from '../mapa_interactivo/sitios';
import { useWallet } from '../hooks/useWallet';
import RouteModal from '../components/RouteModal';

// Datos de ejemplo de rutas gamificadas
const rutasEjemplo = [
    {
        id: 1,
        nombre: "Ruta del Altiplano Místico",
        descripcion: "Un recorrido por los sitios más sagrados del altiplano boliviano",
        precio: "0.5 MNT",
        duracion: "5 días",
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
        nombre: "Aventura Natural Extrema",
        descripcion: "Para los aventureros que buscan paisajes únicos",
        precio: "0.8 MNT",
        duracion: "7 días", 
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

    // Simulador de escaneo QR
    const handleQRScan = async () => {
        if (!isConnected) {
        await connectWallet();
        return;
        }

        setIsScanning(true);
        setScanComplete(false);

        // Simular proceso de escaneo (3 segundos)
        setTimeout(() => {
        setIsScanning(false);
        setScanComplete(true);
        
        // Después de 1 segundo, iniciar el minting
        setTimeout(() => {
            handleMintNFT();
        }, 1000);
        }, 3000);
    };

    // Simulador de minting NFT
    const handleMintNFT = async () => {
        setMintingNFT(true);

        // Simular transacción en blockchain (4 segundos)
        setTimeout(() => {
        setMintingNFT(false);
        
        // Mostrar éxito y cerrar modal
        setTimeout(() => {
            setScanComplete(false);
            setSelectedSitio(null);
            
            // Mostrar notificación de éxito
            alert(`🎉 ¡NFT obtenido! Has ganado ${selectedSitio?.tokens} tokens por visitar ${selectedSitio?.nombre}`);
        }, 2000);
        }, 4000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-nature-50 to-ocean-50 py-12 px-4">
        {/* Header */}
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🗺️ Rutas Gamificadas
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora rutas únicas, colecciona NFTs y apoya a las comunidades locales
            </p>
        </div>

        {/* Grid de Rutas */}
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
                    Ver Recorrido
                </button>
                </div>
            </div>
            ))}
        </div>

        {/* Modal de Ruta */}
        {selectedRoute && (
            <RouteModal 
            route={selectedRoute}
            onClose={() => setSelectedRoute(null)}
            onSitioClick={setSelectedSitio}
            />
        )}

        {/* Modal de Sitio con Simulador QR */}
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
                <p className="text-sm font-semibold text-accent mb-2">Recompensa NFT:</p>
                <p className="text-2xl font-bold text-accent">{selectedSitio.tokens} tokens</p>
                </div>

                {/* Estados del proceso de escaneo */}
                {!isScanning && !scanComplete && !mintingNFT && (
                <div className="text-center">
                    <div className="mb-4">
                    <div className="w-32 h-32 mx-auto border-4 border-gray-300 border-dashed rounded-lg flex items-center justify-center text-gray-400">
                        <div className="text-center">
                        <div className="text-4xl mb-2">📱</div>
                        <div className="text-sm">Código QR</div>
                        </div>
                    </div>
                    </div>
                    
                    {!isConnected ? (
                    <button 
                        onClick={handleQRScan}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        🔗 Conectar Wallet para Escanear
                    </button>
                    ) : (
                    <button 
                        onClick={handleQRScan}
                        className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        📱 Escanear QR para NFT
                    </button>
                    )}
                </div>
                )}

                {/* Estado: Escaneando */}
                {isScanning && (
                <div className="text-center">
                    <div className="mb-4">
                    <div className="w-32 h-32 mx-auto border-4 border-blue-500 rounded-lg flex items-center justify-center bg-blue-50 animate-pulse">
                        <div className="text-center">
                        <div className="text-4xl mb-2 animate-bounce">📷</div>
                        <div className="text-sm text-blue-600">Escaneando...</div>
                        </div>
                    </div>
                    </div>
                    <p className="text-blue-600 font-semibold">📡 Escaneando código QR...</p>
                    <div className="mt-3 bg-blue-100 rounded-lg p-3">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent mr-2"></div>
                        <span className="text-sm text-blue-600">Verificando ubicación...</span>
                    </div>
                    </div>
                </div>
                )}

                {/* Estado: QR Escaneado con éxito */}
                {scanComplete && !mintingNFT && (
                <div className="text-center">
                    <div className="mb-4">
                    <div className="w-32 h-32 mx-auto border-4 border-green-500 rounded-lg flex items-center justify-center bg-green-50">
                        <div className="text-center">
                        <div className="text-4xl mb-2">✅</div>
                        <div className="text-sm text-green-600">¡Verificado!</div>
                        </div>
                    </div>
                    </div>
                    <p className="text-green-600 font-semibold mb-2">🎉 ¡QR escaneado con éxito!</p>
                    <p className="text-sm text-gray-600 mb-4">Iniciando creación de NFT...</p>
                    <div className="bg-green-100 rounded-lg p-3">
                    <div className="text-sm text-green-700">
                        📍 Ubicación verificada: {selectedSitio.nombre}
                    </div>
                    </div>
                </div>
                )}

                {/* Estado: Creando NFT */}
                {mintingNFT && (
                <div className="text-center">
                    <div className="mb-4">
                    <div className="w-32 h-32 mx-auto border-4 border-purple-500 rounded-lg flex items-center justify-center bg-purple-50">
                        <div className="text-center">
                        <div className="text-4xl mb-2 animate-pulse">⚡</div>
                        <div className="text-sm text-purple-600">Minteando...</div>
                        </div>
                    </div>
                    </div>
                    <p className="text-purple-600 font-semibold mb-2">🔗 Creando tu NFT...</p>
                    <div className="bg-purple-100 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-center mb-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-600 border-t-transparent mr-2"></div>
                        <span className="text-sm text-purple-600">Procesando en Mantle Network...</span>
                    </div>
                    <div className="text-xs text-purple-500">
                        Wallet: {account?.slice(0, 6)}...{account?.slice(-4)}<br/>
                        Gas estimado: ~0.001 MNT
                    </div>
                    </div>
                    <div className="bg-yellow-100 rounded-lg p-3">
                    <div className="text-xs text-yellow-700">
                        💡 Tu NFT incluirá: ubicación, timestamp y metadatos únicos del sitio
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