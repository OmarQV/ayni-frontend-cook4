# 🌟 Ayni Frontend - Web3 Tourism Ecosystem

> 🏛️ **Reciprocidad Sostenible en América Latina** - Un ecosistema de turismo Web3 que empodera comunidades a través del modelo "Travel-to-Earn"

![Mantle](https://img.shields.io/badge/Mantle-Sepolia-blue)
![React](https://img.shields.io/badge/React-18.0+-61dafb)
![Vite](https://img.shields.io/badge/Vite-5.0+-646cff)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0+-38bdf8)

## 📖 Descripción

Ayni es una plataforma Web3 que transforma la experiencia turística en América Latina en una aventura gamificada donde los viajeros contribuyen directamente a la preservación del patrimonio cultural. Construido sobre la blockchain **Mantle Sepolia Testnet**, ofrece:

- 🎫 **NFTs de Pases Turísticos** (ERC-721)
- 🏆 **NFTs Conmemorativos** (ERC-1155) 
- 🎮 **Sistema Travel-to-Earn**
- 🗺️ **Mapa Interactivo** de destinos
- 👥 **Roles diferenciados**: Turistas y Operadores

## 🚀 Características Principales

### Para Turistas 🎒
- ✅ Conectar wallet a Mantle Sepolia
- 🗺️ Explorar destinos en mapa interactivo
- 🎫 Comprar pases turísticos NFT
- 📱 Escanear códigos QR en sitios
- 🏆 Ganar NFTs conmemorativos
- 📊 Dashboard personalizado

### Para Operadores 🏛️
- 📈 Dashboard de gestión
- 💰 Tokenización de experiencias
- 📋 Gestión de rutas turísticas
- 🎯 Certificaciones de sitios
- 📊 Analíticas de visitantes

## 🛠️ Stack Tecnológico

- **⚛️ Frontend**: React 18 + Vite
- **🎨 Estilos**: TailwindCSS
- **⛓️ Blockchain**: Mantle Sepolia Testnet
- **🔗 Web3**: ethers.js
- **📱 Wallet**: MetaMask integration
- **🗺️ Mapas**: Componentes interactivos personalizados
- **📦 IPFS**: Pinata para metadatos NFT

## 📁 Estructura del Proyecto

```
ayni-frontend/
├── 📄 README.md
├── ⚙️ package.json
├── 🎨 tailwind.config.js
├── ⚡ vite.config.js
├── 📝 index.html
├── 📁 src/
│   ├── 📱 App.jsx
│   ├── 🎨 App.css & index.css
│   ├── 🖼️ assets/
│   │   └── img/
│   ├── 🧩 components/
│   │   ├── 🧭 NavBar.jsx
│   │   ├── 🔍 FilterDestinations.jsx
│   │   ├── 💎 ModalTokenizar.jsx
│   │   ├── 📱 QRScannerModal.jsx
│   │   ├── 🛤️ RouteModal.jsx
│   │   ├── 📜 certificaction/
│   │   └── 👤 profile/
│   ├── 🔄 contexts/
│   ├── 📄 contracts/
│   ├── 🪝 hooks/
│   │   └── useWallet.js
│   ├── 🗺️ mapa_interactivo/
│   │   ├── MapaInteractivo.jsx
│   │   └── sitios.js
│   ├── 📄 pages/
│   │   ├── 🏠 Home.jsx
│   │   ├── 🎯 Destinations.jsx
│   │   ├── 🗺️ MapaInteractivoPage.jsx
│   │   ├── 🎫 Tours.jsx
│   │   └── 👤 UserProfile.jsx
│   └── ⚙️ services/
```

## 🚀 Instalación y Configuración

### Prerrequisitos 📋
- Node.js 18+ 
- npm o yarn
- MetaMask instalado
- Mantle Sepolia Testnet configurado

### Pasos de Instalación 📦

1. **Clonar el repositorio**
```bash
git clone https://github.com/OmarQV/ayni-frontend-cook4.git
cd ayni-frontend-cook4
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
```

5. **Abrir en el navegador**
```
http://localhost:5173
```

## ⚙️ Scripts Disponibles

```bash
# 🚀 Desarrollo
npm run dev

# 🏗️ Build para producción
npm run build

# 👀 Preview del build
npm run preview

# 🧹 Lint
npm run lint
```

## 🔗 Configuración de Mantle Sepolia

Para usar la aplicación, necesitas agregar la red Mantle Sepolia a tu MetaMask:

- **🌐 Network Name**: Mantle Sepolia Testnet
- **🔗 RPC URL**: `https://rpc.sepolia.mantle.xyz`
- **🆔 Chain ID**: `5003`
- **💰 Currency Symbol**: `MNT`
- **🔍 Block Explorer**: `https://explorer.sepolia.mantle.xyz`

## 📜 Contratos Inteligentes

### AyniPasses.sol (ERC-721) 🎫
- **Dirección**: `0x1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B`
- **Explorer**: [Ver en Mantle Explorer](https://explorer.sepolia.mantle.xyz/address/0x1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B)

### AyniCommemorativeNFTs.sol (ERC-1155) 🏆
- **Dirección**: `0xA0B1C2D3E4F5A6B7C8D9E0F1A2B3C4D5E6F7A8B9`
- **Explorer**: [Ver en Mantle Explorer](https://explorer.sepolia.mantle.xyz/address/0xA0B1C2D3E4F5A6B7C8D9E0F1A2B3C4D5E6F7A8B9)

## 🎯 Funcionalidades Clave

### 🔐 Conexión de Wallet
```javascript
// Hook personalizado para manejar conexiones de wallet
import { useWallet } from './hooks/useWallet';

const { account, connect, disconnect, isConnected } = useWallet();
```

### 🗺️ Mapa Interactivo
- Visualización de destinos turísticos
- Filtros por categorías
- Información detallada de sitios
- Integración con rutas turísticas

### 👤 Sistema de Roles
- **Turista**: Explorar, comprar pases, ganar recompensas
- **Operador**: Gestionar experiencias, analizar datos

## 🛣️ Roadmap

### ✅ Fase 1 (MVP - Completado)
- Conexión de wallet
- Sistema de roles de usuario
- Páginas estáticas
- Contratos desplegados

### 🚧 Fase 2 (Próximos 3 meses)
- Interacción completa con contratos
- Compras de pases NFT
- Acuñación de NFTs conmemorativos
- Dashboards funcionales de operador
- Integración completa con Pinata

### 🔮 Fase 3 (Futuro)
- Implementación de DAO
- Listados premium
- Expansión a nuevos países
- Gamificación avanzada

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor:

1. 🍴 Fork el proyecto
2. 🌿 Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push a la rama (`git push origin feature/AmazingFeature`)
5. 🔄 Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **📧 Email**: quispevargasomar@gmail.com
- **🐙 GitHub**: [@Ayni-Project](https://github.com/OmarQV/ayni-frontend-cook4)

---

<div align="center">
  <p>🌟 <strong>Hecho con ❤️ para América Latina</strong> 🌟</p>
  <p>🏛️ <em>Preservando el patrimonio a través de la tecnología</em> 🏛️</p>
</div>