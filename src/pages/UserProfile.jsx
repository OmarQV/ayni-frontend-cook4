
import React, { useEffect, useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import ModalTokenizar from '../components/ModalTokenizar';
import LoadingSpinner from '../components/profile/LoadingSpinner';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileCard from '../components/profile/ProfileCard';
import TabNavigation from '../components/profile/TabNavigation';
import NFTGrid from '../components/profile/NFTGrid';
import HistoryList from '../components/profile/HistoryList';
import ReservationsList from '../components/profile/ReservationsList';
import NFTModal from '../components/profile/NFTModal';
import EditProfileModal from '../components/profile/EditProfileModal';
import ProgressList from '../components/profile/ProgressList';


const initialTuristaData = {
    name: 'Jose Fernandez',
    email: 'jose@gmail.com',
    avatar: 'https://i.pravatar.cc/150?u=jhamil',
    role: 'Turista responsable',
    bio: 'Apasionado por el turismo sostenible y la preservación cultural',
    social: {
        twitter: 'https://twitter.com/jose',
        instagram: 'https://instagram.com/jose',
    },
    historial: [
        { id: 1, date: '2025-01-10', action: 'Visitó la Isla del Sol', location: 'Lago Titicaca', type: 'visita' },
        { id: 2, date: '2025-01-15', action: 'Adquirió NFT de Tiwanaku', location: 'Tiwanaku', type: 'compra' },
        { id: 3, date: '2025-02-20', action: 'Completó tour en Sajama', location: 'Parque Nacional Sajama', type: 'tour' },
    ],
    nfts: [
        { id: 101, title: 'Isla del Sol - Atardecer', issuedDate: '2025-01-10', imageUrl: 'https://ganasdemundo.com/wp-content/uploads/2020/04/isla-del-sol-4-scaled.jpg', location: 'Lago Titicaca', coordinates: '-16.0170, -69.1818', valor: '0.05 ETH', beneficioComunidad: '30%', metadata: { fotos: 3, audios: 1, qrVerified: true } },
        { id: 102, title: 'Tiwanaku - Puerta del Sol', issuedDate: '2025-01-15', imageUrl: 'https://ahoraelpueblo.bo/images/noticias/Cultura/2024/09/Tiwanaku-3-0224.jpg', location: 'Tiwanaku', coordinates: '-16.5547, -68.6734', valor: '0.08 ETH', beneficioComunidad: '40%', metadata: { fotos: 5, audios: 2, qrVerified: true } },
    ],
    reservas: [
        { id: 201, lugar: 'Parque Nacional Sajama', fecha: '2025-03-15', codigo: 'SAJA-789456', estado: 'confirmada', ticketHash: '0x89a4be...4582f' }
    ]
};

const initialOperadorData = {
    name: 'Operadora "Ayni Tours"',
    email: 'aynitours@example.com',
    avatar: 'https://i.pravatar.cc/150?u=aynitours',
    role: 'Operador Certificado',
    bio: 'Nos especializamos en rutas turísticas sostenibles en el altiplano boliviano.',
    ventas: 45,
    rutasPublicadas: 3,
    ingresos: '15.2 ETH',
    social: {
        twitter: 'https://twitter.com/aynitours',
        instagram: 'https://instagram.com/aynitours',
    },
};


export default function UserProfile() {
    const {
        isConnected,
        account: walletAddress,
        userType,
        registerUser,
        connectWallet,
        loading: walletLoading
    } = useWallet();

    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('nfts');
    const [selectedNFT, setSelectedNFT] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [userData, setUserData] = useState(null);


    const progressData = [
        {
            id: 1,
            etapa: "Lanzamiento MVP",
            descripcion: "Publicación de la primera versión en Mantle L2",
            fecha: "2025-08-10",
            estado: "completado",
            evidenciaHash: "ipfs://Qm123abc456def"
        },
        {
            id: 2,
            etapa: "Integración con comunidades",
            descripcion: "Registro de las primeras 5 rutas turísticas",
            fecha: "2025-08-20",
            estado: "en_progreso"
        }
    ];

    // Inicializar datos del usuario basado en el tipo
    useEffect(() => {
        if (userType) {
            setUserData(userType === 'turista'
                ? { ...initialTuristaData }
                : { ...initialOperadorData });

            // Simulación de carga de datos
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [userType]);

    const handleConnectWallet = async () => {
        try {
            await connectWallet();
        } catch (err) {
            console.error("Error al conectar la wallet:", err);
        }
    };

    const handleUpdateProfile = (updatedData) => {
        setUserData(prev => ({
            ...prev,
            ...updatedData
        }));
        setShowEditModal(false);
    };

    //
    const renderOperatorTabContent = () => {
        switch (activeTab) {
            case 'nfts':
                return (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">NFTs de Rutas</h3>
                        <p className="text-gray-500">Aquí se mostrarán los NFTs de tus rutas tokenizadas.</p>
                    </div>
                );
            case 'historial':
                return (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Historial de Ventas</h3>
                        <p className="text-gray-500">Historial de ventas y transacciones de tus rutas.</p>
                    </div>
                );
            case 'reservas':
                return (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Reservas Recibidas</h3>
                        <p className="text-gray-500">Reservas realizadas por turistas en tus rutas.</p>
                    </div>
                );
            case 'certificados':
                return (
                    <CertificationSection
                        userAddress={walletAddress}
                        userData={{
                            name: userData.name,
                            email: userData.email,
                            role: userData.role,
                            description: userData.bio
                        }}
                    />
                );
            default:
                return (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">NFTs de Rutas</h3>
                        <p className="text-gray-500">Aquí se mostrarán los NFTs de tus rutas tokenizadas.</p>
                    </div>
                );
        }
    };

    // --- Lógica de renderizado condicional ---
    if (!isConnected) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
                <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">
                        Conecta tu wallet para ver tu perfil
                    </p>
                    <button
                        onClick={handleConnectWallet}
                        disabled={walletLoading}
                        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        {walletLoading ? 'Conectando...' : 'Conectar Wallet'}
                    </button>
                </div>
            </div>
        );
    }

    if (!userType) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
                        Elige tu rol en Ayni
                    </h1>
                    <p className="text-gray-600 mb-8 max-w-md">
                        Selecciona el rol que mejor te describe para acceder a tu dashboard personalizado.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => registerUser('turista')}
                            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Soy un Turista 🌍
                        </button>
                        <button
                            onClick={() => registerUser('operador')}
                            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                        >
                            Soy un Operador/Comunidad 🏞️
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (isLoading || !userData) {
        return <LoadingSpinner />;
    }

    // --- Renderizado del perfil de Turista ---
    if (userType === 'turista') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
                {/* Modales */}
                {selectedNFT && (
                    <NFTModal
                        nft={selectedNFT}
                        onClose={() => setSelectedNFT(null)}
                    />
                )}

                {showEditModal && (
                    <EditProfileModal
                        user={userData}
                        walletAddress={walletAddress}
                        isWalletConnected={isConnected}
                        onClose={() => setShowEditModal(false)}
                        onUpdate={handleUpdateProfile}
                    />
                )}

                <div className="max-w-6xl mx-auto">
                    <ProfileHeader />

                    <ProfileCard
                        user={userData}
                        walletAddress={walletAddress}
                        isWalletConnected={isConnected}
                        onEditClick={() => setShowEditModal(true)}
                    />

                    <TabNavigation
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <div className="mb-12">
                        {activeTab === 'nfts' && (
                            <NFTGrid
                                nfts={userData.nfts}
                                onNFTClick={setSelectedNFT}
                            />
                        )}

                        {activeTab === 'historial' && (
                            <HistoryList history={userData.historial} />
                        )}

                        {activeTab === 'reservas' && (
                            <ReservationsList reservations={userData.reservas} />
                        )}

                        {activeTab === 'progreso' && (
                            <div>
                                {/* <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} /> */}

                                {activeTab === 'nfts' && <NFTGrid nfts={[]} />}
                                {activeTab === 'historial' && <div>Contenido historial</div>}
                                {activeTab === 'reservas' && <ReservationsList reservations={[]} />}
                                {activeTab === 'progreso' && <ProgressList progress={progressData} />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // --- Renderizado del perfil de Operador ---
    if (userType === 'operador') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
                {showModal && <ModalTokenizar onClose={() => setShowModal(false)} />}

                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 mb-2">
                            Mi Dashboard de Operador
                        </h1>
                        <p className="text-lg text-emerald-700">Gestión de rutas y seguimiento de ingresos</p>
                    </div>

                    {/* Tarjeta de perfil del operador */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 transition-all duration-300 hover:shadow-2xl p-8">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    src={userData.avatar}
                                    alt="Avatar Operador"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                                <div className="ml-6">
                                    <h2 className="text-3xl font-bold text-gray-800">{userData.name}</h2>
                                    <p className="text-gray-600">{userData.email}</p>
                                    <p className="text-emerald-600 mt-1">{userData.role}</p>
                                </div>
                            </div>
                            <div className="mt-6 md:mt-0">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" fillRule="evenodd"></path>
                                    </svg>
                                    Crear Nueva Ruta
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="bg-blue-50 p-6 rounded-xl">
                                <p className="text-sm text-blue-600">Ventas totales</p>
                                <p className="text-4xl font-bold text-blue-800 mt-2">{userData.ventas}</p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-xl">
                                <p className="text-sm text-green-600">Rutas publicadas</p>
                                <p className="text-4xl font-bold text-green-800 mt-2">{userData.rutasPublicadas}</p>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-xl">
                                <p className="text-sm text-purple-600">Ingresos (estimado)</p>
                                <p className="text-2xl font-bold text-purple-800 mt-2">{userData.ingresos}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navegación de tabs del operador */}
                    <TabNavigation
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    {/* Contenido de las tabs del operador */}
                    <div className="mb-12">
                        {renderOperatorTabContent()}
                    </div>

                    {/* Sección de rutas */}
                    <div className="mt-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Mis Rutas</h3>
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
                            <p className="text-gray-500">Aquí se mostrará la lista de tus rutas publicadas. (En desarrollo)</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}