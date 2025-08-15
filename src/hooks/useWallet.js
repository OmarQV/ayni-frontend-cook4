// src/hooks/useWallet.js

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Asegura que window.ethereum exista para evitar errores en el servidor (SSR)
if (typeof window !== 'undefined') {
    window.ethereum = window.ethereum || {};
}

// Configuración de la red Mantle Sepolia Testnet
const MANTLE_CHAIN_ID = '0x138B'; // ID de la cadena en hexadecimal (5003 en decimal)
const MANTLE_NETWORK_PARAMS = {
    chainId: MANTLE_CHAIN_ID,
    chainName: 'Mantle Sepolia Testnet',
    rpcUrls: ['https://rpc.sepolia.mantle.xyz'],
    nativeCurrency: {
        name: 'MNT',
        symbol: 'MNT',
        decimals: 18,
    },
    blockExplorerUrls: ['https://sepolia.mantle.xyz/'],
};

export const useWallet = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState('');
    const [chainId, setChainId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // --- NUEVO ESTADO PARA EL ROL DEL USUARIO ---
    const [userType, setUserType] = useState(null);

    const isWalletInstalled = () => {
        return typeof window !== 'undefined' && window.ethereum;
    };

    const switchNetwork = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: MANTLE_CHAIN_ID }],
            });
            return true;
        } catch (switchError) {
            // Este error indica que la red no está en la wallet del usuario
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [MANTLE_NETWORK_PARAMS],
                    });
                    return true;
                } catch (addError) {
                    throw new Error('No se pudo agregar la red Mantle Sepolia Testnet.');
                }
            }
            // Otros errores al intentar cambiar de red
            throw new Error('No se pudo cambiar a la red Mantle Sepolia Testnet.');
        }
    };

    const connectWallet = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!isWalletInstalled()) {
                throw new Error('Por favor, instala MetaMask o una wallet Web3.');
            }

            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (!accounts || accounts.length === 0) {
                throw new Error('No se encontraron cuentas.');
            }

            // Comprobar y cambiar a la red Mantle Sepolia Testnet
            const success = await switchNetwork();
            if (!success) {
                throw new Error('No se pudo conectar a la red de Mantle Sepolia Testnet.');
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const account = await signer.getAddress();
            const balance = await provider.getBalance(account);
            const network = await provider.getNetwork();

            setProvider(provider);
            setSigner(signer);
            setAccount(account);
            setBalance(ethers.formatEther(balance));
            setChainId(Number(network.chainId));
            setIsConnected(true);

            setupEventListeners(provider);

        } catch (err) {
            console.error('Error al conectar la wallet:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const setupEventListeners = (provider) => {
        if (!window.ethereum) return;

        window.ethereum.on('accountsChanged', async (accounts) => {
            if (accounts.length > 0) {
                const signer = await provider.getSigner();
                const account = await signer.getAddress();
                const balance = await provider.getBalance(account);
                
                setSigner(signer);
                setAccount(account);
                setBalance(ethers.formatEther(balance));
            } else {
                disconnectWallet();
            }
        });

        window.ethereum.on('chainChanged', async () => {
            const network = await provider.getNetwork();
            setChainId(Number(network.chainId));
            window.location.reload();
        });
    };

    const disconnectWallet = () => {
        if (window.ethereum) {
            window.ethereum.removeListener('accountsChanged', () => {});
            window.ethereum.removeListener('chainChanged', () => {});
        }

        setProvider(null);
        setSigner(null);
        setIsConnected(false);
        setAccount('');
        setBalance('');
        setChainId(null);
        setUserType(null); // --- NUEVA LÍNEA ---
    };

    // --- NUEVA FUNCIÓN PARA REGISTRAR EL ROL DEL USUARIO ---
    const registerUser = (role) => {
        if (isConnected) {
            setUserType(role);
            // En una implementación real, aquí se llamaría a una API o contrato para registrar el rol.
            console.log(`Rol registrado: ${role}`);
        }
    };

    useEffect(() => {
        const checkConnectedWallet = async () => {
            if (isWalletInstalled()) {
                try {
                    const accounts = await window.ethereum.request({
                        method: 'eth_accounts'
                    });

                    if (accounts.length > 0) {
                        await connectWallet();
                    }
                } catch (err) {
                    console.error('Error checking connected wallet:', err);
                }
            }
        };

        checkConnectedWallet();
    }, []);

    return {
        provider,
        signer,
        isConnected,
        account,
        balance,
        chainId,
        error,
        loading,
        userType, // --- NUEVO VALOR RETORNADO ---
        connectWallet,
        disconnectWallet,
        isWalletInstalled,
        registerUser, // --- NUEVA FUNCIÓN RETORNADA ---
    };
};