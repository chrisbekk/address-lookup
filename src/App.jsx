import { useState } from 'react';
import Landing from './components/Landing';
import MapComponent from './components/map';
import Search from './components/Search/Search';
import ErrorMessage from './components/Search/ErrorMessage';
import useFetchAddresses from './hooks/useFetchAddresses';

function App() {
  const [toggleLanding, setToggleLanding] = useState(true);
  const [position, setPosition] = useState({ lat: null, lng: null });
  const { data, pending, responseError, setResponseError, fetchAddresses } =
    useFetchAddresses();

  const handleSetPosition = newPosition => {
    setPosition(newPosition);
    fetchAddresses(newPosition);
  };
  return (
    <div className="bg-neutral-800 h-screen text-neutral-100 relative">
      {toggleLanding && <Landing setToggleLanding={setToggleLanding} />}
      {responseError && (
        <ErrorMessage
          error={responseError}
          setResponseError={setResponseError}
        />
      )}
      {!toggleLanding && (
        <Search setPosition={handleSetPosition} pending={pending} />
      )}
      <MapComponent position={position} data={data} pending={pending} />
    </div>
  );
}

export default App;
