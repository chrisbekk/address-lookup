import { motion, transform } from 'framer-motion';
import { useState } from 'react';
import Address from './Address';
export default function Details({ data }) {
  const [toggle, setToggle] = useState(false);
  console.log(data);
  const variants = {
    initial: { y: 100, transition: { type: 'ease' } },
    show: { y: 0, transition: { type: 'ease' } },
    exit: { y: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate={toggle ? 'show' : 'initial'}
      className=" w-screen absolute bottom-0 overflow-hidden"
    >
      <div className="flex flex-col gap-1 items-center justify-center w-full h-full">
        <button
          onClick={() => setToggle(prev => !prev)}
          className="bg-purple-400 p-5 rounded-xl"
        >
          Detaljer
        </button>
        <div className="bg-white text-black w-full h-full z-[999] p-3">
          <h1 className="font-semibold text-2xl">Detaljer</h1>
          <div className="grid grid-cols-3 w-full">
            <h2>Adresse</h2>
            <h2>Nummer</h2>
            <h2>Adressekode</h2>
            <h2></h2>
          </div>
          <div>
            {data?.adresser.map((address, index) => (
              <Address key={index} data={address} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
