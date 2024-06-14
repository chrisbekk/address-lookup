import { useState } from 'react';
export default function useFetchAddresses() {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const fetchAddresses = async position => {
    setPending(true);
    setResponseError(null);
    setData(null);
    const { lat, lng } = position;
    if (!lat || !lng) return;
    console.log('Fetch Address firing');
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL_KARTVERKET_API}lat=${lat}&lon=${lng}&radius=1000`,
      );
      if (!response.ok) {
        const error = new Error('Failed to fetch data');
        error.message = 'Det oppstod et problem med å hente data.';
        throw error;
      }
      const responseData = await response.json();

      if (responseData?.adresser.length === 0) {
        const error = new Error();
        error.message =
          'Ingen treff. Sørg for at den oppgitte posisjonen er et sted i Norge.';
        throw error;
      }
      setData(responseData);
    } catch (error) {
      console.log(error);
      setResponseError(error);
    } finally {
      setPending(false);
    }
  };
  return {
    data,
    setData,
    pending,
    setPending,
    responseError,
    setResponseError,
    fetchAddresses,
  };
}
