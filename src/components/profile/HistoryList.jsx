// src/components/profile/HistoryList.jsx
import React from 'react';

export default function HistoryList({ history }) {
    const getActivityIcon = (type) => {
        switch (type) {
            case 'visita':
                return (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                );
            case 'compra':
                return (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'tour':
                return (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                );
            default:
                return (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                );
        }
    };

    if (!history || history.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                    <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No hay actividad reciente</h3>
                <p className="mt-2 text-sm text-gray-500">
                    Comienza a explorar lugares y completar tours para ver tu historial aquí.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <ul className="divide-y divide-gray-100">
                {history.map((item) => (
                    <li
                        key={item.id}
                        className="p-4 hover:bg-gray-50 transition-colors duration-150"
                    >
                        <div className="flex items-start space-x-3">
                            {/* Icono circular */}
                            <div className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center ${
                                item.type === 'visita' ? 'bg-blue-50 text-blue-500' :
                                item.type === 'compra' ? 'bg-purple-50 text-purple-500' :
                                'bg-emerald-50 text-emerald-500'
                            }`}>
                                {getActivityIcon(item.type)}
                            </div>

                            {/* Contenido */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-baseline justify-between">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {item.title || item.action}
                                    </p>
                                    <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                                        {new Date(item.date).toLocaleDateString('es-ES', {
                                            day: 'numeric',
                                            month: 'short'
                                        })}
                                    </span>
                                </div>

                                {/* Descripción si existe */}
                                {item.description && (
                                    <p className="mt-1 text-sm text-gray-600">
                                        {item.description}
                                    </p>
                                )}

                                {/* Ubicación */}
                                {item.location && (
                                    <div className="mt-1 flex items-center text-sm text-gray-500">
                                        <svg className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="truncate">{item.location}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}