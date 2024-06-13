import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useRef } from 'react';
const DEFAULT_MAP_OPTIONS = {
  lat: 60.395116,
  lng: 10.344659,
  zoom: 8,
};
export default function MapComponent({ position }) {
  return (
    <div className="h-screen z-0">
      <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
        <Map
          mapId={import.meta.env.VITE_MAP_ID}
          defaultCenter={{
            lat: DEFAULT_MAP_OPTIONS.lat,
            lng: DEFAULT_MAP_OPTIONS.lng,
          }}
          defaultZoom={DEFAULT_MAP_OPTIONS.zoom}
        >
          <MapController position={position} />
        </Map>
      </APIProvider>
    </div>
  );
}

function MapController({ position }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (!position.lat && !position.lng) return;
    console.log(position);
    console.log(map);
    map.setCenter(position);
    map.setZoom(12);
  }, [position, map]);
  return null;
}
