import { createPortal } from 'react-dom';
export default function Landing({ setToggleLanding }) {
  return createPortal(
    <div className="absolute inset-0 z-[999] bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-neutral-300 w-full sm:max-w-[640px] sm:mx-auto px-3 py-6 sm:border sm:border-neutral-950 sm:rounded-xl">
        <h1 className="text-xl font-semibold">Velkommen til AddresseSØK</h1>
        <p className="mb-6">
          Oppgi lengdegrad og breddegrad for å søke opp addresser i nærheten.
        </p>
        <button
          onClick={() => setToggleLanding(false)}
          className="w-full bg-slate-600 text-neutral-100 p-4 rounded-2xl"
        >
          Start
        </button>
      </div>
    </div>,
    document.getElementById('landing'),
  );
}
