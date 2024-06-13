import { APIProvider, Map } from '@vis.gl/react-google-maps';

const DEFAULT_MAP_OPTIONS = {
  lat: 60.395116,
  lng: 10.344659,
  zoom: 8,
};
export default function MapComponent() {
  return (
    <div className="h-screen">
      <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
        <Map
          mapId={import.meta.env.VITE_MAP_ID}
          defaultCenter={{
            lat: DEFAULT_MAP_OPTIONS.lat,
            lng: DEFAULT_MAP_OPTIONS.lng,
          }}
          defaultZoom={DEFAULT_MAP_OPTIONS.zoom}
        ></Map>
      </APIProvider>
    </div>
  );
}
