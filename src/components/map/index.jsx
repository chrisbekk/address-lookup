import { APIProvider, Map, useMap, Marker } from '@vis.gl/react-google-maps';
import { useEffect } from 'react';

const DEFAULT_MAP_OPTIONS = {
  lat: 60.395116,
  lng: 10.344659,
  zoom: 8,
};

export default function MapComponent({ position, data, pending }) {
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
          <MapController position={position} data={data} pending={pending} />
          <AddressMarkers data={data} />
        </Map>
      </APIProvider>
    </div>
  );
}

function MapController({ position, data }) {
  const map = useMap();

  useEffect(() => {
    console.log('Map Controller firing');

    if (!map) return;
    if (!position.lat && !position.lng) return;
    if (!data || !data?.adresser || data?.adresser.length === 0) return;
    console.log('Repositioning Camera');
    map.setCenter(position);
    map.setZoom(12);
  }, [position, map, data]);

  return null;
}

function AddressMarkers({ data }) {
  return data?.adresser.map((point, index) => {
    const { lat, lon } = point.representasjonspunkt;
    const position = { lat: lat, lng: lon };
    return <Marker key={index} position={position} />;
  });
}
