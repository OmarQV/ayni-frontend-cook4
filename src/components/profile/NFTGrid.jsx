// src/components/profile/NFTGrid.jsx
import React, { useState, useEffect } from 'react';
import { QrCode } from 'lucide-react';
import QRScannerModal from '../QRScannerModal';

export default function NFTGrid({ nfts, onNFTClick }) {
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [userNFTs, setUserNFTs] = useState([]);
    const [combinedNFTs, setCombinedNFTs] = useState([]);

    // Cargar NFTs al montar el componente
    useEffect(() => {
        const savedNFTs = localStorage.getItem('ayni_user_nfts');
        if (savedNFTs) {
            setUserNFTs(JSON.parse(savedNFTs));
        }
    }, []);

    // Combinar NFTs iniciales con los nuevos
    useEffect(() => {
        setCombinedNFTs([...nfts, ...userNFTs]);
    }, [nfts, userNFTs]);

    // Función para agregar nuevo NFT
    const addNFT = (newNFT) => {
        const updatedNFTs = [...userNFTs, newNFT];
        setUserNFTs(updatedNFTs);
        localStorage.setItem('ayni_user_nfts', JSON.stringify(updatedNFTs));
    };

    return (
        <div>
            {/* Botón para escanear nuevos NFTs */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => setIsScannerOpen(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-shadow"
                >
                    <QrCode className="w-5 h-5" />
                    Escanear nuevo NFT
                </button>
            </div>

            {/* Grid de NFTs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {combinedNFTs.map((nft) => (
                    <div
                        key={`${nft.id}-${nft.tokenId || ''}`}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer transform hover:scale-105"
                        onClick={() => onNFTClick(nft)}
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={nft.imageUrl}
                                alt={nft.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900 to-transparent opacity-70"></div>
                            <div className="absolute bottom-0 left-0 p-4">
                                <div className="flex items-center text-emerald-200">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm">{nft.location}</span>
                                </div>
                            </div>
                            
                            <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1 text-sm font-semibold text-emerald-700 shadow-lg">
                                {nft.valor}
                            </div>
                        </div>
                        
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-500 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Fecha
                                </span>
                                <span className="text-sm font-medium text-gray-700">{nft.issuedDate}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Beneficio comunidad
                                </span>
                                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                    {nft.beneficioComunidad}
                                </span>
                            </div>

                            {/* Indicadores de metadata */}
                            <div className="flex items-center justify-center space-x-4 mt-3 pt-3 border-t border-gray-100">
                                <div className="flex items-center text-xs text-gray-500">
                                    <svg className="w-3 h-3 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                    </svg>
                                    {nft.metadata?.fotos || 0}
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                    <svg className="w-3 h-3 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                                    </svg>
                                    {nft.metadata?.audios || 0}
                                </div>
                                {nft.metadata?.qrVerified && (
                                    <div className="flex items-center text-xs text-green-600">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Verificado
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal del escáner QR */}
            <QRScannerModal 
                isOpen={isScannerOpen} 
                onClose={() => setIsScannerOpen(false)}
                onNFTMinted={addNFT}
            />
        </div>
    );
}