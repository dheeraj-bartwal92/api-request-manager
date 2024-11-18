import React, {ReactNode} from 'react';
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query';

interface QueryClientProviderProps {
  children: ReactNode;
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /* 
        What is staleTime?
staleTime defines how long the data should be kept "fresh" (in milliseconds).
If the data is considered fresh, React Query will not refetch the data when the component mounts or when you call useQuery again with the same key.
After the staleTime period expires, the data becomes stale, and React Query will refetch it under certain conditions (such as window refocus or manual refetch() calls).
        */
      gcTime: 60 * 60 * 24 * 1000, // 24 hours in ms
      retry: 2, // Retry up to 2 times on failure
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});
const QueryClientProvider: React.FC<QueryClientProviderProps> = ({
  children,
}) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
