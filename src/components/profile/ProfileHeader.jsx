// src/components/profile/ProfileHeader.jsx
import React from 'react';

export default function ProfileHeader() {
    return (
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 mb-2">
                Mi Perfil Turístico
            </h1>
            <p className="text-lg text-blue-700">Tu colección de experiencias y NFTs</p>
        </div>
    );
}