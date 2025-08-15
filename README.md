# 🌟 Ayni Frontend - Web3 Tourism Ecosystem

> 🏛️ **Sustainable Reciprocity in Latin America** - A Web3 tourism ecosystem that empowers communities through the "Travel-to-Earn" model

![Mantle](https://img.shields.io/badge/Mantle-Sepolia-blue)
![React](https://img.shields.io/badge/React-18.0+-61dafb)
![Vite](https://img.shields.io/badge/Vite-5.0+-646cff)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0+-38bdf8)

## 📖 Description

Ayni is a Web3 platform that transforms the tourism experience in Latin America into a gamified adventure where travelers contribute directly to cultural heritage preservation. Built on **Mantle Sepolia Testnet** blockchain, it offers:

- 🎫 **Tourism Pass NFTs** (ERC-721)
- 🏆 **Commemorative NFTs** (ERC-1155) 
- 🎮 **Travel-to-Earn System**
- 🗺️ **Interactive Map** of destinations
- 👥 **Differentiated Roles**: Tourists and Operators

## 🚀 Key Features

### For Tourists 🎒
- ✅ Connect wallet to Mantle Sepolia
- 🗺️ Explore destinations on interactive map
- 🎫 Purchase tourism pass NFTs
- 📱 Scan QR codes at sites
- 🏆 Earn commemorative NFTs
- 📊 Personalized dashboard

### For Operators 🏛️
- 📈 Management dashboard
- 💰 Experience tokenization
- 📋 Tourism route management
- 🎯 Site certifications
- 📊 Visitor analytics

## 🛠️ Tech Stack

- **⚛️ Frontend**: React 18 + Vite
- **🎨 Styling**: TailwindCSS
- **⛓️ Blockchain**: Mantle Sepolia Testnet
- **🔗 Web3**: ethers.js
- **📱 Wallet**: MetaMask integration
- **🗺️ Maps**: Custom interactive components
- **📦 IPFS**: Pinata for NFT metadata

## 📁 Project Structure

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

## 🚀 Installation & Setup

### Prerequisites 📋
- Node.js 18+ 
- npm or yarn
- MetaMask installed
- Mantle Sepolia Testnet configured

### Installation Steps 📦

1. **Clone the repository**
```bash
git clone https://github.com/OmarQV/ayni-frontend-cook4.git
cd ayni-frontend-cook4
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

4. **Start development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open in browser**
```
http://localhost:5173
```

## ⚙️ Available Scripts

```bash
# 🚀 Development
npm run dev

# 🏗️ Build for production
npm run build

# 👀 Preview build
npm run preview

# 🧹 Lint
npm run lint
```

## 🔗 Mantle Sepolia Configuration

To use the application, you need to add the Mantle Sepolia network to your MetaMask:

- **🌐 Network Name**: Mantle Sepolia Testnet
- **🔗 RPC URL**: `https://rpc.sepolia.mantle.xyz`
- **🆔 Chain ID**: `5003`
- **💰 Currency Symbol**: `MNT`
- **🔍 Block Explorer**: `https://explorer.sepolia.mantle.xyz`

## 📜 Smart Contracts

### AyniPasses.sol (ERC-721) 🎫
- **Address**: `0x89CD07106d50468C7F2446954De0c2cAB94b676d`
- **Explorer**: [View on Mantle Explorer](https://explorer.sepolia.mantle.xyz/address/0x89CD07106d50468C7F2446954De0c2cAB94b676d)

### AyniCommemorativeNFTs.sol (ERC-1155) 🏆
- **Address**: `0xf0f9F3C55A53EFcf338b01a148B8581B6aCF6D4B`
- **Explorer**: [View on Mantle Explorer](https://explorer.sepolia.mantle.xyz/address/0xf0f9F3C55A53EFcf338b01a148B8581B6aCF6D4B)

## 🎯 Core Functionalities

### 🔐 Wallet Connection
```javascript
// Custom hook for handling wallet connections
import { useWallet } from './hooks/useWallet';

const { account, connect, disconnect, isConnected } = useWallet();
```

### 🗺️ Interactive Map
- Tourism destination visualization
- Category filters
- Detailed site information
- Tourism route integration

### 👤 Role System
- **Tourist**: Explore, buy passes, earn rewards
- **Operator**: Manage experiences, analyze data

## 🛣️ Roadmap

### ✅ Phase 1 (MVP - Completed)
- Wallet connection
- User role system
- Static pages
- Deployed contracts

### 🚧 Phase 2 (Next 3 months)
- Full contract interaction
- NFT pass purchases
- Commemorative NFT minting
- Functional operator dashboards
- Complete Pinata integration

### 🔮 Phase 3 (Future)
- DAO implementation
- Premium listings
- Expansion to new countries
- Advanced gamification

## 🤝 Contributing

Contributions are welcome! Please:

1. 🍴 Fork the project
2. 🌿 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔄 Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 📞 Contact

- **📧 Email**: quispevargasomar@gmail.com
- **🐙 GitHub**: [@Ayni-Project](https://github.com/OmarQV/ayni-frontend-cook4)

---

<div align="center">
  <p>🌟 <strong>Made with ❤️ for Latin America</strong> 🌟</p>
  <p>🏛️ <em>Preserving heritage through technology</em> 🏛️</p>
</div>