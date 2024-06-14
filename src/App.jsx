import { useEffect, useState } from 'react';
import Landing from './components/Landing';
import MapComponent from './components/map';
import Search from './components/Search/Search';
import ErrorMessage from './components/Search/ErrorMessage';
function App() {
  const [toggleLanding, setToggleLanding] = useState(true);
  const [position, setPosition] = useState({ lat: null, lng: null });
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [responseError, setResponseError] = useState(null);
  useEffect(() => {
    console.log('Fetch Effect Firing');
    const { lat, lng } = position;
    if (!lat || !lng) return;
    const fetchAddress = async () => {
      setPending(true);
      setResponseError(null);
      setData(null);
      console.log('firing');
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL_KARTVERKET_API}lat=${lat}&lon=${lng}&radius=1000`,
        );
        if (!response.ok) {
          const errorData = await response.json();
          const error = new Error('Failed to fetch data');
          error.errorData = errorData;
          throw error;
        }
        const responseData = await response.json();
        console.log(responseData);
        setData(responseData);
      } catch (error) {
        console.log(error.errorData);
        setResponseError(error.errorData);
      } finally {
        setPending(false);
      }
    };
    fetchAddress();
  }, []);
  return (
    <div className="bg-neutral-800 h-screen text-neutral-100 relative">
      {toggleLanding && <Landing setToggleLanding={setToggleLanding} />}
      {responseError && (
        <ErrorMessage
          error={responseError}
          setResponseError={setResponseError}
        />
      )}
      {!toggleLanding && <Search setPosition={setPosition} pending={pending} />}
      <MapComponent position={position} data={data} pending={pending} />
    </div>
  );
}

export default App;
