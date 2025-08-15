import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { sitiosCertificados } from "./sitios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

function Estrellas({ cantidad }) {
  return (
    <div className="flex text-yellow-400">
      {Array.from({ length: cantidad }).map((_, i) => (
        <span key={i}>★</span>
      ))}
      {Array.from({ length: 5 - cantidad }).map((_, i) => (
        <span key={i} className="text-gray-400">★</span>
      ))}
    </div>
  );
}

// Componente para añadir control de búsqueda
function ControlBusqueda() {
  const map = useMap();
  useEffect(() => {
    L.Control.geocoder({
      defaultMarkGeocode: true
    }).addTo(map);
  }, [map]);
  return null;
}

function MapaInteractivo() {
  const [position, setPosition] = useState([-16.2902, -63.5887]); // Centro Bolivia

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  // Ícono personalizado
  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  });

  return (
    <MapContainer center={position} zoom={6} style={{ height: "600px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ControlBusqueda />


      {/* Marcadores de atracciones */}
      {sitiosCertificados.map((sitio) => (
        <Marker
          key={sitio.id}
          position={[sitio.lat, sitio.lng]}
          icon={customIcon}
        >
          <Popup>
            <div className="p-2 w-60">
              <h2 className="font-bold text-lg">{sitio.nombre}</h2>
              <p className="text-gray-600">{sitio.descripcion}</p>
              <Estrellas cantidad={sitio.rating} />
              <p className="mt-1 text-green-600 font-semibold">
                💰 {sitio.tokens} Tokens
              </p>
              <button className="mt-2 w-full bg-primary text-white py-1 rounded hover:bg-primary-focus transition">
                Canjear Tokens
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapaInteractivo;
