import { useState, useEffect, useRef } from "react";

type FetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

type FetchOptions = RequestInit;

/**
 * Custom debounce function
 */
const debounce = (func: () => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, delay);
  };
};

const useFetchData = <T,>(
  url: string,
  options?: FetchOptions,
  trigger: boolean = true,
  resetTrigger?: () => void, // Callback to reset the trigger after fetching
  debounceDelay: number = 300 // Default debounce delay in milliseconds
) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });
  const [requestInProgress, setRequestInProgress] = useState(false);

  const debouncedFetch = useRef(
    debounce(() => {
      fetchData();
    }, debounceDelay)
  ).current;

  const fetchData = async () => {
    setRequestInProgress(true);
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
    } finally {
      setRequestInProgress(false);
      if (resetTrigger) {
        resetTrigger();
      }
    }
  };

  useEffect(() => {
    if (!trigger || requestInProgress) return;

    debouncedFetch();
  }, [url, options, trigger, requestInProgress, resetTrigger, debouncedFetch]);

  return state;
};

export default useFetchData;
