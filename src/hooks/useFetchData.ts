import { useState, useEffect, useRef, useCallback } from "react";

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
  queryParams?: Record<string, string | number | boolean>,
  trigger: boolean = true,
  resetTrigger?: () => void,
  debounceDelay: number = 300
) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });
  const [requestInProgress, setRequestInProgress] = useState(false);

  const buildUrlWithParams = useCallback(() => {
    if (!queryParams) return url;

    const urlObj = new URL(url, window.location.origin);
    Object.entries(queryParams).forEach(([key, value]) => {
      urlObj.searchParams.append(key, String(value));
    });
    return urlObj.toString();
  }, [url, queryParams]);

  const fetchData = useCallback(async () => {
    setRequestInProgress(true);
    setState({ data: null, isLoading: true, error: null });

    try {
      const response = await fetch(buildUrlWithParams(), options);
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
  }, [buildUrlWithParams, options, resetTrigger]);

  const debouncedFetch = useRef(debounce(fetchData, debounceDelay));

  useEffect(() => {
    debouncedFetch.current = debounce(fetchData, debounceDelay);
  }, [fetchData, debounceDelay]);

  useEffect(() => {
    if (!trigger || requestInProgress) return;

    debouncedFetch.current();
  }, [trigger, requestInProgress]);

  return state;
};

export default useFetchData;
