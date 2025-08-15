// src/components/profile/ProfileCard.jsx
import React, { useState } from 'react';
import { QrCode } from "lucide-react";
import QRScannerModal from "../QRScannerModal";

export default function ProfileCard({ user, walletAddress, isWalletConnected, onEditClick }) {
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);

    const shortenAddress = (address) => {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 transition-all duration-300 hover:shadow-2xl">
            <div className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="relative group">
                            <img
                                src={user.avatar}
                                alt="Avatar"
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </div>
                        
                        <div className="md:ml-8 mt-6 md:mt-0 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-blue-600 mt-1">{user.role}</p>
                            <p className="text-gray-500 mt-2 max-w-md">{user.bio}</p>

                            {isWalletConnected && (
                                <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                                        <span className="text-sm font-medium text-emerald-700">Wallet conectada:</span>
                                    </div>
                                    <p className="font-mono text-sm text-emerald-800 mt-1">{shortenAddress(walletAddress)}</p>
                                </div>
                            )}

                            <div className="flex justify-center md:justify-start space-x-4 mt-4">
                                {user.social.twitter && (
                                    <a
                                        href={user.social.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-50 text-blue-500 hover:bg-blue-100 p-2 rounded-full transition-colors transform hover:scale-110"
                                        title="Twitter"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                )}
                                {user.social.instagram && (
                                    <a
                                        href={user.social.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-pink-50 text-pink-500 hover:bg-pink-100 p-2 rounded-full transition-colors transform hover:scale-110"
                                        title="Instagram"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="mt-6 md:mt-0 flex flex-col space-y-2">
                        <button
                            onClick={onEditClick}
                            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
                        >
                            <span>Editar Perfil</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* QR Modal */}
            <QRScannerModal 
                isOpen={isQRModalOpen} 
                onClose={() => setIsQRModalOpen(false)}
                userWallet={walletAddress}
            />
        </div>
    );
}
