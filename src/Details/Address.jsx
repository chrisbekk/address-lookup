import { TfiMapAlt } from 'react-icons/tfi';

export default function Address({ data }) {
  return (
    <div className="grid grid-cols-3 w-full">
      <h2>{data.adressenavn}</h2>
      <h2>{data.nummer}</h2>
      <h2>{data.adressekode}</h2>
    </div>
  );
}
