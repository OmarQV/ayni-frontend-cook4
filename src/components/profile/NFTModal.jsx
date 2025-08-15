// src/components/profile/NFTModal.jsx
import React from 'react';

export default function NFTModal({ nft, onClose }) {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{ backgroundColor: 'rgba(100, 100, 100, 0.5)' }}
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative">
                    <img
                        src={nft.imageUrl}
                        alt={nft.title}
                        className="w-full h-64 object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                    >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{nft.title}</h3>
                    <div className="flex items-center text-emerald-600 mb-4">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{nft.location}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <div className="flex items-center mb-1">
                                <svg className="w-4 h-4 text-blue-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-xs text-blue-600 font-medium">Valor</p>
                            </div>
                            <p className="text-lg font-bold text-blue-800">{nft.valor}</p>
                        </div>
                        
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                            <div className="flex items-center mb-1">
                                <svg className="w-4 h-4 text-green-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <p className="text-xs text-green-600 font-medium">Beneficio comunidad</p>
                            </div>
                            <p className="text-lg font-bold text-green-800">{nft.beneficioComunidad}</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                            <svg className="w-4 h-4 mr-1 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Metadatos verificados
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-2 bg-gray-50 rounded-lg">
                                <svg className="w-5 h-5 text-blue-500 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg>
                                <p className="text-xs font-medium text-gray-700">{nft.metadata.fotos} Fotos</p>
                            </div>
                            
                            <div className="text-center p-2 bg-gray-50 rounded-lg">
                                <svg className="w-5 h-5 text-purple-500 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                                </svg>
                                <p className="text-xs font-medium text-gray-700">{nft.metadata.audios} Audios</p>
                            </div>
                            
                            {nft.metadata.qrVerified && (
                                <div className="text-center p-2 bg-green-50 rounded-lg border border-green-200">
                                    <svg className="w-5 h-5 text-green-500 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-xs font-medium text-green-700">QR Verificado</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-1">
                            <svg className="w-4 h-4 text-gray-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="text-xs font-medium text-gray-700">Coordenadas de ubicación:</p>
                        </div>
                        <p className="font-mono text-gray-800 bg-white p-1 rounded border text-center text-sm">{nft.coordinates}</p>
                    </div>

                    <div className="mt-4 text-xs text-gray-500 text-center">
                        <p>Emitido el {nft.issuedDate} • ID: #{nft.id}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
