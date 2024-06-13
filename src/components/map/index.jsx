import { APIProvider, Map } from '@vis.gl/react-google-maps';

const DEFAULT_MAP_VALUES = {
  lat: 60.395116,
  lng: 10.344659,
  zoom: 8,
};
export default function MapComponent() {
  return (
    <div className="h-screen">
      <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
        <Map
          defaultCenter={{
            lat: DEFAULT_MAP_VALUES.lat,
            lng: DEFAULT_MAP_VALUES.lng,
          }}
          defaultZoom={DEFAULT_MAP_VALUES.zoom}
        ></Map>
      </APIProvider>
    </div>
  );
}
