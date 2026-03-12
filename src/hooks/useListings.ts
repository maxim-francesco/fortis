import { useState, useEffect } from 'react';
import { searchListings } from '@/lib/api';

/**
 * Custom hook to fetch car listings from the backend.
 * 
 * @param params Optional search parameters (e.g., categoryId, q, sortBy)
 * @returns { listings, loading, error, pagination }
 */
export function useListings(params?: Record<string, string>) {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        // Requirement: On loading, listings should be an empty array
        setListings([]);
        setError(null);

        const response = await searchListings(params);

        if (isMounted) {
          setListings(response.data || []);
          setPagination(response.pagination || null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setListings([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
    // Using JSON.stringify(params) ensures deep comparison of parameters 
    // to prevent unnecessary re-fetches if the object reference changes but content doesn't.
  }, [JSON.stringify(params)]);

  return { listings, loading, error, pagination };
}
