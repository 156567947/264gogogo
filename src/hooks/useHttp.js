import { useCallback } from "react";
import { useEffect, useState } from "react";

const sendHttpRequest = async (url, config) => {
  const res = await fetch(url, config);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch data");
  }
  return data;
};

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const clearData = () => {
    setData(initialData);
    setError(null);
    setIsLoading(false);
  };
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const fetchData = await sendHttpRequest(url, { ...config, body: data });
        setData(fetchData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config]
  );
  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);
  return { data, error, isLoading, sendRequest, clearData };
}
