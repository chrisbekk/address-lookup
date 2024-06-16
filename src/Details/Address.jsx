import { TfiMapAlt } from 'react-icons/tfi';
import { useMap } from '@vis.gl/react-google-maps';
export default function Address({ data }) {
  const map = useMap();
  const handleClick = (lat, lng) => {
    console.log(lat);
    const position = { lat: lat, lng: lng };
    map.panTo(position);
    map.setZoom(17);
    map.setTilt(50);
    map.setHeading(0);
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-full border my-2 p-1">
      <h2>{data.adressetekst}</h2>
      <h2 className="hidden sm:block">{data.bruksnummer}</h2>
      <h2 className="hidden sm:block">{data.poststed}</h2>
      <button
        onClick={() =>
          handleClick(
            data.representasjonspunkt.lat,
            data.representasjonspunkt.lon,
          )
        }
        className="w-fit p-2 hover:bg-slate-400 transition-all rounded-3xl"
      >
        <TfiMapAlt className="text-xl" />
      </button>
    </div>
  );
}
