// src/components/RouteModal.jsx
import React from 'react';

const RouteModal = ({ route, onClose, onSitioClick }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className={`bg-gradient-to-r ${route.color} p-6 text-white relative`}>
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl"
            >
                ✕
            </button>
            <h2 className="text-3xl font-bold mb-2">{route.nombre}</h2>
            <p className="text-white/90">{route.descripcion}</p>
            </div>

            {/* Contenido */}
            <div className="p-6">
            {/* Info de la ruta */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-accent">{route.precio}</div>
                <div className="text-sm text-gray-600">Precio del pase</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{route.duracion}</div>
                <div className="text-sm text-gray-600">Duración</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-secondary">{route.totalTokens}</div>
                <div className="text-sm text-gray-600">Tokens totales</div>
                </div>
            </div>

            {/* Recorrido gamificado */}
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                🗺️ Mapa del Circuito
            </h3>
            
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 mb-6">
                <div className="flex flex-wrap items-center justify-center gap-4">
                {/* Punto de INICIO */}
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-sm shadow-lg animate-pulse">
                    🚀<br/>INICIO
                    </div>
                    <span className="text-xs text-green-600 font-semibold mt-2">Punto de partida</span>
                </div>

                {/* Flecha */}
                <div className="text-3xl text-gray-400 animate-bounce">→</div>

                {/* Sitios del recorrido */}
                {route.sitios.map((sitio, index) => (
                    <React.Fragment key={sitio.id}>
                    <div className="flex flex-col items-center">
                        <div 
                        className={`w-20 h-20 rounded-full bg-gradient-to-r ${
                            index === 0 ? 'from-blue-500 to-blue-600' :
                            index === 1 ? 'from-purple-500 to-purple-600' :
                            'from-orange-500 to-orange-600'
                        } flex flex-col items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-all shadow-lg border-4 border-white`}
                        onClick={() => onSitioClick(sitio)}
                        >
                        <div className="text-2xl">{index === 0 ? '🏛️' : index === 1 ? '🌊' : '🏔️'}</div>
                        <div className="text-xs">{index + 1}</div>
                        </div>
                        <span className="text-xs text-center text-gray-700 font-semibold mt-2 max-w-20">
                        {sitio.nombre.split(' ')[0]}
                        </span>
                        <div className="bg-accent text-gray-700 px-2 py-1 rounded-full text-xs font-bold mt-1">
                        {sitio.tokens} NFT
                        </div>
                    </div>

                    {/* Flecha entre sitios */}
                    {index < route.sitios.length - 1 && (
                        <div className="text-3xl text-gray-400 animate-bounce">→</div>
                    )}
                    </React.Fragment>
                ))}

                {/* Flecha final */}
                <div className="text-3xl text-gray-400 animate-bounce">→</div>

                {/* Punto de FIN */}
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-sm shadow-lg animate-pulse">
                    🏆<br/>FIN
                    </div>
                    <span className="text-xs text-red-600 font-semibold mt-2">¡Completado!</span>
                </div>
                </div>

                {/* Leyenda del circuito */}
                <div className="mt-8 bg-white/70 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-3">📍 Detalles del Circuito:</h4>
                <div className="space-y-2">
                    {route.sitios.map((sitio, index) => (
                    <div 
                        key={sitio.id}
                        className="flex items-center justify-between cursor-pointer hover:bg-white/50 p-2 rounded-lg transition-colors"
                        onClick={() => onSitioClick(sitio)}
                    >
                        <div className="flex items-center">
                        <span className={`w-6 h-6 rounded-full ${
                            index === 0 ? 'bg-blue-500' :
                            index === 1 ? 'bg-purple-500' :
                            'bg-orange-500'
                        } text-white text-xs flex items-center justify-center font-bold mr-3`}>
                            {index + 1}
                        </span>
                        <span className="font-semibold text-gray-800">{sitio.nombre}</span>
                        </div>
                        <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">⭐ {sitio.rating}/5</span>
                        <span className="bg-accent text-white px-2 py-1 rounded-full text-xs">
                            {sitio.tokens} tokens
                        </span>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>

            {/* Botón de compra */}
            <div className="text-center mt-8">
                <button className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 px-8 rounded-2xl text-lg hover:shadow-xl transition-all">
                🎫 Comprar Pase NFT - {route.precio}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                Una vez comprado, podrás escanear QRs en cada sitio para coleccionar NFTs
                </p>
            </div>
            </div>
        </div>
        </div>
    );
};

export default RouteModal;