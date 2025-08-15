// src/components/profile/LoadingSpinner.jsx
import React from 'react';

export default function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg text-emerald-700 font-medium">Cargando tu perfil de turista...</p>
            </div>
        </div>
    );
}