import { createPortal } from 'react-dom';
import { MdOutlineErrorOutline } from 'react-icons/md';

export default function ErrorMessage({ error, setResponseError }) {
  return createPortal(
    <div className="absolute z-[1000] inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-neutral-300 w-full sm:max-w-[640px] sm:mx-auto px-3 py-6 sm:border sm:border-neutral-950 sm:rounded-xl">
        <div className="flex gap-4 items-center">
          <MdOutlineErrorOutline className="text-4xl" />
          <h1 className="text-2xl font-semibold">Noe gikk galt</h1>
        </div>
        <div>
          {error.message.lat?.map((e, index) => (
            <p key={index}>{e}</p>
          ))}
        </div>
        <button
          onClick={() => setResponseError(false)}
          className="w-full bg-slate-600 text-neutral-100 p-4 rounded-2xl"
        >
          Tilbake
        </button>
      </div>
    </div>,
    document.getElementById('error'),
  );
}
