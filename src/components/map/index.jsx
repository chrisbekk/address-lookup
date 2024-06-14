import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useRef } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

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
  const map = useMap();
  const clusterRefs = useRef();
  console.log(map);
  useEffect(() => {
    if (!map || !data?.adresser) return;
    if (clusterRefs.current) {
      clusterRefs.current.clearMarkers();
    }
    const markers = data.adresser.map(point => {
      const { lat, lon } = point.representasjonspunkt;
      return new google.maps.Marker({
        position: { lat, lng: lon },
      });
    });

    clusterRefs.current = new MarkerClusterer({ markers, map });
  }, [map, data]);

  return null;
}
