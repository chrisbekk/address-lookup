import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

//
export default function Search({ setPosition, pending }) {
  const [formData, setFormData] = useState({ lat: '', lng: '' });
  const handleSubmit = e => {
    e.preventDefault();
    const { lat, lng } = formData;
    if (!lat || !lng) return;
    const latFloat = parseFloat(lat);
    const lngFloat = parseFloat(lng);
    //Check form inputs
    setPosition({ lat: latFloat, lng: lngFloat });
  };
  return (
    <div className="w-full sm:max-w-[640px] sm:h-28 bg-neutral-200 text-neutral-900 absolute top-14 left-1/2 -translate-x-1/2 z-[999] py-2 px-3 sm:rounded-3xl">
      <h1 className="text-xl mb-1">Søk</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="h-14 relative flex-1">
          <label
            htmlFor="lat"
            className="block absolute top-0 left-1 z-10 font-bold"
          >
            Breddegrad
          </label>
          <input
            value={formData.lat}
            onChange={e =>
              setFormData(prev => ({ ...prev, lat: e.target.value }))
            }
            type="text"
            id="lat"
            name="lat"
            className="inset-0 absolute pt-4 pl-1 rounded-xl"
          />
        </div>
        <div className="h-14 relative flex-1">
          <label
            htmlFor="lng"
            className="block absolute top-0 left-1 z-10 font-bold "
          >
            Lengdegrad
          </label>
          <input
            value={formData.lng}
            onChange={e =>
              setFormData(prev => ({ ...prev, lng: e.target.value }))
            }
            type="text"
            id="lng"
            name="lng"
            className="inset-0 absolute pt-4 pl-1 rounded-xl"
          />
        </div>
        <div className="">
          <button
            type="submit"
            className="bg-slate-400 h-full flex-1 px-10 rounded-xl"
          >
            {pending ? <CgSpinner className="animate-spin text-2xl" /> : 'Søk'}
          </button>
        </div>
      </form>
    </div>
  );
}
