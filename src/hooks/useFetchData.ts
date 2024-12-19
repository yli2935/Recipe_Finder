import { useState, useEffect } from "react";

type FetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

type FetchOptions = RequestInit;

const useFetchData = <T,>(
  url: string,
  options?: FetchOptions,
  trigger: boolean = true 
) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (!trigger) return; 

    const fetchData = async () => {
      setState({ data: null, isLoading: true, error: null });
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: T = await response.json();
        setState({ data, isLoading: false, error: null });
      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          error: (error as Error).message || "An error occurred",
        });
      }
    };

    fetchData();
  }, [url, options, trigger]); // 添加 trigger 作为依赖

  return state;
};

export default useFetchData;
