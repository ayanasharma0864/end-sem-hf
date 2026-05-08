import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation } from 'lucide-react';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom ISS Icon
const issIcon = new L.Icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
  iconSize: [50, 30],
  iconAnchor: [25, 15],
  popupAnchor: [0, -15]
});

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView([center.lat, center.lng], map.getZoom());
    }
  }, [center, map]);
  return null;
}

export function MapComponent({ position, path }) {
  if (!position) return <div className="w-full h-full flex items-center justify-center animate-pulse bg-gray-200 dark:bg-gray-800 rounded-xl">Loading Map...</div>;

  return (
    <div className="w-full h-full rounded-xl overflow-hidden relative">
      <MapContainer 
        center={[position.lat, position.lng]} 
        zoom={4} 
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[position.lat, position.lng]} icon={issIcon}>
          <Popup>
            <div className="font-semibold text-center">
              ISS Current Location<br/>
              Lat: {position.lat.toFixed(4)}<br/>
              Lng: {position.lng.toFixed(4)}
            </div>
          </Popup>
        </Marker>
        
        {path.length > 1 && (
          <Polyline 
            positions={path.map(p => [p.lat, p.lng])} 
            color="#ef4444" 
            weight={3} 
            dashArray="10, 10" 
          />
        )}
        <MapUpdater center={position} />
      </MapContainer>
    </div>
  );
}
