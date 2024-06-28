import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 100 } },
});

const isDevEnvironment = import.meta.env.DEV;

const TanstackQuery = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isDevEnvironment && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};

export default TanstackQuery;
