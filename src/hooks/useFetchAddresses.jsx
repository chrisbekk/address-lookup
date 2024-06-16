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

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL_KARTVERKET_API}lat=${lat}&lon=${lng}&radius=1000&treffPerSide=100`,
      );
      if (!response.ok) {
        const error = new Error('Failed to fetch data');
        error.message = 'Det oppstod et problem med å hente data.';
        throw error;
      }
      const responseData = await response.json();

      if (responseData?.adresser.length === 0) {
        const error = new Error();
        error.message = 'Ingen treff.';
        throw error;
      }
      setData(responseData);
    } catch (error) {
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
