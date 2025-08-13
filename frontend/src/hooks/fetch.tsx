import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

axios.defaults.withCredentials = true; // keep cookies for auth if needed

const serverUrl = "http://localhost:8000"; // your backend base URL

export function useApi<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const request = useCallback(async (config: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        baseURL: serverUrl,
        ...config,
      });

      setData(response.data);
      return response.data;
    } catch (err) {
      const axiosErr = err as AxiosError;
      const message =
        axiosErr.response?.data && typeof axiosErr.response.data === "string"
          ? axiosErr.response.data
          : axiosErr.response?.data?.message ||
            axiosErr.message ||
            "Unknown error";
      setError(message);
      throw err; // optional — let component handle it too
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, data, request };
}
