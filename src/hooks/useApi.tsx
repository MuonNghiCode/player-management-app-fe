import { useEffect, useState, useCallback, useRef } from "react";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useApi = <T,>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
    refetch: () => {},
  });

  const apiCallRef = useRef(apiCall);
  apiCallRef.current = apiCall;

  const fetchData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const result = await apiCallRef.current();

      setState((prev) => ({
        ...prev,
        data: result,
        loading: false,
        error: null,
      }));
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        data: null,
        loading: false,
        error: error.message || "Lỗi khi gọi API",
      }));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, dependencies);

  // Update refetch function
  useEffect(() => {
    setState((prev) => ({ ...prev, refetch: fetchData }));
  }, [fetchData]);

  return state;
};
