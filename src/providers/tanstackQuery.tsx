import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 100,
      retry: (failureCount, error: any) =>
        error?.message == ERROR_MESSAGES[401] ||
        error?.message == ERROR_MESSAGES[403] ||
        error?.message == ERROR_MESSAGES[429]
          ? false
          : failureCount <= 3,

      throwOnError: error => {
        return (
          error?.message == ERROR_MESSAGES[401] ||
          error?.message == ERROR_MESSAGES[403]
        );
      },
      // throwOnError: error => {
      //   return (
      //     error?.message == ERROR_MESSAGES[401] ||
      //     error?.message == ERROR_MESSAGES[403]
      //   );
      // },
      // retry(failureCount, error) {
      //   if (
      //     error?.message == ERROR_MESSAGES[401] ||
      //     error?.message == ERROR_MESSAGES[403] ||
      //     error?.message == ERROR_MESSAGES[429]
      //   ) {
      //     return false;
      //   }
      //   if (failureCount <= 3) return true;
      //   else return false;
      // },
    },
  },
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
