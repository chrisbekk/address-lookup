import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Address from './Address';
export default function Details({ data, map }) {
  const [toggle, setToggle] = useState(false);
  console.log(data);
  const variants = {
    initial: { y: '384px' },
    animate: { y: 0, transition: { type: 'ease' } },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate={toggle ? 'animate' : 'initial'}
      className="absolute bottom-0 w-full"
    >
      <button
        onClick={() => setToggle(prev => !prev)}
        className="bg-slate-300 text-neutral-950 p-6 rounded-tr-2xl font-semibold"
      >
        Detaljer
      </button>
      <div className="bg-slate-300 text-neutral-950 h-96 overflow-y-scroll">
        <div className="p-2 border border-black w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 border">
            <h1 className="font-semibold text-lg">Adresse</h1>
            <h1 className="font-semibold text-lg hidden sm:block">
              Bruksnummer
            </h1>
            <h1 className="font-semibold text-lg hidden sm:block">Poststed</h1>
          </div>
          {data?.adresser.map((address, index) => (
            <Address data={address} key={index} map={map} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
