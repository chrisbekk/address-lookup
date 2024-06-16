import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useRef } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { materialAlphaTest } from 'three/examples/jsm/nodes/Nodes.js';
import Details from '../../Details';

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
          {data && <Details data={data} />}
        </Map>
      </APIProvider>
    </div>
  );
}

function MapController({ position, data }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (!position.lat && !position.lng) return;
    if (!data || !data?.adresser || data?.adresser.length === 0) return;

    map.setCenter(position);
    map.setZoom(12);
  }, [position, map, data]);

  return null;
}

function AddressMarkers({ data }) {
  const map = useMap();
  const clusterRefs = useRef();
  useEffect(() => {
    if (!map || !data?.adresser) return;
    if (clusterRefs.current) {
      clusterRefs.current.clearMarkers();
    }
    const markers = data.adresser.map(point => {
      const { lat, lon: lng } = point.representasjonspunkt;
      const marker = new google.maps.Marker({ position: { lat, lng } });
      marker.addListener('click', event => {
        console.log(event.target);
        map.panTo({ lat, lng });
        map.setZoom(17);
        map.setTilt(50);
        map.setHeading(0);
      });
      return marker;
      // return new google.maps.Marker({
      //   position: { lat, lng: lon },
      // });
    });

    clusterRefs.current = new MarkerClusterer({ markers, map });
    console.log(clusterRefs.current);
  }, [map, data]);

  return null;
}

// function WebGLController({ position }) {
//   const map = useMap();
//   let scene, renderer, camera, loader, mesh;
//   useEffect(() => {
//     if (!map || !position.lat || !position.lng) return;
//     const webGLOverlayView = new google.maps.WebGLOverlayView();
//     webGLOverlayView.onAdd = () => {
//       scene = new THREE.Scene();
//       camera = new THREE.PerspectiveCamera();
//       const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
//       scene.add(ambientLight);
//       // Create your custom geometry and material
//       const geometry = new THREE.BoxGeometry(10, 10, 10); // Example: a cube with size 10
//       const material = new THREE.MeshBasicMaterial({ color: 0xff1ff3 });
//       mesh = new THREE.Mesh(geometry, material);
//       mesh.scale.set(1, 10, 1);
//       scene.add(mesh);
//     };
//     webGLOverlayView.onContextRestored = ({ gl }) => {
//       renderer = new THREE.WebGLRenderer({
//         canvas: gl.canvas,
//         context: gl,
//         ...gl.getContextAttributes(),
//       });

//       renderer.autoClear = false;
//     };
//     webGLOverlayView.onDraw = ({ gl, transformer }) => {
//       if (!mesh || !camera) return; // Wait until the mesh is loaded
//       const latLngAltitudeLiteral = {
//         lat: position.lat,
//         lng: position.lng,
//         altitude: 0,
//       };
//       const matrix = transformer.fromLatLngAltitude(latLngAltitudeLiteral);
//       // mesh.matrix.fromArray(matrix);
//       // mesh.matrix.decompose(mesh.position, mesh.quaternion, mesh.scale);

//       camera.projectionMatrix = new THREE.Matrix4().fromArray(matrix);
//       // Position the mesh relative to the camera's position and rotation

//       //mesh.rotation.copy(camera.rotation);
//       webGLOverlayView.requestRedraw();

//       renderer.render(scene, camera);
//       renderer.resetState();
//     };

//     webGLOverlayView.setMap(map);
//     // Clean up function to dispose Three.js resources when unmounting or updating
//     return () => {
//       if (mesh) {
//         scene.remove(mesh);
//         mesh.geometry.dispose();
//         mesh.material.dispose();
//       }
//       if (renderer) {
//         renderer.dispose();
//       }
//       // Optionally dispose camera and scene if needed
//       // scene.dispose();
//       // camera = null;
//     };
//   }, [map, position]);
// }
