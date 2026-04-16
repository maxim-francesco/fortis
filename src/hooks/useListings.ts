import { useQuery } from '@tanstack/react-query';
import { searchListings } from '@/lib/api';

/**
 * Custom hook to fetch car listings from the backend.
 * 
 * @param params Optional search parameters (e.g., categoryId, q, sortBy)
 * @returns { listings, loading, error, pagination }
 */
export function useListings(params?: Record<string, string>) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['listings', params],
    queryFn: () => searchListings(params),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  return { 
    listings: data?.data || [], 
    loading: isLoading, 
    error: error instanceof Error ? error : error ? new Error(String(error)) : null, 
    pagination: data?.pagination || null 
  };
}
